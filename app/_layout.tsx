import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="_splash" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="drink/[id]" options={{ title: 'Detalhes do Drink' }} />
      <Stack.Screen name="drink/new" options={{ title: 'Adicionar Drink' }} />
      <Stack.Screen name="drink/edit" options={{ title: 'Editar Drink' }} />
    </Stack>
  );
}

