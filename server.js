const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_your_secret_key_here"); // Replace with your secret Stripe key

const app = express();
app.use(express.json()); // To parse JSON body in POST requests

// Enable CORS for your frontend hosted on AWS Amplify
app.use(cors({
  origin: 'https://main.d1n6dnca3oybgz.amplifyapp.com',  // Frontend URL hosted on AWS Amplify
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // Amount in cents (e.g., 5000 for $50)
      currency: "usd",  // Currency type
    });

    res.json({ clientSecret: paymentIntent.client_secret });  // Send back client secret
  } catch (error) {
    res.status(500).send({ error: error.message });  // Send error if something goes wrong
  }
});

// Start the server on port 5000 (or your preferred port)
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
