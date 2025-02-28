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
app.post("/stripe-checkout", async (req, res) => {
  const { amount } = req.body;  // Get amount from the request body

  try {
    // Create a payment intent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // Amount in cents (e.g., 5000 for $50)
      currency: "usd",  // Currency type (USD in this case)
    });

    // Send back the client secret to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // If there's an error, return a 500 status with the error message
    res.status(500).send({ error: error.message });
  }
});

// Start the server on your desired port (e.g., port 5000)
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
