import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Drink } from '@/model/Drink';
import { useDrinks } from '@/hooks/useDrinks';
import { DrinkCard } from '@/components/DrinkCard';
import { DrinkCardSkeleton } from '@/components/DrinkCardSkeleton';
import { Colors } from '@/constants/Colors';

type SortOption = 'all' | 'rating' | 'recent';

/**
 * Tela principal - Lista de Drinks
 * Exibe todos os drinks cadastrados com opções de ordenação
 */
export default function DrinksListScreen() {
  const router = useRouter();
  const { drinks, loading, removeDrink } = useDrinks();
  const [sortOption, setSortOption] = useState<SortOption>('all');

  // Ordena os drinks baseado na opção selecionada
  const sortedDrinks = useMemo(() => {
    const drinksCopy = [...drinks];

    switch (sortOption) {
      case 'rating':
        // Ordena por nota (maior primeiro), depois por data (mais recente primeiro)
        return drinksCopy.sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.date.getTime() - a.date.getTime();
        });
      case 'recent':
        // Ordena por data (mais recente primeiro)
        return drinksCopy.sort((a, b) => b.date.getTime() - a.date.getTime());
      default:
        // Mantém ordem original (ou pode ordenar por nome)
        return drinksCopy.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [drinks, sortOption]);

  // Navega para os detalhes do drink
  const handleDrinkPress = (drink: Drink) => {
    console.log('[DrinksListScreen] Drink selecionado:', drink.id);
    router.push(`/drink/${drink.id}`);
  };

  // Navega para adicionar novo drink
  const handleAddPress = () => {
    console.log('[DrinksListScreen] Navegando para adicionar drink');
    router.push('/drink/new');
  };

  // Renderiza um item da lista
  const renderDrinkItem = ({ item }: { item: Drink }) => (
    <DrinkCard drink={item} onPress={() => handleDrinkPress(item)} />
  );

  // Renderiza o header com opções de ordenação
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Meus Drinks</Text>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === 'all' && styles.sortButtonActive]}
          onPress={() => setSortOption('all')}
        >
          <Text style={[styles.sortText, sortOption === 'all' && styles.sortTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === 'rating' && styles.sortButtonActive]}
          onPress={() => setSortOption('rating')}
        >
          <Text style={[styles.sortText, sortOption === 'rating' && styles.sortTextActive]}>
            Melhores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === 'recent' && styles.sortButtonActive]}
          onPress={() => setSortOption('recent')}
        >
          <Text style={[styles.sortText, sortOption === 'recent' && styles.sortTextActive]}>
            Recentes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Renderiza lista vazia
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum drink cadastrado</Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleAddPress}>
        <Text style={styles.emptyButtonText}>Adicionar primeiro drink</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.listContent}>
          {[1, 2, 3].map((i) => (
            <DrinkCardSkeleton key={i} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedDrinks}
        renderItem={renderDrinkItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
      />

      {/* Botão flutuante para adicionar */}
      <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  listContent: {
    paddingBottom: 80,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sortText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sortTextActive: {
    color: Colors.textLight,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  emptyButtonText: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: Colors.textLight,
    fontWeight: '300',
  },
});

