import type { HttpContext } from '@adonisjs/core/http'

import Product from '#shop/models/product'
import Cart from '#shop/services/cart'
import ProductTransformer from '#shop/transformers/product_transformer'
import { addToCartValidator, updateCartItemValidator } from '#shop/validators/cart'

export default class CartController {
  async show({ inertia, session }: HttpContext) {
    const cart = new Cart(session)
    const { lines, totalCents } = await cart.lines()

    return inertia.render('shop/cart', {
      lines: lines.map((line) => ({
        quantity: line.quantity,
        product: new ProductTransformer(line.product).toObject(),
      })),
      totalCents,
      cartCount: cart.count(),
    })
  }

  async store({ request, response, session }: HttpContext) {
    const { productId, quantity } = await request.validateUsing(addToCartValidator)
    const product = await Product.findOrFail(productId)

    const added = await new Cart(session).add(product, quantity)

    if (added > 0) session.flash('success', `${product.name} foi para o carrinho.`)
    else session.flash('error', `Não há mais ${product.name} em estoque.`)

    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const { quantity } = await request.validateUsing(updateCartItemValidator)
    await new Cart(session).set(Number(params.productId), quantity)

    return response.redirect().toRoute('cart.show')
  }

  async destroy({ params, response, session }: HttpContext) {
    await new Cart(session).set(Number(params.productId), 0)

    return response.redirect().toRoute('cart.show')
  }
}
