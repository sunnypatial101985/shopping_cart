import express from 'express'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { v4 as uuidv4 } from 'uuid';
const striperoutes = express.Router()

striperoutes.post('/pay', async(req, res) => {
    // const { token, amount, email } = req.body
    const { amount } = req.body
    const idempotencyKey = uuidv4()
        // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: process.env.CURRENCY,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });

})

export default striperoutes