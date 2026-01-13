# Configuração do Supabase

## Passo 1: Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Preencha:
   - **Name**: drinks-da-giovana (ou outro nome)
   - **Database Password**: Crie uma senha forte (anote ela!)
   - **Region**: Escolha a mais próxima (ex: South America - São Paulo)
5. Clique em "Create new project"
6. Aguarde alguns minutos enquanto o projeto é criado

## Passo 2: Criar as Tabelas

1. No dashboard do Supabase, vá em **SQL Editor** (ícone no menu lateral)
2. Clique em **New Query**
3. Copie e cole o conteúdo do arquivo `supabase/schema.sql`
4. Clique em **Run** (ou pressione Cmd/Ctrl + Enter)
5. Você deve ver "Success. No rows returned"

## Passo 3: Obter Credenciais

1. No dashboard, vá em **Settings** → **API**
2. Você verá:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: uma string longa

## Passo 4: Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

2. Substitua pelos valores reais do seu projeto

## Passo 5: Testar

Após configurar, o app usará o Supabase automaticamente!

## Estrutura das Tabelas

### drinks
- `id` (UUID) - Identificador único
- `name` (TEXT) - Nome do drink
- `rating` (INTEGER) - Nota de 1 a 5
- `date` (TIMESTAMPTZ) - Data de experimentação
- `instructions` (TEXT) - Modo de preparo
- `photo` (TEXT) - URL da foto
- `created_at` (TIMESTAMPTZ) - Data de criação
- `updated_at` (TIMESTAMPTZ) - Data de atualização

### ingredients
- `id` (UUID) - Identificador único
- `drink_id` (UUID) - Referência ao drink
- `name` (TEXT) - Nome do ingrediente
- `quantity` (NUMERIC) - Quantidade
- `unit` (TEXT) - Unidade (ml, oz, etc.)
- `created_at` (TIMESTAMPTZ) - Data de criação

## Notas Importantes

- O arquivo `.env` está no `.gitignore` (não será commitado)
- As credenciais são públicas (anon key), mas ainda assim não devem ser compartilhadas
- O banco está configurado para permitir todas as operações (sem autenticação)
- Em produção, considere adicionar autenticação e políticas mais restritivas

