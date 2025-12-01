import { Redirect } from 'expo-router';

/**
 * Rota inicial - redireciona para a splash screen
 */
export default function Index() {
  return <Redirect href="/_splash" />;
}

