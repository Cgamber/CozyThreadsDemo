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
