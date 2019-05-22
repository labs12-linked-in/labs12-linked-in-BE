const router = require('express').Router()
const stripe = require('stripe')('STRIPE_SECRET_KEY')
const uuid = require('uuid/v4')

router.post('/checkout', async (req, res) => {
  console.log('Request:', req.body)

  let error
  let status
  try {
    const { product, token } = req.body

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`
      },
      {
        idempotency_key
      }
    )
    console.log('Charge:', { charge })
    status = 'success'
  } catch (error) {
    console.error('Error:', error)
    status = 'failure'
  }

  res.json({ error, status })
})

module.exports = router
