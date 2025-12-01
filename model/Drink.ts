import { Ingredient } from './Ingredient';

/**
 * Modelo de dados para um drink
 */
export interface Drink {
  /** Identificador único do drink */
  id: string;
  
  /** Nome do drink (ex: "Mojito", "Caipirinha") */
  name: string;
  
  /** Nota de avaliação de 1 a 5 */
  rating: number;
  
  /** Data em que o drink foi experimentado */
  date: Date;
  
  /** Lista de ingredientes necessários */
  ingredients: Ingredient[];
  
  /** Instruções de preparo do drink */
  instructions: string;
  
  /** URI ou caminho da foto do drink (opcional) */
  photo?: string;
}

