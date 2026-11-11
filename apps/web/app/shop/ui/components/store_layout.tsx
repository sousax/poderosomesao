import { Link } from '@adonisjs/inertia/react'
import type { PropsWithChildren } from 'react'

import { Toaster } from '@workspace/ui/components/sonner'

import useFlashToasts from '#common/ui/hooks/use_flash_toasts'

export const GAMES = ['Magic: The Gathering', 'Pokémon TCG', 'Yu-Gi-Oh!', 'One Piece', 'Lorcana']

const CATEGORIES = [
  { label: 'Cartas avulsas', href: '/#estoque' },
  { label: 'Lacrados', href: '/#lancamentos' },
  { label: 'Pré-vendas', href: '/#vitrine' },
  { label: 'Acessórios', href: '/#vitrine' },
  { label: 'Edições', href: '/#edicoes' },
  { label: 'Cartas em alta', href: '/#cotacoes' },
  { label: 'Compra por lista', href: '/#lista' },
  { label: 'Vender coleção', href: '/#lista' },
]

export const eyebrow = 'text-[11px] uppercase tracking-[0.2em] text-pm-gold'
export const btnRed =
  'inline-block bg-pm-red px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-pm-cream transition-colors hover:bg-[#a52231] disabled:opacity-50'
export const btnOutline =
  'inline-block border border-pm-gold/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-pm-cream transition-colors hover:border-pm-gold'
export const btnSmall =
  'border border-pm-gold/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:border-pm-gold hover:bg-pm-gold/10 disabled:opacity-50'
export const goldLink =
  'text-[11px] font-semibold uppercase tracking-[0.15em] text-pm-gold underline underline-offset-4'
export const input =
  'w-full border border-pm-gold/40 bg-pm-ink px-3 py-2.5 text-sm text-pm-cream outline-none placeholder:text-pm-muted/60 focus:border-pm-gold'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const formatPrice = (cents: number) => brl.format(cents / 100)

export function Rose({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
    >
      <path d="M12 3c3 0 5 2 5 4.5S15 12 12 12s-4-1.5-4-3.5S10 5 12 6.5 13.5 9 12 9.5" />
      <path d="M12 12v9M12 16c-2 0-3.5-1-4-2.5M12 18c2 0 3.5-1 4-2.5" />
    </svg>
  )
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
    >
      <path d="M3 4h2l2.4 11h10.8L21 7H6.2" />
      <circle cx="9" cy="19" r="1.3" />
      <circle cx="17" cy="19" r="1.3" />
    </svg>
  )
}

export default function StoreLayout({
  cartCount,
  children,
}: PropsWithChildren<{ cartCount: number }>) {
  useFlashToasts()

  return (
    <div className="min-h-screen bg-pm-ink font-body text-pm-cream antialiased">
      <div className="bg-pm-red px-4 py-2 text-center text-[10px] uppercase tracking-[0.2em] sm:text-[11px]">
        Envio para todo o Brasil
        <span className="hidden sm:inline"> · [X]% off no Pix · Parcele em até [N]x no cartão</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-pm-line bg-pm-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 md:px-8">
          <Link route="shop.home" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-pm-gold text-pm-gold">
              <Rose className="size-5" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold tracking-wide">
                PODEROSO MESÃO
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-pm-gold">
                TCG · Avulsas · Lacrados
              </span>
            </span>
          </Link>

          <form
            className="order-last flex w-full md:order-none md:flex-1"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              aria-label="Jogo"
              className="w-28 shrink-0 border border-r-0 border-pm-gold/40 bg-pm-panel px-2 text-xs text-pm-cream outline-none focus:border-pm-gold sm:w-auto"
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
            <button
              type="submit"
              className="bg-pm-red px-5 text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#a52231]"
            >
              Buscar
            </button>
          </form>

          <div className="ml-auto flex items-center gap-5 md:ml-0">
            <Link route="auth.sign_in.show" className="text-right text-[11px] leading-tight">
              <span className="block text-pm-muted">Faça parte</span>
              <span className="block font-semibold uppercase tracking-[0.1em] text-pm-gold">
                Entrar
              </span>
            </Link>
            <Link
              route="cart.show"
              className="relative"
              aria-label={`Carrinho, ${cartCount} itens`}
            >
              <CartIcon className="size-7 text-pm-gold" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex min-w-5 items-center justify-center rounded-full bg-pm-red px-1 text-[10px] font-semibold leading-5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="border-t border-pm-line bg-pm-panel">
          <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-2.5 md:px-8 lg:justify-between">
            {CATEGORIES.map((c) => (
              <li key={c.label} className="shrink-0">
                <a
                  href={c.href}
                  className="text-[11px] uppercase tracking-[0.15em] text-pm-gold hover:text-pm-cream"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer id="contato" className="border-t border-pm-line bg-black/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold tracking-wide">PODEROSO MESÃO</p>
            <p className="mt-3 text-sm text-pm-muted">
              Loja virtual de card games. Avulsas, lacrados e acessórios, com cada cliente tratado
              como família.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">A loja</p>
            {['Cartas avulsas', 'Lacrados', 'Pré-vendas', 'Acessórios', 'Compra por lista'].map(
              (l) => (
                <a key={l} href="/#estoque" className="block hover:text-pm-gold">
                  {l}
                </a>
              )
            )}
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">Ajuda</p>
            {[
              'Prazos e frete',
              'Formas de pagamento',
              'Trocas e devoluções',
              'Guia de condição das cartas',
            ].map((l) => (
              <a key={l} href="#contato" className="block hover:text-pm-gold">
                {l}
              </a>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-pm-gold">
              Fale com o consigliere
            </p>
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

      <Toaster />
    </div>
  )
}
