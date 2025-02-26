const products = document.querySelector('.products');
let productIndex = 0; // Start from the first product
const totalProducts = document.querySelectorAll('.product-box').length;

function moveCarousel() {
    const productWidth = document.querySelector('.product-box').offsetWidth;

    // Move the carousel to the next product
    productIndex++;

    // If we reach the last product, reset to the first
    if (productIndex === totalProducts) {
        productIndex = 0;
    }

    // Apply the translation to move the carousel
    products.style.transition = 'transform 0.5s ease';  // Add transition for smooth sliding
    products.style.transform = `translateX(-${productIndex * productWidth}px)`;
}

// Set interval to move the carousel every 3 seconds
setInterval(moveCarousel, 3000);

// Add product to cart
const add_product_to_cart = product => {
    // Retrieve the cart from localStorage, or initialize it as an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart === null) {
        cart = []; // If no cart exists, initialize an empty array
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex >= 0) {
        // If the product exists, increase its quantity
        cart[existingProductIndex].item += 1;
    } else {
        // If the product doesn't exist, add it to the cart
        const newProduct = {
            item: 1,
            name: product.name,
            price: product.price,
            shortDes: product.shortDes,
            image: product.image
        };
        cart.push(newProduct);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    return 'added';  // Return a confirmation message
};
