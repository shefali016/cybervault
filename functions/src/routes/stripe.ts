import * as express from 'express'

const { corsHandler } = require('../index')

const router = express.Router()
const bodyParser = require('body-parser')

const Stripe = require('stripe')
const stripe = Stripe('sk_test_CSO5sCU4TsvQSFlOpspnShi5003S4QpoBN') // @todo implement test and live keys using ENV vars

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

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

module.exports = router
