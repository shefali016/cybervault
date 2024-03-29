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

      if (!email) {
        throw Error('missing email')
      }
      if (!country) {
        throw Error('missing country')
      }

      const account = await stripe.accounts.create({
        type: 'express',
        country: country,
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

router.get('/get_products', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const plans = await stripe.products.list({ active: true })
      return res.json(plans)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.get('/get_plans', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { productId } = req.query
      const plans = await stripe.plans.list({ product: productId })
      return res.json(plans)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.get('/subscription', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId } = req.query
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId
      })
      return res.json(subscriptions)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/plan_subscription', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId, planId, paymentMethodId, type } = req.body
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        default_payment_method: paymentMethodId,
        items: [{ price: planId }],
        metadata: { type }
      })
      await stripe.customers.update(customerId, {
        metadata: { subscription: subscription.id }
      })
      return res.json(subscription)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/cancel_plan_subscription', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { subscriptionId } = req.body
      const updatedSubscription = await stripe.subscriptions.update(
        subscriptionId,
        {
          cancel_at_period_end: true
        }
      )
      return res.json(updatedSubscription)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/update_subscription_plan', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { subscriptionId, planId, type } = req.body
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const updatedSubscription = await stripe.subscriptions.update(
        subscriptionId,
        {
          cancel_at_period_end: false,
          proration_behavior: 'always_invoice',
          items: [
            {
              id: subscription.items.data[0].id,
              price: planId
            }
          ],
          metadata: { type }
        }
      )
      return res.json(updatedSubscription)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/update_storage_plan_price', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const {
        extraStorage,
        amount,
        customerId,
        accountId,
        paymentMethodId,
        productId,
        subscriptionPlanId
      } = req.body
      const plans = await stripe.plans.list({ product: productId })
      let subscribedPlan: any = null
      for (let index = 0; index < plans.data.length; index++) {
        const plan = plans.data[index]
        if (plan.metadata?.accountId === accountId) {
          subscribedPlan = plan
        }
      }

      if (subscribedPlan) {
        await stripe.plans.del(subscribedPlan.id)
      }

      let subscription: any = null

      if (subscriptionPlanId && parseInt(extraStorage) === 0) {
        // delete subscription
        await stripe.subscriptions.del(subscriptionPlanId)
      } else {
        // create subscription
        const price = await stripe.prices.create({
          product: productId,
          metadata: {
            accountId: accountId,
            extraStorage,
            type: 'storage'
          },
          unit_amount: amount,
          nickname: 'Storage Plan',
          currency: 'usd',
          recurring: {
            interval: 'month'
          }
        })

        if (subscriptionPlanId) {
          subscription = await stripe.subscriptions.update(subscriptionPlanId, {
            default_payment_method: paymentMethodId,
            cancel_at_period_end: false,
            proration_behavior: 'always_invoice',
            items: [{ price: price.id }],
            metadata: { type: 'storage', extraStorage }
          })
        } else {
          subscription = await stripe.subscriptions.create({
            customer: customerId,
            default_payment_method: paymentMethodId,
            items: [{ price: price.id }],
            metadata: { type: 'storage', extraStorage }
          })
        }
      }

      return res.json(subscription)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/customer_balance_transctions', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId } = req.body
      const balanceTransactions = await stripe.customers.listBalanceTransactions(
        customerId,
        { limit: 3 }
      )
      return res.json(balanceTransactions)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/get_customer_invoices', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { customerId } = req.body
      const invoices = await stripe.invoices.list({
        customer: customerId
      })
      return res.json(invoices)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/set_payment_method_to_default', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { paymentMethodId, customerId } = req.body
      const customer = await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      })
      return res.json(customer)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/get_customer_balance', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { stripeAccountId } = req.body
      const balance = await stripe.balance.retrieve({
        stripe_account: stripeAccountId
      })

      let totalBalance = 0,
        balanceAvailable = 0,
        balancePending = 0

      if (balance) {
        balanceAvailable = balance.available[0].amount
        balancePending = balance.pending[0].amount
        totalBalance = balanceAvailable + balancePending
      }

      return res.json({ totalBalance, balancePending, balanceAvailable })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  })
})

router.post('/one_time_checkout', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { amount, token, transactionFee, stripeAccountId } = req.body
      if (!(amount && token && stripeAccountId && transactionFee)) {
        throw Error('invalid params')
      }

      const customerAmount = amount - amount * (transactionFee / 100)
      const charge = await stripe.charges.create({
        amount: amount,
        currency: 'usd',
        description: 'Invoice Pay',
        source: token
      })
      await stripe.transfers.create({
        amount: customerAmount,
        currency: 'usd',
        destination: stripeAccountId
      })
      return res.json(charge)
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
