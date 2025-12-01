import { Drink } from '@/model/Drink';

/**
 * Dados iniciais de exemplo para popular o app na primeira execução
 * Estes drinks serão carregados apenas se o armazenamento estiver vazio
 */
export const initialDrinks: Drink[] = [
  {
    id: '1',
    name: 'Mojito',
    rating: 5,
    date: new Date('2024-11-15'),
    ingredients: [
      { name: 'Rum branco', quantity: 50, unit: 'ml' },
      { name: 'Açúcar', quantity: 2, unit: 'colheres' },
      { name: 'Hortelã', quantity: 10, unit: 'folhas' },
      { name: 'Lima', quantity: 1, unit: 'unidade' },
      { name: 'Água com gás', quantity: 100, unit: 'ml' },
    ],
    instructions: 'Amasse a hortelã com açúcar no copo. Adicione o rum e o suco de lima. Complete com água com gás e gelo. Mexa suavemente.',
  },
  {
    id: '2',
    name: 'Caipirinha',
    rating: 5,
    date: new Date('2024-11-20'),
    ingredients: [
      { name: 'Cachaça', quantity: 50, unit: 'ml' },
      { name: 'Limão', quantity: 1, unit: 'unidade' },
      { name: 'Açúcar', quantity: 2, unit: 'colheres' },
      { name: 'Gelo', quantity: 4, unit: 'cubos' },
    ],
    instructions: 'Corte o limão em pedaços. Coloque no copo com açúcar e amasse. Adicione a cachaça e o gelo. Mexa bem.',
  },
  {
    id: '3',
    name: 'Piña Colada',
    rating: 4,
    date: new Date('2024-12-01'),
    ingredients: [
      { name: 'Rum', quantity: 50, unit: 'ml' },
      { name: 'Leite de coco', quantity: 100, unit: 'ml' },
      { name: 'Abacaxi', quantity: 150, unit: 'ml' },
      { name: 'Gelo', quantity: 6, unit: 'cubos' },
    ],
    instructions: 'Bata todos os ingredientes no liquidificador até ficar cremoso. Sirva em copo alto com gelo.',
  },
];

