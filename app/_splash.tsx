import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

/**
 * Tela de splash (carregamento inicial)
 * Aparece por 2-3 segundos e navega automaticamente para a lista
 */
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('[SplashScreen] Iniciando splash...');
    
    // Aguarda 2.5 segundos antes de navegar
    const timer = setTimeout(() => {
      console.log('[SplashScreen] Navegando para lista de drinks');
      router.replace('/(tabs)');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Foto da Giovana */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/giovana.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <Text style={styles.title}>Drinks da Giovana</Text>
      <Text style={styles.subtitle}>Seus drinks favoritos</Text>
      
      <ActivityIndicator size="large" color={Colors.textLight} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  imageContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textLight,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textLight,
    opacity: 0.9,
    marginBottom: 32,
  },
  loader: {
    marginTop: 32,
  },
});

