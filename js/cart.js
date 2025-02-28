const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
  const cartItems = localStorage.getItem("cartItems");

  if (!cartItems) {
    alert("Your cart is empty!");
    return;
  }

  fetch("https://your-backend-url.com/stripe-checkout", { // Replace with your actual backend URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: JSON.parse(cartItems),
    })
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
