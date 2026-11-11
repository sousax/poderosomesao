import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

import Product from '#shop/models/product'

const createSingle = (stock: number, priceCents = 1000) =>
  Product.create({
    name: `Carta ${stock}`,
    game: 'Magic: The Gathering',
    kind: 'single',
    priceCents,
    stock,
  })

test.group('Loja e carrinho', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('GET / mostra a vitrine sem exigir login, só com produtos em estoque', async ({
    client,
    assert,
  }) => {
    const available = await createSingle(3)
    const soldOut = await createSingle(0)

    const response = await client.get('/').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('shop/home')
    const ids = response.inertiaProps.singles.map((p: { id: number }) => p.id)
    assert.include(ids, available.id)
    assert.notInclude(ids, soldOut.id)
  })

  test('adicionar soma ao carrinho sem passar do estoque', async ({ client }) => {
    const product = await createSingle(3)

    const response = await client
      .post('/carrinho/itens')
      .withSession({ cart: { [product.id]: 2 } })
      .withCsrfToken()
      .json({ productId: product.id, quantity: 5 })
      .redirects(0)

    response.assertStatus(302)
    response.assertSession('cart', { [product.id]: 3 })
    response.assertFlashMessage('success', `${product.name} foi para o carrinho.`)
  })

  test('adicionar produto já esgotado no carrinho avisa e não altera', async ({ client }) => {
    const product = await createSingle(1)

    const response = await client
      .post('/carrinho/itens')
      .withSession({ cart: { [product.id]: 1 } })
      .withCsrfToken()
      .json({ productId: product.id, quantity: 1 })
      .redirects(0)

    response.assertSession('cart', { [product.id]: 1 })
    response.assertFlashMessage('error', `Não há mais ${product.name} em estoque.`)
  })

  test('adicionar quantidade inválida é rejeitado', async ({ client }) => {
    const product = await createSingle(3)

    const response = await client
      .post('/carrinho/itens')
      .withCsrfToken()
      .json({ productId: product.id, quantity: 0 })
      .redirects(0)

    response.assertStatus(302)
    response.assertSessionMissing('cart')
  })

  test('GET /carrinho calcula o total e reajusta itens ao estoque atual', async ({
    client,
    assert,
  }) => {
    const a = await createSingle(5, 690)
    const b = await createSingle(1, 2500)

    const response = await client
      .get('/carrinho')
      .withSession({ cart: { [a.id]: 2, [b.id]: 4 } })
      .withInertia()

    response.assertInertiaComponent('shop/cart')
    assert.equal(response.inertiaProps.totalCents, 2 * 690 + 1 * 2500)
    assert.equal(response.inertiaProps.cartCount, 3)
    response.assertSession('cart', { [a.id]: 2, [b.id]: 1 })
  })

  test('atualizar para zero e remover tiram o item do carrinho', async ({ client }) => {
    const a = await createSingle(5)
    const b = await createSingle(5)

    const updated = await client
      .put(`/carrinho/itens/${a.id}`)
      .withSession({ cart: { [a.id]: 2, [b.id]: 1 } })
      .withCsrfToken()
      .json({ quantity: 0 })
      .redirects(0)
    updated.assertSession('cart', { [b.id]: 1 })

    const removed = await client
      .delete(`/carrinho/itens/${b.id}`)
      .withSession({ cart: { [b.id]: 1 } })
      .withCsrfToken()
      .redirects(0)
    removed.assertSession('cart', {})
  })
})
