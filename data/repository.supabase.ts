import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Drink } from '@/model/Drink';
import { Ingredient } from '@/model/Ingredient';
import { parseDate } from '@/utils/dateFormat';

if (!isSupabaseConfigured || !supabase) {
  throw new Error('Supabase não está configurado. Configure as variáveis de ambiente.');
}

// Garantir que supabase não é null (já verificamos acima)
const supabaseClient = supabase!;

/**
 * Interface para dados do drink no banco (com ingredientes aninhados)
 */
interface DrinkRow {
  id: string;
  name: string;
  rating: number;
  date: string;
  instructions: string;
  photo: string | null;
  created_at: string;
  updated_at: string;
  ingredients: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
  }>;
}

/**
 * Carrega todos os drinks do Supabase
 * @returns Array de drinks
 */
export const loadDrinks = async (): Promise<Drink[]> => {
  try {
    console.log('[DrinkRepository] Carregando drinks do Supabase...');

    // Busca drinks com seus ingredientes
    const { data, error } = await supabaseClient
      .from('drinks')
      .select(`
        *,
        ingredients (*)
      `)
      .order('date', { ascending: false });

    if (error) {
      console.error('[DrinkRepository] Erro ao carregar drinks:', error);
      throw new Error('Falha ao carregar drinks do servidor.');
    }

    if (!data || data.length === 0) {
      console.log('[DrinkRepository] Nenhum drink encontrado no banco');
      return [];
    }

    // Converte os dados do banco para o formato do modelo
    const drinks: Drink[] = data.map((row: DrinkRow) => ({
      id: row.id,
      name: row.name,
      rating: row.rating,
      date: parseDate(row.date),
      instructions: row.instructions || '',
      photo: row.photo || undefined,
      ingredients: (row.ingredients || []).map((ing) => ({
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
      })),
    }));

    console.log('[DrinkRepository] Drinks carregados:', drinks.length);
    return drinks;
  } catch (error) {
    console.error('[DrinkRepository] Erro ao carregar drinks:', error);
    throw new Error('Falha ao carregar drinks. Tente novamente.');
  }
};

/**
 * Adiciona um novo drink ao Supabase
 * @param drink - Drink a ser adicionado
 */
export const addDrink = async (drink: Drink): Promise<void> => {
  try {
    console.log('[DrinkRepository] Adicionando drink:', { 
      id: drink.id, 
      name: drink.name,
      rating: drink.rating,
      date: drink.date.toISOString(),
      ingredientsCount: drink.ingredients?.length || 0,
    });

    // Insere o drink (sem especificar ID, deixa o banco gerar UUID)
    const { data: drinkData, error: drinkError } = await supabaseClient
      .from('drinks')
      .insert({
        name: drink.name,
        rating: drink.rating,
        date: drink.date.toISOString(),
        instructions: drink.instructions || '',
        photo: drink.photo || null,
      })
      .select()
      .single();

    if (drinkError) {
      console.error('[DrinkRepository] Erro ao adicionar drink:', drinkError);
      console.error('[DrinkRepository] Detalhes do erro:', JSON.stringify(drinkError, null, 2));
      throw new Error(`Falha ao adicionar drink: ${drinkError.message}`);
    }

    if (!drinkData) {
      throw new Error('Drink criado mas nenhum dado retornado');
    }

    const createdDrinkId = drinkData.id;
    console.log('[DrinkRepository] Drink criado com ID:', createdDrinkId);

    // Insere os ingredientes usando o ID gerado pelo banco
    if (drink.ingredients && drink.ingredients.length > 0) {
      const ingredientsData = drink.ingredients.map((ing) => ({
        drink_id: createdDrinkId,
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
      }));

      console.log('[DrinkRepository] Inserindo ingredientes:', ingredientsData.length);

      const { error: ingredientsError } = await supabaseClient
        .from('ingredients')
        .insert(ingredientsData);

      if (ingredientsError) {
        console.error('[DrinkRepository] Erro ao adicionar ingredientes:', ingredientsError);
        console.error('[DrinkRepository] Detalhes do erro:', JSON.stringify(ingredientsError, null, 2));
        // Não falha completamente, apenas loga o erro
      } else {
        console.log('[DrinkRepository] Ingredientes inseridos com sucesso');
      }
    }

    console.log('[DrinkRepository] Drink adicionado com sucesso');
  } catch (error) {
    console.error('[DrinkRepository] Erro ao adicionar drink:', error);
    throw new Error('Falha ao adicionar drink. Tente novamente.');
  }
};

/**
 * Atualiza um drink existente no Supabase
 * @param updatedDrink - Drink com os dados atualizados
 */
export const updateDrink = async (updatedDrink: Drink): Promise<void> => {
  try {
    console.log('[DrinkRepository] Atualizando drink:', { id: updatedDrink.id, name: updatedDrink.name });

    // Atualiza o drink
    const { error: drinkError } = await supabaseClient
      .from('drinks')
      .update({
        name: updatedDrink.name,
        rating: updatedDrink.rating,
        date: updatedDrink.date.toISOString(),
        instructions: updatedDrink.instructions,
        photo: updatedDrink.photo || null,
      })
      .eq('id', updatedDrink.id);

    if (drinkError) {
      console.error('[DrinkRepository] Erro ao atualizar drink:', drinkError);
      throw new Error('Falha ao atualizar drink.');
    }

    // Remove ingredientes antigos e adiciona os novos
    const { error: deleteError } = await supabaseClient
      .from('ingredients')
      .delete()
      .eq('drink_id', updatedDrink.id);

    if (deleteError) {
      console.error('[DrinkRepository] Erro ao remover ingredientes antigos:', deleteError);
    }

    // Adiciona os novos ingredientes
    if (updatedDrink.ingredients && updatedDrink.ingredients.length > 0) {
      const ingredientsData = updatedDrink.ingredients.map((ing) => ({
        drink_id: updatedDrink.id,
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
      }));

      const { error: ingredientsError } = await supabaseClient
        .from('ingredients')
        .insert(ingredientsData);

      if (ingredientsError) {
        console.error('[DrinkRepository] Erro ao atualizar ingredientes:', ingredientsError);
      }
    }

    console.log('[DrinkRepository] Drink atualizado com sucesso');
  } catch (error) {
    console.error('[DrinkRepository] Erro ao atualizar drink:', error);
    throw new Error('Falha ao atualizar drink. Tente novamente.');
  }
};

/**
 * Remove um drink do Supabase
 * @param drinkId - ID do drink a ser removido
 */
export const deleteDrink = async (drinkId: string): Promise<void> => {
  try {
    console.log('[DrinkRepository] Removendo drink:', drinkId);

    // O CASCADE na tabela ingredients remove automaticamente os ingredientes
    const { error } = await supabaseClient
      .from('drinks')
      .delete()
      .eq('id', drinkId);

    if (error) {
      console.error('[DrinkRepository] Erro ao remover drink:', error);
      throw new Error('Falha ao remover drink.');
    }

    console.log('[DrinkRepository] Drink removido com sucesso');
  } catch (error) {
    console.error('[DrinkRepository] Erro ao remover drink:', error);
    throw new Error('Falha ao remover drink. Tente novamente.');
  }
};

