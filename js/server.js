const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (like images, CSS, JavaScript) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle the /cart route and send the cart.html file
app.get('/cart', (req, res) => {
    res.sendFile('cart.html', { root: path.join(__dirname, 'public') });
});

// Handle the /404 route and send the 404.html file
app.get('/404', (req, res) => {
    res.sendFile('404.html', { root: path.join(__dirname, 'public') });
});

// Catch-all for undefined routes: redirects to /404
app.use((req, res) => {
    res.redirect('/404');
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
