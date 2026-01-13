import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Drink } from '@/model/Drink';
import { StarRating } from './StarRating';
import { formatDate } from '@/utils/dateFormat';
import { Colors } from '@/constants/Colors';

interface DrinkCardProps {
  /** Drink a ser exibido */
  drink: Drink;
  
  /** Callback chamado quando o card é pressionado */
  onPress: () => void;
}

/**
 * Componente de card para exibir um drink na lista
 * Mostra miniatura, nome, nota e data
 */
export const DrinkCard: React.FC<DrinkCardProps> = ({ drink, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
      {/* Miniatura da foto */}
      {drink.photo ? (
        <Image source={{ uri: drink.photo }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
          <Text style={styles.placeholderText}>🍹</Text>
        </View>
      )}

      {/* Informações do drink */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {drink.name}
        </Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={drink.rating} size={16} />
        </View>
        <Text style={styles.date}>{formatDate(drink.date)}</Text>
      </View>

      {/* Ícone de seta */}
      <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: Colors.backgroundLight,
  },
  thumbnailPlaceholder: {
    backgroundColor: Colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  placeholderText: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  ratingContainer: {
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 28,
    color: Colors.primary,
    marginLeft: 12,
    fontWeight: '300',
  },
});

