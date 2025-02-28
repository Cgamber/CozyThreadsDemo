import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // Ensure this import is correct

const stripePromise = loadStripe("pk_test_51Qv6HFQnWn5BcULJfLVxCZO5juXohwj7dZrGpYUjozg2bDGq0rZKPMs6MafMyEfehvUHQA3fpuVliZQm5KKrQ9yK00zxYd13SH");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Replace the URL with the actual backend URL
    fetch("https://your-backend-url.com/create-payment-intent", {  // Correct the URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 5000 }), // Amount in cents
      mode: "cors",  // Make sure CORS is enabled
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        return res.json(); // Process the response as JSON
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error fetching client secret:", err));
  }, []); // Empty dependency array to run only once on mount

  const options = clientSecret ? { clientSecret } : null;

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment...</p>
      )}
    </div>
  );
}
