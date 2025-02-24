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
