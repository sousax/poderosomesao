import { Link } from '@adonisjs/inertia/react'
import { useState } from 'react'

const GAMES = ['Magic: The Gathering', 'Pokémon TCG', 'Yu-Gi-Oh!', 'One Piece', 'Lorcana']
const MOST_SEARCHED = [
  'Sol Ring',
  'Charizard ex',
  'Ash Blossom & Joyous Spring',
  'Monkey D. Luffy',
  'The One Ring',
]

const CATEGORIES = [
  { label: 'Cartas avulsas', href: '#estoque' },
  { label: 'Lacrados', href: '#lancamentos' },
  { label: 'Pré-vendas', href: '#vitrine' },
  { label: 'Acessórios', href: '#vitrine' },
  { label: 'Edições', href: '#edicoes' },
  { label: 'Cartas em alta', href: '#cotacoes' },
  { label: 'Compra por lista', href: '#lista' },
  { label: 'Vender coleção', href: '#lista' },
]

const LAUNCHES = [
  { game: 'Magic: The Gathering', name: '[COLEÇÃO MAIS RECENTE]' },
  { game: 'Pokémon TCG', name: '[COLEÇÃO MAIS RECENTE]' },
]
const SEALED = ['Boosters', 'Displays', 'Bundles', 'Decks de Commander', 'Elite Trainer Box', 'Structure Decks']

const EDITIONS = [
  { game: 'Magic', name: '[EDIÇÃO]' },
  { game: 'Pokémon', name: '[EDIÇÃO]' },
  { game: 'Yu-Gi-Oh!', name: '[EDIÇÃO]' },
  { game: 'One Piece', name: '[EDIÇÃO]' },
  { game: 'Magic', name: '[EDIÇÃO]' },
  { game: 'Lorcana', name: '[EDIÇÃO]' },
]

const PERIODS = ['Dia', 'Semana', 'Mês']
const MOVERS = [
  {
    title: 'Cartas em alta',
    tone: 'up',
    cards: ['Sol Ring', 'Charizard ex', 'Monkey D. Luffy', 'Rhystic Study', 'Ash Blossom & Joyous Spring'],
  },
  {
    title: 'Cartas em queda',
    tone: 'down',
    cards: ['The One Ring', 'Pikachu ex', 'Nibiru, the Primal Being', 'Roronoa Zoro', 'Orcish Bowmasters'],
  },
  {
    title: 'Mais vistas',
    tone: 'views',
    cards: ['Mana Crypt', 'Umbreon VMAX', 'Snake-Eye Ash', 'Portgas D. Ace', 'Elsa, Spirit of Winter'],
  },
] as const

const STOCK = [
  { name: 'Sol Ring', pt: 'Anel Solar', game: 'Magic: The Gathering', tag: 'Magic', lang: 'EN', condition: 'NM', qty: 30 },
  { name: 'Charizard ex', game: 'Pokémon TCG', tag: 'Pokémon', lang: 'PT', condition: 'NM', qty: 4 },
  { name: 'Ash Blossom & Joyous Spring', game: 'Yu-Gi-Oh!', tag: 'Yu-Gi-Oh!', lang: 'EN', condition: 'SP', qty: 12 },
  { name: 'Monkey D. Luffy', game: 'One Piece Card Game', tag: 'One Piece', lang: 'JP', condition: 'NM', qty: 2 },
  { name: 'The One Ring', pt: 'O Um Anel', game: 'Magic: The Gathering', tag: 'Magic', lang: 'PT', condition: 'MP', qty: 1 },
]
const STOCK_FILTERS = ['Todos', 'Magic', 'Pokémon', 'Yu-Gi-Oh!', 'One Piece']

const SHOWCASE = [
  { badge: 'Lançamento', game: 'Magic: The Gathering', name: 'Display de boosters — [COLEÇÃO]' },
  { badge: 'Pré-venda', game: 'Pokémon TCG', name: 'Elite Trainer Box — [COLEÇÃO]' },
  { badge: 'Destaque', game: 'Yu-Gi-Oh!', name: 'Structure Deck — [NOME]' },
  { badge: 'Exclusivo', game: 'Acessórios', name: 'Playmat Poderoso Mesão — edição da casa' },
]

const GUARANTEES = [
  { title: 'Condição conferida', text: 'Cada carta avulsa é avaliada uma a uma. O estado anunciado é o estado que chega.' },
  { title: 'Envio protegido', text: 'Sleeve, top loader e caixa rígida. Rastreio para todo o Brasil.' },
  { title: 'Pix e cartão', text: 'Desconto no Pix e parcelamento no cartão. Negócios limpos, sempre.' },
  { title: 'Troca garantida', text: 'Chegou diferente do anunciado? A família resolve. Palavra de honra.' },
]

