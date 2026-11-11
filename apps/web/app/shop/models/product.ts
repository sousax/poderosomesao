import { column } from '@adonisjs/lucid/orm'

import BaseModel from '#common/models/base_model'

export type ProductKind = 'single' | 'sealed' | 'accessory'

export default class Product extends BaseModel {
  static table = 'products'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare subtitle: string | null

  @column()
  declare game: string

  @column()
  declare kind: ProductKind

  @column()
  declare badge: string | null

  @column()
  declare language: string | null

  @column()
  declare condition: string | null

  @column()
  declare priceCents: number

  @column()
  declare stock: number
}
