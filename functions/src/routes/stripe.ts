import * as express from 'express'

const { corsHandler } = require('../index')

const router = express.Router()
const bodyParser = require('body-parser')

const Stripe = require('stripe')
const stripe = Stripe('sk_test_CSO5sCU4TsvQSFlOpspnShi5003S4QpoBN') // @todo implement test and live keys using ENV vars

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.raw({ type: 'application/json' }))

router.post('/detach_payment_method', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { paymentMethodId } = req.body
      const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId)
      return res.json(paymentMethod)
    } catch (error) {
      console.log('detach_payment_method', error)
      return res.status(400).send(error)
    }
  })
})

router.get('/payment_methods', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId } = req.query

      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card'
      })

      return res.json(paymentMethods.data)
    } catch (error) {
      console.log('get_payment_methods', error)
      return res.status(400).send(error)
    }
  })
})

router.post('/attach_payment_method', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId, paymentMethodId } = req.body

      const paymentMethod = await stripe.paymentMethods.attach(
        paymentMethodId,
        { customer: customerId }
      )

      return res.json(paymentMethod)
    } catch (error) {
      console.log('attach_payment_method', error)
      return res.status(400).send(error)
    }
  })
})

router.get('/customer', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId } = req.query

      const customer = await stripe.customers.retrieve(customerId)

      return res.json(customer)
    } catch (error) {
      console.log('get_customer', error)
      return res.status(400).send(error)
    }
  })
})

router.post('/customer', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { email, name } = req.body

      const customer = await stripe.customers.create({
        email,
        name
      })

      return res.json(customer)
    } catch (error) {
      console.log('create_customer', error)
      return res.status(400).send(error)
    }
  })
})

router.get('/get_account', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { id } = req.query

      if (!id) {
        throw Error('missing id')
      }

      const account = await stripe.accounts.retrieve(id)

      return res.json(account)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/create_login_link', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { id, redirect_url } = req.body

      if (!id) {
        throw Error('missing id')
      }

      const loginLink = await stripe.accounts.createLoginLink(id, {
        redirect_url
      })

      return res.json(loginLink)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/create_account', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { country, email } = req.body

      console.log(req.body)

      if (!country) {
        throw Error('missing country')
      }
      if (!email) {
        throw Error('missing email')
      }

      const account = await stripe.accounts.create({
        type: 'express',
        country,
        email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        }
      })

      return res.json(account)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/create_account_link', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { id, refresh_url, return_url } = req.body

      console.log(req.body)

      if (!id) {
        throw Error('missing account id')
      }
      if (!refresh_url) {
        throw Error('missing refresh_url')
      }
      if (!return_url) {
        throw Error('missing return_url')
      }

      const accountLink = await stripe.accountLinks.create({
        account: id,
        refresh_url,
        return_url,
        type: 'account_onboarding'
      })

      return res.json(accountLink)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/get_plans_list', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const plans = await stripe.plans.list({ limit: 2 })
      return res.json(plans)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/plan_subscription', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId, planId, paymentMethodId } = req.body
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        default_payment_method: paymentMethodId,
        items: [{ price: planId }]
      })
      return res.json(subscription)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/stripe-webhook', (req, res) => {
  return corsHandler(req, res, async () => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.log(err)
      console.log(`⚠️  Webhook signature verification failed.`)
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      )
      return res.sendStatus(400)
    }
    // Extract the object from the event.
    // const dataObject = event.data.object

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.paid':
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        break
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        break
      default:
      // Unexpected event type
    }
    return res.sendStatus(200)
  })
})

module.exports = router
