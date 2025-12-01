import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
  /** Texto do botão */
  title: string;
  
  /** Callback chamado quando o botão é pressionado */
  onPress: () => void;
  
  /** Variante do botão (primary, secondary, danger) */
  variant?: 'primary' | 'secondary' | 'danger';
  
  /** Se true, o botão fica desabilitado */
  disabled?: boolean;
  
  /** Se true, mostra um indicador de carregamento */
  loading?: boolean;
  
  /** Estilos customizados para o container */
  style?: ViewStyle;
  
  /** Estilos customizados para o texto */
  textStyle?: TextStyle;
}

/**
 * Componente de botão reutilizável
 * Suporta diferentes variantes e estados (disabled, loading)
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return Colors.border;
    switch (variant) {
      case 'primary':
        return Colors.primary;
      case 'secondary':
        return Colors.secondary;
      case 'danger':
        return Colors.danger;
      default:
        return Colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.textSecondary;
    return Colors.textLight;
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      console.log('[Button] Botão pressionado:', title);
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

