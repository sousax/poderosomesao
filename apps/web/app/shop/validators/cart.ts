import vine from '@vinejs/vine'

export const addToCartValidator = vine.create({
  productId: vine.number().withoutDecimals().positive(),
  quantity: vine.number().withoutDecimals().min(1).max(99),
})

export const updateCartItemValidator = vine.create({
  quantity: vine.number().withoutDecimals().min(0).max(99),
})
