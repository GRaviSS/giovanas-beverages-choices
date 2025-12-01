/**
 * Modelo de dados para um ingrediente de drink
 */
export interface Ingredient {
  /** Nome do ingrediente (ex: "Rum", "Açúcar", "Hortelã") */
  name: string;
  
  /** Quantidade numérica do ingrediente */
  quantity: number;
  
  /** Unidade de medida (ex: "ml", "oz", "colher", "fatia", "unidade") */
  unit: string;
}

