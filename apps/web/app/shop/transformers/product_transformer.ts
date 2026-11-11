import { BaseTransformer } from '@adonisjs/core/transformers'

import type Product from '#shop/models/product'

export default class ProductTransformer extends BaseTransformer<Product> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'name',
      'subtitle',
      'game',
      'kind',
      'badge',
      'language',
      'condition',
      'priceCents',
      'stock',
    ])
  }
}
