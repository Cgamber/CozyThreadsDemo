let cartCount = 0; // Initial count of cart items
let cart = []; // Array to store cart items

const cartNumber = document.querySelector('.cart-number'); // Cart count element in the navbar

// Function to update the cart count in the navbar
function updateCartCount() {
    cartNumber.textContent = cartCount;
}

// Handle the Add to Cart button for any product
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        // Get product details from the parent element
        const productElement = this.closest('.product'); // Find the closest product container
        const productName = productElement.querySelector('.product-title').textContent; // Get the product name
        const productPrice = parseFloat(productElement.querySelector('.product-price').getAttribute('data-price')); // Get the product price

        // Create product object with name and price
        const product = {
            name: productName,
            price: productPrice
        };

        // Add the product to the cart array
        cart.push(product);
        cartCount += 1; // Increment cart count

        // Update the cart count in the navbar
        updateCartCount();

        // Show an alert (optional) that the product has been added to the cart
        alert(`${productName} has been added to your cart!`);
    });
});

// Handle the Buy Now button for any product
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function() {
        if (cartCount > 0) {
            // Proceed to checkout (you can replace this alert with actual checkout logic)
            alert('Proceeding to checkout...');
            cart = []; // Empty the cart after the purchase
            cartCount = 0; // Reset the cart count
            updateCartCount(); // Update the cart count in the navbar to 0
        } else {
            // Alert if the cart is empty
            alert('Please add an item to your cart before proceeding!');
        }
    });
    
});