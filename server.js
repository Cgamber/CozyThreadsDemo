const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Qv6HFQnWn5BcULJNzb5tmgQoIIdHGD0glzTXRpxjW0L1wyP873jX1YIElzkEUZxogGgaMJabaeF8sHVAdJZ0Bcp00YUSw7ZP3"); // Your secret Stripe key
const app = express();
app.use(express.json()); // To parse JSON body in POST requests

// Enable CORS for both AWS Amplify and localhost (for local development)
const allowedOrigins = ['https://main.d1n6dnca3oybgz.amplifyapp.com', 'http://localhost:5000', null]; // Add your local development URL

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Expecting the amount from the frontend

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // Amount in cents (e.g., 5000 for $50)
      currency: "usd",  // Currency type
    });

    res.json({ clientSecret: paymentIntent.client_secret });  // Send back the client secret
  } catch (error) {
    res.status(500).send({ error: error.message });  // Send error if something goes wrong
  }
});

// Start the server on port 5000 (or your preferred port)
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});