import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'

const { Shop, Cart } = controllers.shop

router.get('/', [Shop, 'home']).as('shop.home')

router.get('/carrinho', [Cart, 'show']).as('cart.show')
router.post('/carrinho/itens', [Cart, 'store']).as('cart.store')
router
  .put('/carrinho/itens/:productId', [Cart, 'update'])
  .where('productId', router.matchers.number())
  .as('cart.update')
router
  .delete('/carrinho/itens/:productId', [Cart, 'destroy'])
  .where('productId', router.matchers.number())
  .as('cart.destroy')
