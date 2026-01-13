import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drink } from '@/model/Drink';
import { initialDrinks } from './initialData';
import { parseDate } from '@/utils/dateFormat';
import { isSupabaseConfigured } from '@/lib/supabase';
import * as SupabaseRepository from './repository.supabase';

const STORAGE_KEY = '@drinks_da_giovana:drinks';

/**
 * Converte um objeto Drink para formato JSON (serializa Date para string)
 */
const serializeDrink = (drink: Drink): string => {
  return JSON.stringify({
    ...drink,
    date: drink.date.toISOString(),
  });
};

/**
 * Converte JSON para objeto Drink (deserializa string para Date)
 */
const deserializeDrink = (json: string): Drink => {
  const data = JSON.parse(json);
  return {
    ...data,
    date: parseDate(data.date),
  };
};

/**
 * Carrega todos os drinks
 * Usa Supabase se configurado, caso contrário usa AsyncStorage
 * @returns Array de drinks
 */
export const loadDrinks = async (): Promise<Drink[]> => {
  // Se Supabase estiver configurado, usa ele
  if (isSupabaseConfigured) {
    return SupabaseRepository.loadDrinks();
  }
  
  // Caso contrário, usa AsyncStorage (fallback)
  try {
    console.log('[DrinkRepository] Carregando drinks do armazenamento...');
    
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      console.log('[DrinkRepository] Nenhum drink encontrado. Carregando dados iniciais...');
      // Se não houver dados, salva os dados iniciais
      await saveAllDrinks(initialDrinks);
      return initialDrinks;
    }
    
    const drinks: Drink[] = JSON.parse(data).map((d: any) => ({
      ...d,
      date: parseDate(d.date),
    }));
    
    console.log('[DrinkRepository] Drinks carregados:', drinks.length);
    return drinks;
  } catch (error) {
    console.error('[DrinkRepository] Erro ao carregar drinks:', error);
    // Em caso de erro, retorna os dados iniciais
    return initialDrinks;
  }
};

/**
 * Salva todos os drinks no armazenamento local
 * @param drinks - Array de drinks a serem salvos
 */
export const saveAllDrinks = async (drinks: Drink[]): Promise<void> => {
  try {
    console.log('[DrinkRepository] Salvando drinks:', drinks.length);
    
    const data = JSON.stringify(
      drinks.map((drink) => ({
        ...drink,
        date: drink.date.toISOString(),
      }))
    );
    
    await AsyncStorage.setItem(STORAGE_KEY, data);
    console.log('[DrinkRepository] Drinks salvos com sucesso');
  } catch (error) {
    console.error('[DrinkRepository] Erro ao salvar drinks:', error);
    throw new Error('Falha ao salvar drinks. Tente novamente.');
  }
};

/**
 * Adiciona um novo drink
 * Usa Supabase se configurado, caso contrário usa AsyncStorage
 * @param drink - Drink a ser adicionado
 */
export const addDrink = async (drink: Drink): Promise<void> => {
  if (isSupabaseConfigured) {
    return SupabaseRepository.addDrink(drink);
  }
  
  // Fallback para AsyncStorage
  try {
    console.log('[DrinkRepository] Adicionando drink:', { id: drink.id, name: drink.name });
    
    const drinks = await loadDrinks();
    const updatedDrinks = [...drinks, drink];
    await saveAllDrinks(updatedDrinks);
    
    console.log('[DrinkRepository] Drink adicionado com sucesso');
  } catch (error) {
    console.error('[DrinkRepository] Erro ao adicionar drink:', error);
    throw new Error('Falha ao adicionar drink. Tente novamente.');
  }
};

/**
 * Atualiza um drink existente
 * Usa Supabase se configurado, caso contrário usa AsyncStorage
 * @param updatedDrink - Drink com os dados atualizados
 */
export const updateDrink = async (updatedDrink: Drink): Promise<void> => {
  if (isSupabaseConfigured) {
    return SupabaseRepository.updateDrink(updatedDrink);
  }
  
  // Fallback para AsyncStorage
  try {
    console.log('[DrinkRepository] Atualizando drink:', { id: updatedDrink.id, name: updatedDrink.name });
    
    const drinks = await loadDrinks();
    const updatedDrinks = drinks.map((drink) =>
      drink.id === updatedDrink.id ? updatedDrink : drink
    );
    await saveAllDrinks(updatedDrinks);
    
    console.log('[DrinkRepository] Drink atualizado com sucesso');
  } catch (error) {
    console.error('[DrinkRepository] Erro ao atualizar drink:', error);
    throw new Error('Falha ao atualizar drink. Tente novamente.');
  }
};

/**
 * Remove um drink
 * Usa Supabase se configurado, caso contrário usa AsyncStorage
 * @param drinkId - ID do drink a ser removido
 */
export const deleteDrink = async (drinkId: string): Promise<void> => {
  if (isSupabaseConfigured) {
    return SupabaseRepository.deleteDrink(drinkId);
  }
  
  // Fallback para AsyncStorage
  try {
    console.log('[DrinkRepository] Removendo drink:', drinkId);
    
    const drinks = await loadDrinks();
    const updatedDrinks = drinks.filter((drink) => drink.id !== drinkId);
    await saveAllDrinks(updatedDrinks);
    
    console.log('[DrinkRepository] Drink removido com sucesso');
  } catch (error) {
    console.error('[DrinkRepository] Erro ao remover drink:', error);
    throw new Error('Falha ao remover drink. Tente novamente.');
  }
};

