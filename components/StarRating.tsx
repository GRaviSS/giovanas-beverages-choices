import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface StarRatingProps {
  /** Nota de 1 a 5 */
  rating: number;
  
  /** Se true, permite clicar nas estrelas para alterar a nota */
  editable?: boolean;
  
  /** Callback chamado quando a nota é alterada (apenas se editable=true) */
  onRatingChange?: (rating: number) => void;
  
  /** Tamanho das estrelas em pixels */
  size?: number;
}

/**
 * Componente de avaliação por estrelas
 * Exibe de 1 a 5 estrelas baseado na nota
 * Pode ser editável (clicável) ou apenas visual
 */
export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  editable = false,
  onRatingChange,
  size = 24,
}) => {
  const handleStarPress = (newRating: number) => {
    if (editable && onRatingChange) {
      console.log('[StarRating] Nota alterada:', newRating);
      onRatingChange(newRating);
    }
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled = starValue <= rating;
        const StarComponent = editable ? TouchableOpacity : View;
        
        return (
          <StarComponent
            key={starValue}
            onPress={() => editable && handleStarPress(starValue)}
            disabled={!editable}
            style={styles.star}
          >
            <Text
              style={[
                styles.starText,
                {
                  fontSize: size,
                  color: isFilled ? Colors.starFilled : Colors.starEmpty,
                },
              ]}
            >
              ★
            </Text>
          </StarComponent>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
  starText: {
    lineHeight: 24,
  },
});

