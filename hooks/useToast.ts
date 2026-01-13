import { useState, useCallback } from 'react';

interface UseToastReturn {
  /** Mensagem atual do toast */
  message: string;
  
  /** Tipo do toast */
  type: 'success' | 'error' | 'info';
  
  /** Se o toast está visível */
  visible: boolean;
  
  /** Mostra um toast de sucesso */
  showSuccess: (message: string) => void;
  
  /** Mostra um toast de erro */
  showError: (message: string) => void;
  
  /** Mostra um toast de informação */
  showInfo: (message: string) => void;
  
  /** Esconde o toast */
  hide: () => void;
}

/**
 * Hook para gerenciar toasts
 * Facilita mostrar mensagens de feedback ao usuário
 */
export const useToast = (): UseToastReturn => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [visible, setVisible] = useState<boolean>(false);

  const showToast = useCallback((msg: string, toastType: 'success' | 'error' | 'info') => {
    console.log(`[useToast] Mostrando toast ${toastType}:`, msg);
    setMessage(msg);
    setType(toastType);
    setVisible(true);
  }, []);

  const showSuccess = useCallback((msg: string) => {
    showToast(msg, 'success');
  }, [showToast]);

  const showError = useCallback((msg: string) => {
    showToast(msg, 'error');
  }, [showToast]);

  const showInfo = useCallback((msg: string) => {
    showToast(msg, 'info');
  }, [showToast]);

  const hide = useCallback(() => {
    console.log('[useToast] Escondendo toast');
    setVisible(false);
  }, []);

  return {
    message,
    type,
    visible,
    showSuccess,
    showError,
    showInfo,
    hide,
  };
};