const eyebrow = 'text-[11px] uppercase tracking-[0.2em] text-pm-gold'
const btnRed =
  'inline-block bg-pm-red px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-pm-cream transition-colors hover:bg-[#a52231]'
const btnOutline =
  'inline-block border border-pm-gold/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-pm-cream transition-colors hover:border-pm-gold'
const btnSmall =
  'border border-pm-gold/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:border-pm-gold hover:bg-pm-gold/10'
const goldLink = 'text-[11px] font-semibold uppercase tracking-[0.15em] text-pm-gold underline underline-offset-4'
const input =
  'w-full border border-pm-gold/40 bg-pm-ink px-3 py-2.5 text-sm text-pm-cream outline-none placeholder:text-pm-muted/60 focus:border-pm-gold'

function Rose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M12 3c3 0 5 2 5 4.5S15 12 12 12s-4-1.5-4-3.5S10 5 12 6.5 13.5 9 12 9.5" />
      <path d="M12 12v9M12 16c-2 0-3.5-1-4-2.5M12 18c2 0 3.5-1 4-2.5" />
    </svg>
  )
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M3 4h2l2.4 11h10.8L21 7H6.2" />
      <circle cx="9" cy="19" r="1.3" />
      <circle cx="17" cy="19" r="1.3" />
    </svg>
  )
}

function SectionHead({ kicker, title, more }: { kicker: string; title: string; more?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={eyebrow}>{kicker}</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
      </div>
      {more && (
        <a href="#estoque" className={goldLink}>
          {more} →
        </a>
      )}
    </div>
  )
}

