# 🇧🇷 CONHEÇA O BRASIL

> Projeto escolar/acadêmico sobre **Condições de Vida, Desigualdade e Pobreza no Brasil** com base em dados do IBGE.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Auth_%2B_DB-3ECF8E?logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000?logo=vercel)

---

## 📋 Sobre o Projeto

**CONHEÇA O BRASIL** é uma aplicação web interativa que apresenta dados do IBGE sobre condições de vida, desigualdade e pobreza no Brasil. O projeto inclui:

- 📊 **Dashboard Interativo** — Dezenas de gráficos dinâmicos baseados em dados reais do IBGE
- 🧠 **Curiosidades** — Insights automáticos gerados a partir dos dados
- 🎮 **Quiz Interativo** — Teste seus conhecimentos sobre o Brasil
- 🏆 **Ranking/Leaderboard** — Classificação em tempo real dos melhores jogadores
- 🔐 **Autenticação** — Login e cadastro seguro com Supabase Auth

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **Next.js 16** | Framework React com App Router |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS 4** | Estilização responsiva |
| **shadcn/ui** | Componentes de UI |
| **Recharts** | Gráficos interativos |
| **Supabase** | Autenticação e Banco de Dados |
| **Prisma** | ORM para banco de dados |
| **NextAuth.js** | Autenticação |
| **Zustand** | Gerenciamento de estado |

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Bun (ou npm/yarn)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USERNAME/conheca-o-brasil.git
cd conheca-o-brasil

# Instale as dependências
bun install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com suas credenciais Supabase

# Execute o projeto
bun run dev
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` com:

```env
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

## 📁 Estrutura do Projeto

```
conheca-o-brasil/
├── src/
│   ├── app/                    # App Router (Next.js)
│   │   ├── api/                # API Routes
│   │   │   ├── auth/           # Autenticação
│   │   │   ├── quiz/           # Quiz endpoints
│   │   │   └── ranking/        # Ranking endpoints
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Página principal
│   ├── components/
│   │   ├── auth/               # Tela de login/cadastro
│   │   ├── curiosidades/       # Seção de curiosidades
│   │   ├── dashboard/          # Dashboard com gráficos
│   │   ├── layout/             # Sidebar e navegação
│   │   ├── quiz/               # Quiz interativo
│   │   ├── ranking/            # Leaderboard
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilitários e configurações
│   └── types/                  # Tipos TypeScript
├── prisma/                     # Schema do banco de dados
├── public/                     # Assets estáticos
└── package.json
```

## 📊 Dados do IBGE

Os dados utilizados neste projeto são baseados na pesquisa do IBGE sobre:

- **Condições de Vida** — Renda, habitação, saneamento
- **Desigualdade** — Distribuição de renda, índice de Gini
- **Pobreza** — Linha de pobreza, vulnerabilidade social

Fonte: [IBGE - Condições de Vida, Desigualdade e Pobreza](https://www.ibge.gov.br/estatisticas/multidominio/condicoes-de-vida-desigualdade-e-pobreza.html)

## 📝 Licença

Este projeto é de uso acadêmico/educacional.

---

Feito com ❤️ para o projeto escolar **CONHEÇA O BRASIL**
