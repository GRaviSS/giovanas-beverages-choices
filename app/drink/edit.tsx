import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Drink, Ingredient } from '@/model/Drink';
import { useDrinks } from '@/hooks/useDrinks';
import { useDrinkForm } from '@/hooks/useDrinkForm';
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/Button';
import { Colors } from '@/constants/Colors';

/**
 * Tela de edição de drink
 * Permite editar um drink existente
 */
export default function DrinkEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { drinks, updateExistingDrink } = useDrinks();
  
  // Encontra o drink a ser editado
  const existingDrink = id ? drinks.find((d) => d.id === id) : undefined;
  
  const form = useDrinkForm(existingDrink);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('ml');
  const [showIngredientForm, setShowIngredientForm] = useState(false);

  // Carrega o drink quando disponível
  useEffect(() => {
    if (existingDrink) {
      console.log('[DrinkEditScreen] Carregando drink para edição:', existingDrink.id);
      form.loadDrink(existingDrink);
    } else if (id && drinks.length > 0) {
      Alert.alert('Erro', 'Drink não encontrado', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  }, [id, existingDrink, drinks.length]);

  // Solicita permissão e seleciona foto
  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        console.log('[DrinkEditScreen] Foto selecionada');
        form.setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('[DrinkEditScreen] Erro ao selecionar foto:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a foto');
    }
  };

  // Remove a foto
  const handleRemovePhoto = () => {
    Alert.alert('Remover foto', 'Deseja remover a foto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          console.log('[DrinkEditScreen] Removendo foto');
          form.setPhoto(undefined);
        },
      },
    ]);
  };

  // Adiciona ingrediente
  const handleAddIngredient = () => {
    if (!ingredientName.trim() || !ingredientQuantity.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha nome e quantidade do ingrediente');
      return;
    }

    const quantity = parseFloat(ingredientQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Quantidade inválida', 'A quantidade deve ser um número maior que zero');
      return;
    }

    const ingredient: Ingredient = {
      name: ingredientName.trim(),
      quantity,
      unit: ingredientUnit,
    };

    form.addIngredient(ingredient);
    setIngredientName('');
    setIngredientQuantity('');
    setIngredientUnit('ml');
    setShowIngredientForm(false);
  };

  // Salva as alterações
  const handleSave = async () => {
    if (!form.validate()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos obrigatórios');
      return;
    }

    if (!id) {
      Alert.alert('Erro', 'ID do drink não encontrado');
      return;
    }

    try {
      const drinkData = form.getDrinkData(id);
      console.log('[DrinkEditScreen] Atualizando drink:', drinkData.id);
      await updateExistingDrink(drinkData);
      router.back();
    } catch (error) {
      console.error('[DrinkEditScreen] Erro ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações');
    }
  };

  // Cancela e volta
  const handleCancel = () => {
    router.back();
  };

  if (!existingDrink) {
    return null; // Será redirecionado pelo useEffect
  }

  return (
    <ScrollView style={styles.container}>
      {/* Foto */}
      <View style={styles.photoSection}>
        {form.photo ? (
          <View>
            <Image source={{ uri: form.photo }} style={styles.photo} />
            <TouchableOpacity style={styles.removePhotoButton} onPress={handleRemovePhoto}>
              <Text style={styles.removePhotoText}>Remover foto</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addPhotoButton} onPress={handlePickImage}>
            <Text style={styles.addPhotoText}>+ Adicionar foto</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.form}>
        {/* Nome */}
        <View style={styles.field}>
          <Text style={styles.label}>Nome do drink *</Text>
          <TextInput
            style={[styles.input, form.errors.name && styles.inputError]}
            value={form.name}
            onChangeText={form.setName}
            placeholder="Ex: Mojito, Caipirinha..."
            placeholderTextColor={Colors.textSecondary}
          />
          {form.errors.name && <Text style={styles.errorText}>{form.errors.name}</Text>}
        </View>

        {/* Nota */}
        <View style={styles.field}>
          <Text style={styles.label}>Nota (1 a 5) *</Text>
          <StarRating
            rating={form.rating}
            editable
            onRatingChange={form.setRating}
            size={32}
          />
          {form.errors.rating && <Text style={styles.errorText}>{form.errors.rating}</Text>}
        </View>

        {/* Data */}
        <View style={styles.field}>
          <Text style={styles.label}>Data de experimentação</Text>
          <Text style={styles.dateText}>
            {form.date.toLocaleDateString('pt-BR')}
          </Text>
        </View>

        {/* Ingredientes */}
        <View style={styles.field}>
          <Text style={styles.label}>Ingredientes</Text>
          {form.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>
                {ingredient.quantity} {ingredient.unit} de {ingredient.name}
              </Text>
              <TouchableOpacity
                onPress={() => form.removeIngredient(index)}
                style={styles.removeIngredientButton}
              >
                <Text style={styles.removeIngredientText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {showIngredientForm ? (
            <View style={styles.ingredientForm}>
              <TextInput
                style={styles.input}
                value={ingredientName}
                onChangeText={setIngredientName}
                placeholder="Nome do ingrediente"
                placeholderTextColor={Colors.textSecondary}
              />
              <View style={styles.ingredientFormRow}>
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  value={ingredientQuantity}
                  onChangeText={setIngredientQuantity}
                  placeholder="Quantidade"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.textSecondary}
                />
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  value={ingredientUnit}
                  onChangeText={setIngredientUnit}
                  placeholder="Unidade (ml, oz...)"
                  placeholderTextColor={Colors.textSecondary}
                />
              </View>
              <View style={styles.ingredientFormActions}>
                <Button
                  title="Adicionar"
                  onPress={handleAddIngredient}
                  variant="primary"
                  style={styles.ingredientFormButton}
                />
                <Button
                  title="Cancelar"
                  onPress={() => setShowIngredientForm(false)}
                  variant="secondary"
                  style={styles.ingredientFormButton}
                />
              </View>
            </View>
          ) : (
            <Button
              title="+ Adicionar ingrediente"
              onPress={() => setShowIngredientForm(true)}
              variant="secondary"
              style={styles.addIngredientButton}
            />
          )}
        </View>

        {/* Modo de preparo */}
        <View style={styles.field}>
          <Text style={styles.label}>Modo de preparo</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.instructions}
            onChangeText={form.setInstructions}
            placeholder="Descreva como preparar o drink..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Botões de ação */}
        <View style={styles.actions}>
          <Button
            title="Cancelar"
            onPress={handleCancel}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="Salvar alterações"
            onPress={handleSave}
            variant="primary"
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
  photoSection: {
    padding: 16,
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  addPhotoButton: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  removePhotoButton: {
    padding: 8,
    alignItems: 'center',
  },
  removePhotoText: {
    fontSize: 14,
    color: Colors.danger,
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    backgroundColor: Colors.background,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  inputSmall: {
    flex: 1,
  },
  textArea: {
    minHeight: 120,
  },
  errorText: {
    fontSize: 14,
    color: Colors.danger,
    marginTop: 4,
  },
  dateText: {
    fontSize: 16,
    color: Colors.textPrimary,
    padding: 12,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  removeIngredientButton: {
    padding: 4,
  },
  removeIngredientText: {
    fontSize: 24,
    color: Colors.danger,
  },
  ingredientForm: {
    marginTop: 8,
  },
  ingredientFormRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  ingredientFormActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  ingredientFormButton: {
    flex: 1,
  },
  addIngredientButton: {
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
  },
});