function Tabs({ options, value, onChange }: { options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={
            'border px-3 py-1.5 text-[11px] font-semibold transition-colors ' +
            (value === o ? 'border-pm-red bg-pm-red' : 'border-pm-line hover:border-pm-gold/60')
          }
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function Movers({ title, tone, cards }: (typeof MOVERS)[number]) {
  const [period, setPeriod] = useState('Semana')
  const color = tone === 'up' ? 'text-pm-up' : tone === 'down' ? 'text-pm-down' : 'text-pm-gold'
  const sign = tone === 'up' ? '▲ [+%]' : tone === 'down' ? '▼ [−%]' : '◉ [VISITAS]'

  return (
    <div className="border border-pm-line bg-pm-panel">
      <div className="flex items-center justify-between gap-3 border-b border-pm-line px-4 py-3">
        <h3 className="font-display text-lg">{title}</h3>
        <div className="flex text-[10px] uppercase tracking-[0.1em]">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={'px-2 py-1 ' + (period === p ? 'bg-pm-gold/15 text-pm-gold' : 'text-pm-muted hover:text-pm-cream')}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <ol>
        {cards.map((card) => (
          <li key={card} className="flex items-center gap-3 border-b border-pm-line/60 px-4 py-2.5 text-sm last:border-0">
            <span className={'w-20 shrink-0 text-[11px] ' + color}>{sign}</span>
            <a href="#estoque" className="flex-1 truncate hover:text-pm-gold">
              {card}
            </a>
            <span className="text-pm-muted">[R$]</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Page() {
  const [cart, setCart] = useState(0)
  const [filter, setFilter] = useState('Todos')
  const stock = filter === 'Todos' ? STOCK : STOCK.filter((c) => c.tag === filter)
  const addToCart = () => setCart((n) => n + 1)

  return (
    <div className="min-h-screen bg-pm-ink font-body text-pm-cream antialiased">
      <div className="bg-pm-red px-4 py-2 text-center text-[10px] uppercase tracking-[0.2em] sm:text-[11px]">
        Envio para todo o Brasil
        <span className="hidden sm:inline"> · [X]% off no Pix · Parcele em até [N]x no cartão</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-pm-line bg-pm-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 md:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-pm-gold text-pm-gold">
              <Rose className="size-5" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold tracking-wide">PODEROSO MESÃO</span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-pm-gold">TCG · Avulsas · Lacrados</span>
            </span>
          </a>

          <form
            className="order-last flex w-full md:order-none md:flex-1"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              aria-label="Jogo"
              className="w-28 shrink-0 border border-r-0 border-pm-gold/40 bg-pm-panel px-2 text-xs sm:w-auto text-pm-cream outline-none focus:border-pm-gold"
            >
              <option>Todos os jogos</option>
              {GAMES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
            <input
              type="search"
              aria-label="Buscar carta ou produto"
              placeholder="Qual carta a família procura?"
              className={input + ' min-w-0'}
            />
            <button type="submit" className="bg-pm-red px-5 text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#a52231]">
              Buscar
            </button>
          </form>

          <div className="ml-auto flex items-center gap-5 md:ml-0">
            <Link route="auth.sign_in.show" className="text-right text-[11px] leading-tight">
              <span className="block text-pm-muted">Faça parte</span>
              <span className="block font-semibold uppercase tracking-[0.1em] text-pm-gold">Entrar</span>
            </Link>
            <a href="#carrinho" className="relative" aria-label={`Carrinho, ${cart} itens`}>
              <CartIcon className="size-7 text-pm-gold" />
              {cart > 0 && (
                <span className="absolute -right-2 -top-1.5 flex size-5 items-center justify-center rounded-full bg-pm-red text-[10px] font-semibold">
                  {cart}
                </span>
              )}
            </a>
          </div>
        </div>

        <nav className="border-t border-pm-line bg-pm-panel">
          <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-2.5 md:px-8 lg:justify-between">
            {CATEGORIES.map((c) => (
              <li key={c.label} className="shrink-0">
                <a href={c.href} className="text-[11px] uppercase tracking-[0.15em] text-pm-gold hover:text-pm-cream">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="border-b border-pm-line">
        <p className="mx-auto flex max-w-6xl flex-wrap gap-x-3 gap-y-1 px-4 py-3 text-xs text-pm-muted md:px-8">
          Mais buscadas:
          {MOST_SEARCHED.map((name) => (
            <a key={name} href="#estoque" className="text-pm-gold underline underline-offset-2">
              {name}
            </a>
          ))}
        </p>
      </div>

      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_50%,#2a1214_0%,transparent_60%)]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className={eyebrow + ' flex items-center gap-3'}>
              <span className="h-px w-8 bg-pm-gold" /> Loja virtual de card games
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.1] md:text-6xl">
              Uma oferta que você <em className="text-pm-gold">não pode</em> recusar.
            </h1>
            <p className="mt-6 max-w-md text-pm-muted">
              Cartas avulsas, boosters lacrados e acessórios dos maiores TCGs, com estado conferido carta por carta e
              entrega para todo o Brasil.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#estoque" className={btnRed}>
                Comprar avulsas
              </a>
              <a href="#lancamentos" className={btnOutline}>
                Ver lacrados
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-72 w-full max-w-sm" aria-hidden>
            <div className="absolute left-0 top-6 h-56 w-40 -rotate-12 rounded-lg border border-pm-gold/50 bg-pm-ink p-2 shadow-2xl">
              <div className="flex h-full items-center justify-end rounded border border-pm-gold/30 pr-2 text-4xl text-pm-gold/70">
                ♠
              </div>
            </div>
            <div className="absolute right-0 top-6 h-56 w-40 rotate-12 rounded-lg border border-pm-gold/50 bg-pm-ink p-2 shadow-2xl">
              <div className="flex h-full items-center rounded border border-pm-gold/30 pl-2 text-4xl text-pm-gold/70">
                ♣
              </div>
            </div>
            <div className="absolute left-1/2 top-0 h-64 w-44 -translate-x-1/2 rounded-lg border border-pm-gold/40 bg-pm-red p-2 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
              <div className="flex h-full flex-col items-center justify-center rounded border border-pm-gold/50">
                <Rose className="size-8 text-pm-gold" />
                <span className="mt-4 font-display text-2xl tracking-widest">PM</span>
                <span className="mt-3 text-[9px] uppercase tracking-[0.3em] text-pm-cream/80">La Famiglia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-pm-line">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-5 font-display text-pm-cream/90">
          {GAMES.map((g, i) => (
            <li key={g} className="flex items-center gap-6">
              {i > 0 && <span className="text-xs text-pm-gold">✦</span>}
              <a href="#estoque" className="hover:text-pm-gold">
                {g}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section id="lancamentos" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <SectionHead kicker="Capítulo I" title="Os lançamentos da família" more="Todos os lacrados" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {LAUNCHES.map((l) => (
            <a
              key={l.game}
              href="#estoque"
              className="group relative flex h-56 items-end border border-pm-line bg-[linear-gradient(135deg,#2a1214,#15110e_60%)] p-6 transition-colors hover:border-pm-gold/60"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-pm-muted/50">
                [Arte da coleção]
              </span>
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">{l.game}</p>
                <p className="mt-1 font-display text-2xl">{l.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-pm-cream/80 group-hover:text-pm-gold">
                  Singles disponíveis →
                </p>
              </div>
            </a>
          ))}
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SEALED.map((s) => (
            <li key={s}>
              <a
                href="#vitrine"
                className="block border border-pm-line bg-pm-panel px-4 py-4 text-sm transition-colors hover:border-pm-gold/60 hover:text-pm-gold"
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="edicoes" className="border-t border-pm-line bg-pm-panel/60">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <SectionHead kicker="O arquivo" title="Edições" more="Todas as edições" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {EDITIONS.map((e, i) => (
              <a
                key={i}
                href="#estoque"
                className="group flex aspect-[3/4] flex-col justify-end border border-pm-line bg-[linear-gradient(180deg,#1b1514,#0e0b09)] p-3 transition-colors hover:border-pm-gold/60"
              >
                <span className="text-[9px] uppercase tracking-[0.2em] text-pm-gold">{e.game}</span>
                <span className="mt-1 font-display text-sm group-hover:text-pm-gold">{e.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="cotacoes" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <SectionHead kicker="O livro-caixa" title="O mercado da semana" more="Ver todas as cotações" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {MOVERS.map((m) => (
            <Movers key={m.title} {...m} />
          ))}
        </div>
      </section>

      <section id="estoque" className="border-t border-pm-line bg-pm-panel/60">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <SectionHead kicker="Capítulo II" title="Cartas avulsas em estoque" />
          <div className="mt-6">
            <Tabs options={STOCK_FILTERS} value={filter} onChange={setFilter} />
          </div>

          <ul className="mt-6 space-y-2">
            {stock.map((c) => (
              <li
                key={c.name}
                className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 border border-pm-line bg-pm-ink p-4 md:grid-cols-[auto_1fr_6rem_5rem_9rem_auto]"
              >
                <span className="row-span-2 h-16 w-12 rounded-sm border border-pm-line bg-pm-panel md:row-span-1" />
                <div className="min-w-0">
                  <p className="font-display text-lg leading-tight">{c.name}</p>
                  <p className="text-[11px] text-pm-muted">
                    {c.pt ? c.pt + ' · ' : ''}
                    {c.game} · [EDIÇÃO] #[Nº]
                  </p>
                </div>
                <div className="col-start-2 flex flex-wrap items-center gap-3 md:contents">
                  <span className="text-lg text-pm-gold md:text-right">[R$]</span>
                  <span className="flex gap-1.5 text-[10px] md:justify-center">
                    <span className="border border-pm-muted/50 px-1.5 py-0.5">{c.lang}</span>
                    <span className="border border-pm-muted/50 px-1.5 py-0.5">{c.condition}</span>
                  </span>
                  <label className="flex items-center gap-2 text-xs text-pm-muted">
                    <input
                      type="number"
                      min={1}
                      max={c.qty}
                      defaultValue={1}
                      aria-label={`Quantidade de ${c.name}`}
                      className="w-14 border border-pm-line bg-pm-panel px-2 py-1.5 text-center text-pm-cream outline-none focus:border-pm-gold"
                    />
                    de {c.qty}
                  </label>
                  <button type="button" onClick={addToCart} className={btnSmall + ' ml-auto md:ml-0'}>
                    Comprar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-pm-muted">
            Condição: NM (praticamente nova), SP (usada levemente), MP (usada moderadamente). Idioma: PT, EN, JP.
          </p>
        </div>
      </section>

      <section id="vitrine" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <SectionHead kicker="Capítulo III" title="A vitrine do Don" more="Ver todo o acervo" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE.map((p) => (
            <article key={p.name} className="flex flex-col border border-pm-line bg-pm-panel">
              <div className="relative flex h-44 items-center justify-center bg-[#1b1514] text-[10px] uppercase tracking-[0.2em] text-pm-muted/70">
                <span className="absolute left-2 top-2 bg-pm-red px-2 py-1 text-[9px] tracking-[0.15em] text-pm-cream">
                  {p.badge}
                </span>
                [Foto do produto]
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">{p.game}</p>
                <h3 className="mt-1 font-display text-lg leading-snug">{p.name}</h3>
                <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                  <div>
                    <p className="text-[10px] text-pm-muted">A partir de</p>
                    <p className="font-display text-lg">[PREÇO]</p>
                  </div>
                  <button type="button" onClick={addToCart} className={btnSmall}>
                    Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-pm-red px-4 py-20 text-center">
        <span className="mx-auto mb-8 flex w-10 items-center text-pm-cream/80" aria-hidden>
          <span className="h-px flex-1 bg-current" />
          <span className="text-xs">◇</span>
          <span className="h-px flex-1 bg-current" />
        </span>
        <blockquote className="mx-auto max-w-3xl font-display text-3xl italic leading-snug md:text-4xl">
          “Mantenha seus amigos perto. E seus decks, mais perto ainda.”
        </blockquote>
        <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-pm-gold">— Ditado da casa</p>
      </section>

      <section id="lista" className="mx-auto grid max-w-6xl gap-4 px-4 py-20 md:grid-cols-2 md:px-8">
        <form className="border border-pm-line bg-pm-panel p-8" onSubmit={(e) => e.preventDefault()}>
          <p className={eyebrow}>Capítulo IV</p>
          <h2 className="mt-3 font-display text-3xl">Compra por lista</h2>
          <p className="mt-3 text-sm text-pm-muted">
            Cole a lista do seu deck, uma carta por linha. A família separa tudo o que tem em estoque.
          </p>
          <textarea
            rows={6}
            aria-label="Lista de cartas"
            placeholder={'1 Sol Ring\n1 Rhystic Study\n4 Ash Blossom & Joyous Spring'}
            className={input + ' mt-5 resize-y font-mono text-xs'}
          />
          <button type="submit" className={btnRed + ' mt-3'}>
            Buscar minha lista
          </button>
        </form>

        <div className="flex flex-col border border-pm-red/70 bg-[#1c1011] p-8">
          <p className={eyebrow}>Capítulo V</p>
          <h2 className="mt-3 font-display text-3xl">Compramos sua coleção</h2>
          <p className="mt-3 text-sm leading-relaxed text-pm-muted">
            Tem cartas paradas na pasta? Faça uma proposta ao nosso consigliere. Pagamos em dinheiro ou em crédito na
            loja, com bônus para quem fica na família.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>✦ Avaliação carta por carta</li>
            <li>✦ Pagamento via Pix</li>
            <li>✦ Crédito na loja com bônus de [X]%</li>
          </ul>
          <a href="#contato" className={goldLink + ' mt-auto pt-6'}>
            Fazer uma proposta →
          </a>
        </div>
      </section>

      <section className="border-t border-pm-line bg-pm-panel/60">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <div className="text-center">
            <p className={eyebrow}>O código da família</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Negócios limpos, sempre</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-pm-muted">
              Na nossa família, honra vale mais que qualquer carta rara.
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-pm-line bg-pm-line sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((g, i) => (
              <div key={g.title} className="bg-pm-ink p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">Garantia nº {i + 1}</p>
                <h3 className="mt-3 font-display text-xl">{g.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pm-muted">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="familia" className="px-4 py-20">
        <div className="mx-auto max-w-5xl border border-pm-line p-2">
          <div className="grid gap-8 border border-pm-gold/60 bg-pm-panel p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className={eyebrow}>Clube de membros</p>
              <h2 className="mt-3 font-display text-4xl">Entre para a família</h2>
              <p className="mt-3 text-sm text-pm-muted">
                Receba primeiro as pré-vendas, os alertas de preço e as ofertas que só a família conhece.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-pm-muted">Seu e-mail</span>
                <input type="email" required placeholder="voce@exemplo.com" className={input} />
              </label>
              <button type="submit" className={btnRed + ' mt-2 w-full'}>
                Jurar lealdade
              </button>
              <p className="mt-3 text-[11px] text-pm-muted">Sem spam. Palavra de honra.</p>
            </form>
          </div>
        </div>
      </section>

      <footer id="contato" className="border-t border-pm-line bg-black/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold tracking-wide">PODEROSO MESÃO</p>
            <p className="mt-3 text-sm text-pm-muted">
              Loja virtual de card games. Avulsas, lacrados e acessórios, com cada cliente tratado como família.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">A loja</p>
            {['Cartas avulsas', 'Lacrados', 'Pré-vendas', 'Acessórios', 'Compra por lista'].map((l) => (
              <a key={l} href="#estoque" className="block hover:text-pm-gold">
                {l}
              </a>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">Ajuda</p>
            {['Prazos e frete', 'Formas de pagamento', 'Trocas e devoluções', 'Guia de condição das cartas'].map((l) => (
              <a key={l} href="#contato" className="block hover:text-pm-gold">
                {l}
              </a>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">Fale com o consigliere</p>
            <p>WhatsApp [TELEFONE]</p>
            <p>Instagram [@USUÁRIO]</p>
            <p>[E-MAIL]</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-pm-line px-4 py-6 text-[11px] text-pm-muted md:px-8">
          <p>© [ANO] Poderoso Mesão · CNPJ [CNPJ]. Todos os direitos reservados.</p>
          <p className="font-display italic">Não é pessoal. São só negócios.</p>
        </div>
      </footer>
    </div>
  )
}
