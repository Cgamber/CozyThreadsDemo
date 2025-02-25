document.addEventListener('DOMContentLoaded', function() {
    // Get the counter elements
    const incrementButton = document.querySelector('.increment');
    const decrementButton = document.querySelector('.decrement');
    const itemCount = document.querySelector('.item-count');
    
    // Set initial value for the counter
    let count = 1;  // Default item count

    // Function to update the displayed count
    function updateCount() {
        itemCount.textContent = count;
    }

    // Increment button click event
    incrementButton.addEventListener('click', function() {
        count++;
        updateCount();
    });

    // Decrement button click event
    decrementButton.addEventListener('click', function() {
        if (count > 1) {  // Prevent going below 1
            count--;
            updateCount();
        }
    });

    // Initialize display
    updateCount();
});

// Small product card creation
const createSmallCards = (data) => {
    return `
    <div class="sm-product">
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.Description}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${data.item}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${data.price}">$${data.price * data.item}</p>
        <button class="btn remove"><img src="images/close.png" alt="remove"></button>
    </div>
    `;
};
let total = 0;
// Set cart products
const setCartProducts = () => {
    const cartContainer = document.querySelector('.cart-container');
    let cart = JSON.parse(localStorage.getItem('cart'));
    
    if (cart == null ||!cart.length) {
        cartContainer.innerHTML += `<img src="images/emptycart.jpg" class="empty-img" alt="">`;
    } else {
        for (let i = 0; i < cart.length; i++) {
            cartContainer.innerHTML += createSmallCards(cart[i]);
            total += Number(cart[i].price * cart[i].item);

            updateTotal()
        }
    }
    setupCardEvents();
}
const updateTotal = () => {
    let totalPrice = document.querySelector('.total');
    totalPrice.innerHTML = `$${total}`;
}

const setupCardEvents = () => {
    const counterMinus = document.querySelectorAll('.cart-container .decrement');
    const counterPlus = document.querySelectorAll('.cart-container .increment');
    const counts = document.querySelectorAll('.cart-container .item-count');
    const price = document.querySelectorAll('.cart-container .sm-price');
const deleteBtn= document.querySelectorAll('.cart-container .remove');
    let product = JSON.parse(localStorage.getItem('cart'));
    
    counts.forEach((item, i) => {
        let cost = Number(price[i].getAttribute('data-price'));
        
        counterMinus[i].addEventListener('click', () => {
            if (item.innerHTML > 1) {
                item.innerHTML--;
                total-= cost;
                updateTotal();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
        });
        
        counterPlus[i].addEventListener('click', () => {
            if (item.innerHTML < 9) {
                item.innerHTML++;
                total+= cost;
                updateTotal();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
                
            }
        });
    });
    deleteBtn.forEach ((item,i) = > {
        item.addEventListener('click', () => {
            product=product.filter(data, index) = > index !== i);
            localStorage.setItem('cart', JSON.stringify(product));
            location.reload();
    })
};

// Initialize cart products
setCartProducts();