// filepath: /c:/Users/cramo/newestCozy/CozyThreadsDemo/js/cart.js
const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
  const cartItems = localStorage.getItem("cartItems");

  if (!cartItems) {
    alert("Your cart is empty!");
    return;
  }

  fetch("http://localhost:5000/stripe-checkout", { // Replace with your actual backend URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: JSON.parse(cartItems),
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.sessionUrl) {
        location.href = data.sessionUrl; // Redirect to Stripe Checkout
        localStorage.removeItem("cartItems"); // Clear cart after redirect
      } else {
        throw new Error("Invalid response from server");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Payment processing failed. Please try again.");
    });
});

// filepath: /c:/Users/cramo/newestCozy/CozyThreadsDemo/server.js
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_your_secret_key_here"); // Replace with your Stripe secret key

const app = express();
app.use(express.json()); // To parse JSON body in POST requests

// Enable CORS for your frontend hosted on AWS Amplify and local development
const allowedOrigins = ['https://main.d1n6dnca3oybgz.amplifyapp.com', 'http://localhost:3000']; // Add your local development URL

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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