import { useState, useEffect, useCallback } from 'react';
import { Drink } from '@/model/Drink';
import { loadDrinks, addDrink, updateDrink, deleteDrink } from '@/data/repository';

interface UseDrinksReturn {
  /** Lista de drinks */
  drinks: Drink[];
  
  /** Se true, está carregando os drinks */
  loading: boolean;
  
  /** Mensagem de erro, se houver */
  error: string | null;
  
  /** Adiciona um novo drink */
  addNewDrink: (drink: Drink) => Promise<void>;
  
  /** Atualiza um drink existente */
  updateExistingDrink: (drink: Drink) => Promise<void>;
  
  /** Remove um drink */
  removeDrink: (drinkId: string) => Promise<void>;
  
  /** Recarrega a lista de drinks */
  refreshDrinks: () => Promise<void>;
}

/**
 * Hook para gerenciar a lista de drinks
 * Fornece funções para carregar, adicionar, editar e excluir drinks
 */
export const useDrinks = (): UseDrinksReturn => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega os drinks do armazenamento
  const loadDrinksData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[useDrinks] Carregando drinks...');
      
      const loadedDrinks = await loadDrinks();
      setDrinks(loadedDrinks);
      
      console.log('[useDrinks] Drinks carregados:', loadedDrinks.length);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar drinks';
      console.error('[useDrinks] Erro ao carregar drinks:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega os drinks quando o hook é montado
  useEffect(() => {
    loadDrinksData();
  }, [loadDrinksData]);

  // Adiciona um novo drink
  const addNewDrink = useCallback(async (drink: Drink) => {
    try {
      setError(null);
      console.log('[useDrinks] Adicionando drink:', drink.name);
      
      await addDrink(drink);
      await loadDrinksData(); // Recarrega a lista
      
      console.log('[useDrinks] Drink adicionado com sucesso');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar drink';
      console.error('[useDrinks] Erro ao adicionar drink:', err);
      setError(errorMessage);
      throw err;
    }
  }, [loadDrinksData]);

  // Atualiza um drink existente
  const updateExistingDrink = useCallback(async (drink: Drink) => {
    try {
      setError(null);
      console.log('[useDrinks] Atualizando drink:', drink.id);
      
      await updateDrink(drink);
      await loadDrinksData(); // Recarrega a lista
      
      console.log('[useDrinks] Drink atualizado com sucesso');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar drink';
      console.error('[useDrinks] Erro ao atualizar drink:', err);
      setError(errorMessage);
      throw err;
    }
  }, [loadDrinksData]);

  // Remove um drink
  const removeDrink = useCallback(async (drinkId: string) => {
    try {
      setError(null);
      console.log('[useDrinks] Removendo drink:', drinkId);
      
      await deleteDrink(drinkId);
      await loadDrinksData(); // Recarrega a lista
      
      console.log('[useDrinks] Drink removido com sucesso');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover drink';
      console.error('[useDrinks] Erro ao remover drink:', err);
      setError(errorMessage);
      throw err;
    }
  }, [loadDrinksData]);

  return {
    drinks,
    loading,
    error,
    addNewDrink,
    updateExistingDrink,
    removeDrink,
    refreshDrinks: loadDrinksData,
  };
};

