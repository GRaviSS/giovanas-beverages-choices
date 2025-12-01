import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
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
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  thumbnailPlaceholder: {
    backgroundColor: Colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  ratingContainer: {
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  arrow: {
    fontSize: 24,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
});

