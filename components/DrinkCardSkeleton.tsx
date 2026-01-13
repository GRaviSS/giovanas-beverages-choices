import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';

/**
 * Componente de skeleton para mostrar enquanto os drinks estão carregando
 * Cria um efeito de "shimmer" animado
 */
export const DrinkCardSkeleton: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.card}>
      {/* Thumbnail skeleton */}
      <Animated.View style={[styles.thumbnail, { opacity }]} />

      {/* Info skeleton */}
      <View style={styles.info}>
        <Animated.View style={[styles.line, styles.titleLine, { opacity }]} />
        <Animated.View style={[styles.line, styles.ratingLine, { opacity }]} />
        <Animated.View style={[styles.line, styles.dateLine, { opacity }]} />
      </View>
    </View>
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
  info: {
    flex: 1,
  },
  line: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.backgroundLight,
    marginBottom: 8,
  },
  titleLine: {
    width: '70%',
    height: 18,
    marginBottom: 10,
  },
  ratingLine: {
    width: '40%',
    height: 14,
    marginBottom: 8,
  },
  dateLine: {
    width: '50%',
    height: 12,
  },
});

