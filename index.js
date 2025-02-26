require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Correct way to use environment variable
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Route for creating Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cartItems } = req.body; // cartItems should be passed from the frontend

        // Map cartItems to Stripe line_items
        const lineItems = cartItems.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image], // assuming item has an image URL
                    },
                    unit_amount: parseInt(item.price * 100), // Convert price to cents
                },
                quantity: item.item,
            };
        });

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/success`, // Define success URL
            cancel_url: `${process.env.DOMAIN}/cancel`,   // Define cancel URL
            billing_address_collection: 'required',
        });

        // Respond with the session ID so frontend can redirect to Stripe
        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
