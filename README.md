# 🍹 Drinks da Giovana

Aplicativo mobile para registrar e organizar os drinks favoritos da Giovana. Desenvolvido com React Native, Expo e TypeScript.

## 📱 Sobre o Projeto

O **Drinks da Giovana** é um aplicativo Android que permite cadastrar, visualizar, editar e excluir drinks com informações detalhadas sobre cada receita. O app funciona completamente offline, armazenando todos os dados localmente no dispositivo.

## ✨ Funcionalidades

- ✅ **Splash Screen** - Tela de boas-vindas com foto da Giovana
- ✅ **Lista de Drinks** - Visualização de todos os drinks cadastrados em cards
- ✅ **Ordenação** - Filtrar por: Todos, Melhores Notas, Mais Recentes
- ✅ **Detalhes do Drink** - Visualização completa com foto, ingredientes e modo de preparo
- ✅ **Adicionar Drink** - Formulário completo para cadastrar novos drinks
- ✅ **Editar Drink** - Modificar informações de drinks existentes
- ✅ **Excluir Drink** - Remover drinks com confirmação
- ✅ **Fotos** - Adicionar foto opcional para cada drink
- ✅ **Ingredientes** - Gerenciar lista de ingredientes com quantidades e unidades
- ✅ **Avaliação** - Sistema de notas de 1 a 5 estrelas
- ✅ **Persistência Local** - Dados salvos localmente (funciona offline)
- ✅ **Dados Iniciais** - App vem com 3 drinks de exemplo pré-cadastrados

## 🛠️ Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma e ferramentas para React Native
- **TypeScript** - Tipagem estática para JavaScript
- **Expo Router** - Sistema de navegação baseado em arquivos
- **AsyncStorage** - Armazenamento local persistente
- **Expo Image Picker** - Seleção de fotos da galeria
- **Jest** - Framework de testes

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo Go** (app no celular Android para testar)

## 🚀 Como Instalar e Executar

### 1. Clone o repositório

```bash
git clone https://github.com/GRaviSS/giovanas-beverages-choices.git
cd giovanas-beverages-choices
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm start
```

### 4. Teste no dispositivo

- **Android**: Escaneie o QR code com o app Expo Go
- **iOS**: Escaneie o QR code com a câmera do iPhone
- **Web**: Pressione `w` no terminal

## 📁 Estrutura do Projeto

```
giovanas-beverages-choices/
├── app/                    # Telas (Expo Router)
│   ├── (tabs)/
│   │   └── index.tsx      # Tela principal (lista)
│   ├── drink/
│   │   ├── [id].tsx       # Detalhes do drink
│   │   ├── new.tsx        # Adicionar novo drink
│   │   └── edit.tsx       # Editar drink
│   ├── _splash.tsx        # Splash screen
│   └── _layout.tsx        # Layout principal
│
├── components/             # Componentes reutilizáveis
│   ├── DrinkCard.tsx
│   ├── StarRating.tsx
│   └── Button.tsx
│
├── data/                   # Camada de dados
│   ├── repository.ts      # Funções CRUD
│   └── initialData.ts    # Dados iniciais
│
├── hooks/                  # Hooks customizados
│   ├── useDrinks.ts
│   └── useDrinkForm.ts
│
├── model/                  # Tipos TypeScript
│   ├── Drink.ts
│   └── Ingredient.ts
│
├── utils/                  # Funções auxiliares
│   └── dateFormat.ts
│
├── constants/             # Constantes
│   └── Colors.ts
│
└── __tests__/             # Testes
    ├── components/
    ├── hooks/
    ├── data/
    └── utils/
```

## 🎨 Design

O app utiliza uma paleta de cores moderna com:
- **Primária**: Rosa/Magenta (#E91E63)
- **Secundária**: Roxo (#9C27B0)
- **Sucesso**: Verde (#4CAF50)
- **Alerta**: Vermelho (#F44336)

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na web
npm run web

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 🧪 Testes

O projeto está configurado para testes com Jest e React Native Testing Library. Os testes estão organizados na pasta `__tests__/`.

```bash
npm test
```

## 📦 Dados Iniciais

O app vem com 3 drinks de exemplo pré-cadastrados:
- **Mojito** (5 estrelas)
- **Caipirinha** (5 estrelas)
- **Piña Colada** (4 estrelas)

## 🔄 Armazenamento

Todos os dados são armazenados localmente no dispositivo usando AsyncStorage. Os dados persistem entre sessões do app e funcionam completamente offline.

## 🚧 Próximas Melhorias

- [ ] Busca/filtro por nome do drink
- [ ] Compartilhamento de drinks
- [ ] Estatísticas (total, média de notas)
- [ ] Exportar/importar dados (backup)
- [ ] Testes automatizados
- [ ] Melhorias de UI/UX
- [ ] Preparação para produção

## 📄 Licença

Este projeto é de uso pessoal.

## 👤 Autor

**Gabriel Ravi Santos**

- GitHub: [@GRaviSS](https://github.com/GRaviSS)

## 🙏 Agradecimentos

Projeto desenvolvido para a Giovana registrar seus drinks favoritos! 🍹

---

**Desenvolvido com ❤️ usando React Native e Expo**

