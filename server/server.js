import express from 'express';
import viteExpress from "vite-express";
import Stripe from 'stripe';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  //express static is the middleware to serve the static files i.e the client side 
dotenv.config({ path: 'server/.env' });
const PORT = process.env.PORT || 3000;

const stripe = Stripe(process.env.VITE_STRIPE_PRIVATE_KEY)

app.post('/create-checkout-session', async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'required',
    line_items : req.body.items?.map(item => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }
    }),
    mode: 'payment',
    success_url: `${process.env.VITE_CLIENT_URL}/success`,
    cancel_url: `${process.env.VITE_CLIENT_URL}/cancel`,
  });

  res.send(JSON.stringify({
    url: session.url
  }));
});

viteExpress.listen(app, PORT, () => console.log("server is listening..."));
