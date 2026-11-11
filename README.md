# Poderoso Mesão

Loja virtual de card games: cartas avulsas, produtos lacrados e acessórios de Magic: The Gathering, Pokémon TCG, Yu-Gi-Oh!, One Piece e Lorcana.

> _Uma oferta que você não pode recusar._

## Status

O projeto está no começo. Hoje existe:

- **Landing page** (`/`) no visual "versão escura" da marca, com a estrutura de loja inspirada na LigaMagic: busca por carta com seletor de jogo, categorias, lançamentos, edições, cotações (cartas em alta, em queda e mais vistas), estoque de avulsas, vitrine de lacrados, compra por lista e venda de coleção.
- **Base do starter kit**: login, cadastro, usuários, permissões, notificações e i18n, já funcionando.

Ainda falta:

- Busca, carrinho, checkout, compra por lista e newsletter só existem na tela e não têm backend.
- Os textos entre colchetes (`[R$]`, `[EDIÇÃO]`, `[TELEFONE]`, `[CNPJ]`…) precisam ser trocados pelos dados reais.

## Stack

AdonisJS 7 · Inertia + React 19 · Tailwind CSS 4 + shadcn/ui · PostgreSQL 16 · monorepo pnpm + Turbo.

Baseado no [adonisjs-starter-kit](https://github.com/filipebraida/adonisjs-starter-kit), de Filipe Braida.

## Requisitos

- Node.js `>=24`
- pnpm `11.9.0` (o `corepack` ativa automaticamente)
- Docker, para o Postgres e o Mailpit

## Como rodar

```bash
pnpm install
cp apps/web/.env.example apps/web/.env
pnpm ace generate:key
pnpm infra:up            # Postgres + Mailpit + pgAdmin
pnpm ace migration:run
pnpm ace db:seed
pnpm dev
```

O app sobe em `http://localhost:3333`. Se a porta estiver ocupada, o Adonis escolhe outra e mostra o endereço no terminal.

Para derrubar a infra: `pnpm infra:down`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | servidor de desenvolvimento com hot reload |
| `pnpm test` | suíte de testes (Japa, contra Postgres real) |
| `pnpm typecheck` | checagem de tipos em todo o monorepo |
| `pnpm lint` | ESLint + Prettier |
| `pnpm ace <cmd>` | CLI do Adonis a partir da raiz |

Antes de abrir um PR, rode `pnpm typecheck && pnpm lint`.

## Estrutura

```
apps/web/                 app AdonisJS + Inertia
  app/<módulo>/           cada contexto é um módulo: auth, users, marketing, …
    controllers/ actions/ validators/ ui/ routes.ts tests/
  app/marketing/ui/pages/show.tsx   landing da loja
  app/core/ui/css/app.css           cores (pm-*) e fontes da marca
packages/ui/              componentes base (shadcn/Radix)
packages/skills/          skills para agentes de código
```

As convenções de arquitetura estão em [`AGENTS.md`](./AGENTS.md).

## Identidade visual

Paleta escura com vinho, dourado e creme, definida como tokens Tailwind em `apps/web/app/core/ui/css/app.css` (`bg-pm-ink`, `text-pm-gold`, `bg-pm-red`…). As fontes são Libre Baskerville nos títulos e Libre Franklin no texto.

## Licença

MIT. Veja [LICENSE](LICENSE).
