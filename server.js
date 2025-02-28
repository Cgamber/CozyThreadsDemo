const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_your_secret_key_here"); // Replace with your Stripe secret key

const app = express();
app.use(express.json()); // To parse JSON body in POST requests

// Enable CORS for your frontend hosted on AWS Amplify
app.use(cors({
  origin: 'https://main.d1n6dnca3oybgz.amplifyapp.com',  // Your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route to handle Stripe Checkout session creation
app.post("/stripe-checkout", async (req, res) => {
  const { items } = req.body;

  try {
    // Map the items to Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd', // Currency type
        product_data: {
          name: item.name,  // Product name
        },
        unit_amount: item.price * 100, // Amount in cents (Stripe expects the amount in cents)
      },
      quantity: item.quantity,
    }));

    // Create a Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://main.d1n6dnca3oybgz.amplifyapp.com/success',  // Success redirect URL
      cancel_url: 'https://main.d1n6dnca3oybgz.amplifyapp.com/cancel',  // Cancel redirect URL
    });

    // Send the session URL back to the frontend
    res.json({ sessionUrl: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server on your desired port (e.g., port 5000)
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
