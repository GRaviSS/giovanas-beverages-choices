import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Drink } from '@/model/Drink';
import { useDrinks } from '@/hooks/useDrinks';
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/Button';
import { formatDate } from '@/utils/dateFormat';
import { Colors } from '@/constants/Colors';

/**
 * Tela de detalhes do drink
 * Exibe todas as informações do drink e permite editar ou excluir
 */
export default function DrinkDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { drinks, loading, removeDrink } = useDrinks();
  const [drink, setDrink] = useState<Drink | null>(null);

  // Encontra o drink pelo ID
  useEffect(() => {
    if (id && drinks.length > 0) {
      const foundDrink = drinks.find((d) => d.id === id);
      if (foundDrink) {
        console.log('[DrinkDetailsScreen] Drink encontrado:', foundDrink.name);
        setDrink(foundDrink);
      } else {
        console.log('[DrinkDetailsScreen] Drink não encontrado:', id);
        Alert.alert('Erro', 'Drink não encontrado', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    }
  }, [id, drinks, router]);

  // Navega para edição
  const handleEdit = () => {
    if (drink) {
      console.log('[DrinkDetailsScreen] Navegando para edição:', drink.id);
      router.push({
        pathname: '/drink/edit',
        params: { id: drink.id },
      });
    }
  };

  // Confirma e exclui o drink
  const handleDelete = () => {
    if (!drink) return;

    Alert.alert(
      'Excluir Drink',
      `Tem certeza que deseja excluir "${drink.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('[DrinkDetailsScreen] Excluindo drink:', drink.id);
              await removeDrink(drink.id);
              router.back();
            } catch (error) {
              console.error('[DrinkDetailsScreen] Erro ao excluir:', error);
              Alert.alert('Erro', 'Não foi possível excluir o drink');
            }
          },
        },
      ]
    );
  };

  if (loading || !drink) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Foto do drink */}
      {drink.photo ? (
        <Image source={{ uri: drink.photo }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.photoPlaceholder]}>
          <Text style={styles.placeholderText}>🍹</Text>
        </View>
      )}

      <View style={styles.content}>
        {/* Nome e nota */}
        <Text style={styles.name}>{drink.name}</Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={drink.rating} size={28} />
        </View>
        <Text style={styles.date}>Experimentado em: {formatDate(drink.date)}</Text>

        {/* Ingredientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {drink.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              • {ingredient.quantity} {ingredient.unit} de {ingredient.name}
            </Text>
          ))}
        </View>

        {/* Modo de preparo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modo de Preparo</Text>
          <Text style={styles.instructions}>{drink.instructions}</Text>
        </View>

        {/* Botões de ação */}
        <View style={styles.actions}>
          <Button
            title="Editar"
            onPress={handleEdit}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="Excluir"
            onPress={handleDelete}
            variant="danger"
            style={styles.actionButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  photo: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.backgroundLight,
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  ingredient: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 24,
  },
  instructions: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
});

