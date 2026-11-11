import type { Session } from '@adonisjs/session'

import Product from '#shop/models/product'

/** productId → quantity, kept in the session so guests can shop without an account. */
type CartItems = Record<string, number>

const SESSION_KEY = 'cart'

export default class Cart {
  constructor(private session: Session) {}

  count() {
    return Object.values(this.items()).reduce((sum, quantity) => sum + quantity, 0)
  }

  /** Adds up to what is in stock; returns how many units were actually added. */
  async add(product: Product, quantity: number) {
    const current = this.items()[product.id] ?? 0
    const next = Math.min(current + quantity, product.stock)
    this.put(product.id, next)
    return next - current
  }

  async set(productId: number, quantity: number) {
    const product = await Product.find(productId)
    this.put(productId, product ? Math.min(quantity, product.stock) : 0)
  }

  /**
   * Stock can drop after an item was added, so every read re-clamps the
   * quantities against the current stock and writes the result back.
   */
  async lines() {
    const items = this.items()
    const products = await Product.query()
      .whereIn('id', Object.keys(items).map(Number))
      .orderBy('name')

    const lines = products
      .map((product) => ({ product, quantity: Math.min(items[product.id], product.stock) }))
      .filter((line) => line.quantity > 0)

    this.session.put(SESSION_KEY, Object.fromEntries(lines.map((l) => [l.product.id, l.quantity])))

    return {
      lines,
      totalCents: lines.reduce((sum, l) => sum + l.product.priceCents * l.quantity, 0),
    }
  }

  private items(): CartItems {
    return this.session.get(SESSION_KEY, {})
  }

  private put(productId: number, quantity: number) {
    const items = { ...this.items() }
    if (quantity > 0) items[productId] = quantity
    else delete items[productId]
    this.session.put(SESSION_KEY, items)
  }
}
