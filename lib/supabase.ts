import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Configuração do Supabase
// Substitua essas variáveis pelas suas credenciais do Supabase
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Verifica se o Supabase está configurado
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Logs de debug
console.log('[Supabase] Configuração:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'não configurado',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'não configurado',
  configured: isSupabaseConfigured,
  fromConstants: !!Constants.expoConfig?.extra?.supabaseUrl,
  fromEnv: !!process.env.EXPO_PUBLIC_SUPABASE_URL,
});

if (!isSupabaseConfigured) {
  console.warn('[Supabase] URL ou Anon Key não configurados. O app usará AsyncStorage local.');
  console.warn('[Supabase] Para usar Supabase, configure EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * Cliente Supabase para comunicação com o banco de dados
 * Use este cliente para fazer queries, inserts, updates e deletes
 * Retorna null se não estiver configurado
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Não precisamos de autenticação por enquanto
      },
    })
  : null;

