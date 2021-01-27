import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

const app = express()

export const corsHandler = cors({ origin: true })

app.use(corsHandler)

// Routes
const stripeRoute = require('./routes/stripe')
app.use('/api/v1/stripe', stripeRoute)

export const httpsRequests = functions.https.onRequest(app)
