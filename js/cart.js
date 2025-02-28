import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // Make sure this import is correct

const stripePromise = loadStripe("pk_test_51Qv6HFQnWn5BcULJfLVxCZO5juXohwj7dZrGpYUjozg2bDGq0rZKPMs6MafMyEfehvUHQA3fpuVliZQm5KKrQ9yK00zxYd13SH");

export default function Cart() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch client secret from your backend
    fetch("https://your-backend-url.com/stripe-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 5000 }), // Amount in cents (5000 = $50)
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error fetching client secret:", err));
  }, []);

  const options = clientSecret ? { clientSecret } : null;

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={() => handleCheckout()}>Buy Now</button>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment...</p>
      )}
    </div>
  );

  // Handle the checkout process
  function handleCheckout() {
    if (!clientSecret) {
      console.error("Client Secret not available!");
      return;
    }
    // Trigger the payment flow (this might be triggered inside CheckoutForm)
    console.log("Proceeding to checkout...");
  }
}
