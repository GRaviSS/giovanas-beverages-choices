/**
 * Formata uma data para exibição no formato brasileiro (DD/MM/YYYY)
 * @param date - Data a ser formatada
 * @returns String formatada (ex: "15/01/2025")
 */
export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Converte uma string de data (do formato ISO ou armazenamento) para objeto Date
 * @param dateString - String da data
 * @returns Objeto Date
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

