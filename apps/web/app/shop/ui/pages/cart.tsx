import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'

import { urlFor } from '~/app/client'

import StoreLayout, {
  btnRed,
  eyebrow,
  formatPrice,
  goldLink,
} from '#shop/ui/components/store_layout'

import type { InertiaProps } from '#core/ui/types'
import type { Data } from '@generated/data'

type PageProps = InertiaProps<{
  lines: { quantity: number; product: Data.Shop.Product }[]
  totalCents: number
  cartCount: number
}>

const setQuantity = (productId: number, quantity: number) =>
  router.put(urlFor('cart.update', { productId }), { quantity }, { preserveScroll: true })

const remove = (productId: number) =>
  router.delete(urlFor('cart.destroy', { productId }), { preserveScroll: true })

const stepper =
  'flex size-8 items-center justify-center border border-pm-line hover:border-pm-gold/60 disabled:opacity-40'

export default function CartPage({ lines, totalCents, cartCount }: PageProps) {
  return (
    <StoreLayout cartCount={cartCount}>
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <p className={eyebrow}>O acerto de contas</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Seu carrinho</h1>

        {lines.length === 0 ? (
          <div className="mt-10 border border-pm-line bg-pm-panel p-10 text-center">
            <p className="font-display text-2xl">O carrinho está vazio.</p>
            <p className="mt-2 text-sm text-pm-muted">A família tem cartas esperando por você.</p>
            <Link route="shop.home" className={btnRed + ' mt-6'}>
              Voltar à vitrine
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
            <ul className="space-y-2">
              {lines.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 border border-pm-line bg-pm-panel p-4 sm:grid-cols-[auto_1fr_auto_7rem]"
                >
                  <span className="row-span-2 h-16 w-12 rounded-sm border border-pm-line bg-pm-ink sm:row-span-1" />
                  <div className="min-w-0">
                    <p className="font-display text-lg leading-tight">{product.name}</p>
                    <p className="text-[11px] text-pm-muted">
                      {[product.game, product.language, product.condition]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    <p className="mt-1 text-xs text-pm-gold">
                      {formatPrice(product.priceCents)} cada
                    </p>
                  </div>
                  <div className="col-start-2 flex items-center gap-3 sm:col-start-auto">
                    <div className="flex items-center">
                      <button
                        type="button"
                        aria-label={`Diminuir ${product.name}`}
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        className={stepper}
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Aumentar ${product.name}`}
                        disabled={quantity >= product.stock}
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        className={stepper}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="text-[11px] uppercase tracking-[0.15em] text-pm-muted underline underline-offset-4 hover:text-pm-down"
                    >
                      Remover
                    </button>
                  </div>
                  <p className="col-start-2 font-display text-lg sm:col-start-auto sm:text-right">
                    {formatPrice(product.priceCents * quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <aside className="border border-pm-gold/60 bg-pm-panel p-6 lg:sticky lg:top-40">
              <p className={eyebrow}>Resumo</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-pm-muted">Itens</dt>
                  <dd>{cartCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-pm-muted">Frete</dt>
                  <dd className="text-pm-muted">calculado no checkout</dd>
                </div>
                <div className="flex justify-between border-t border-pm-line pt-3 font-display text-xl">
                  <dt>Total</dt>
                  <dd className="text-pm-gold">{formatPrice(totalCents)}</dd>
                </div>
              </dl>
              <button
                type="button"
                disabled
                className={btnRed + ' mt-6 w-full'}
                title="Checkout em breve"
              >
                Finalizar compra
              </button>
              <p className="mt-2 text-center text-[11px] text-pm-muted">Checkout em breve.</p>
              <Link route="shop.home" className={goldLink + ' mt-6 block text-center'}>
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </section>
    </StoreLayout>
  )
}
