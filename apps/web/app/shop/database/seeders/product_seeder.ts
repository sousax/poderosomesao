import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Product from '#shop/models/product'

// Sample catalog for development; prices and stock are illustrative.
export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.updateOrCreateMany('name', [
      {
        name: 'Sol Ring',
        subtitle: 'Anel Solar',
        game: 'Magic: The Gathering',
        kind: 'single',
        language: 'EN',
        condition: 'NM',
        priceCents: 690,
        stock: 30,
      },
      {
        name: 'Charizard ex',
        game: 'Pokémon TCG',
        kind: 'single',
        language: 'PT',
        condition: 'NM',
        priceCents: 18990,
        stock: 4,
      },
      {
        name: 'Ash Blossom & Joyous Spring',
        game: 'Yu-Gi-Oh!',
        kind: 'single',
        language: 'EN',
        condition: 'SP',
        priceCents: 4500,
        stock: 12,
      },
      {
        name: 'Monkey D. Luffy',
        game: 'One Piece Card Game',
        kind: 'single',
        language: 'JP',
        condition: 'NM',
        priceCents: 12900,
        stock: 2,
      },
      {
        name: 'The One Ring',
        subtitle: 'O Um Anel',
        game: 'Magic: The Gathering',
        kind: 'single',
        language: 'PT',
        condition: 'MP',
        priceCents: 29900,
        stock: 1,
      },
      {
        name: 'Display de boosters — Coleção mais recente',
        game: 'Magic: The Gathering',
        kind: 'sealed',
        badge: 'Lançamento',
        priceCents: 89990,
        stock: 6,
      },
      {
        name: 'Elite Trainer Box — Coleção mais recente',
        game: 'Pokémon TCG',
        kind: 'sealed',
        badge: 'Pré-venda',
        priceCents: 39990,
        stock: 10,
      },
      {
        name: 'Structure Deck',
        game: 'Yu-Gi-Oh!',
        kind: 'sealed',
        badge: 'Destaque',
        priceCents: 7990,
        stock: 15,
      },
      {
        name: 'Playmat Poderoso Mesão — edição da casa',
        game: 'Acessórios',
        kind: 'accessory',
        badge: 'Exclusivo',
        priceCents: 14990,
        stock: 20,
      },
    ])
  }
}
