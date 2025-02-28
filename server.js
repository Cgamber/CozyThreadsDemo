const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Qv6HFQnWn5BcULJNzb5tmgQoIIdHGD0glzTXRpxjW0L1wyP873jX1YIElzkEUZxogGgaMJabaeF8sHVAdJZ0Bcp00YUSw7ZP3"); // Your secret Stripe key

const app = express();
app.use(express.json()); // To parse JSON body in POST requests

// Enable CORS for AWS Amplify, localhost, and null origins (for file:// or testing purposes)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from AWS Amplify, localhost, and null origins
    if (origin === "https://main.d1n6dnca3oybgz.amplifyapp.com" || origin === "http://localhost:3000" || origin === null) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject requests from other domains
    }
  },
  methods: ['GET', 'POST'], // Allow GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Route to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Expecting the amount from the frontend

  console.log("Received amount:", amount); // Log the amount for debugging

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // Amount in cents (e.g., 5000 for $50)
      currency: "usd",  // Currency type
    });

    console.log("Payment Intent created:", paymentIntent); // Log the payment intent
    res.json({ clientSecret: paymentIntent.client_secret });  // Send back the client secret
  } catch (error) {
    console.error("Error creating payment intent:", error);  // Log the error
    res.status(500).send({ error: error.message });  // Send error if something goes wrong
  }
});

// Start the server on port 5000 (or your preferred port)
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
