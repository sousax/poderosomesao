import type { HttpContext } from '@adonisjs/core/http'

import Product from '#shop/models/product'
import Cart from '#shop/services/cart'
import ProductTransformer from '#shop/transformers/product_transformer'

export default class ShopController {
  async home({ inertia, session }: HttpContext) {
    const products = await Product.query().where('stock', '>', 0).orderBy('id')

    return inertia.render('shop/home', {
      singles: ProductTransformer.transform(products.filter((p) => p.kind === 'single')),
      showcase: ProductTransformer.transform(products.filter((p) => p.kind !== 'single')),
      cartCount: new Cart(session).count(),
    })
  }
}
