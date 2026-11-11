import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('name').notNullable()
      table.text('subtitle').nullable()
      table.text('game').notNullable()
      table.enum('kind', ['single', 'sealed', 'accessory']).notNullable()
      table.text('badge').nullable()
      table.text('language').nullable()
      table.text('condition').nullable()
      table.integer('price_cents').notNullable()
      table.integer('stock').notNullable().defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.check('price_cents >= 0')
      table.check('stock >= 0')
      table.index(['kind'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
