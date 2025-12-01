import { useState, useCallback } from 'react';
import { Drink, Ingredient } from '@/model/Drink';

interface UseDrinkFormReturn {
  /** Nome do drink */
  name: string;
  setName: (name: string) => void;
  
  /** Nota de 1 a 5 */
  rating: number;
  setRating: (rating: number) => void;
  
  /** Data de experimentação */
  date: Date;
  setDate: (date: Date) => void;
  
  /** Lista de ingredientes */
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (index: number, ingredient: Ingredient) => void;
  
  /** Modo de preparo */
  instructions: string;
  setInstructions: (instructions: string) => void;
  
  /** URI da foto */
  photo: string | undefined;
  setPhoto: (photo: string | undefined) => void;
  
  /** Erros de validação */
  errors: Record<string, string>;
  
  /** Valida o formulário */
  validate: () => boolean;
  
  /** Reseta o formulário */
  reset: () => void;
  
  /** Carrega dados de um drink existente no formulário */
  loadDrink: (drink: Drink) => void;
  
  /** Cria um objeto Drink a partir dos dados do formulário */
  getDrinkData: (id?: string) => Drink;
}

/**
 * Hook para gerenciar o formulário de adicionar/editar drink
 * Gerencia todos os campos e validações
 */
export const useDrinkForm = (initialDrink?: Drink): UseDrinkFormReturn => {
  const [name, setName] = useState<string>(initialDrink?.name || '');
  const [rating, setRating] = useState<number>(initialDrink?.rating || 0);
  const [date, setDate] = useState<Date>(initialDrink?.date || new Date());
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialDrink?.ingredients || []);
  const [instructions, setInstructions] = useState<string>(initialDrink?.instructions || '');
  const [photo, setPhoto] = useState<string | undefined>(initialDrink?.photo);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Adiciona um ingrediente
  const addIngredient = useCallback((ingredient: Ingredient) => {
    console.log('[useDrinkForm] Adicionando ingrediente:', ingredient.name);
    setIngredients((prev) => [...prev, ingredient]);
  }, []);

  // Remove um ingrediente
  const removeIngredient = useCallback((index: number) => {
    console.log('[useDrinkForm] Removendo ingrediente no índice:', index);
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Atualiza um ingrediente
  const updateIngredient = useCallback((index: number, ingredient: Ingredient) => {
    console.log('[useDrinkForm] Atualizando ingrediente no índice:', index);
    setIngredients((prev) => prev.map((item, i) => (i === index ? ingredient : item)));
  }, []);

  // Valida o formulário
  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nome do drink é obrigatório';
    }

    if (rating < 1 || rating > 5) {
      newErrors.rating = 'Selecione uma nota de 1 a 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, rating]);

  // Reseta o formulário
  const reset = useCallback(() => {
    console.log('[useDrinkForm] Resetando formulário');
    setName('');
    setRating(0);
    setDate(new Date());
    setIngredients([]);
    setInstructions('');
    setPhoto(undefined);
    setErrors({});
  }, []);

  // Carrega dados de um drink existente
  const loadDrink = useCallback((drink: Drink) => {
    console.log('[useDrinkForm] Carregando drink no formulário:', drink.id);
    setName(drink.name);
    setRating(drink.rating);
    setDate(drink.date);
    setIngredients(drink.ingredients);
    setInstructions(drink.instructions);
    setPhoto(drink.photo);
    setErrors({});
  }, []);

  // Cria um objeto Drink a partir dos dados do formulário
  const getDrinkData = useCallback((id?: string): Drink => {
    return {
      id: id || Date.now().toString(), // Gera ID baseado em timestamp se não fornecido
      name: name.trim(),
      rating,
      date,
      ingredients,
      instructions: instructions.trim(),
      photo,
    };
  }, [name, rating, date, ingredients, instructions, photo]);

  return {
    name,
    setName,
    rating,
    setRating,
    date,
    setDate,
    ingredients,
    addIngredient,
    removeIngredient,
    updateIngredient,
    instructions,
    setInstructions,
    photo,
    setPhoto,
    errors,
    validate,
    reset,
    loadDrink,
    getDrinkData,
  };
};

