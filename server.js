// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


// Create Express app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML files)
app.use(express.static(path.join(__dirname, 'public'))); // Assuming your HTML is in a 'public' folder

// Connect to MongoDB (use your own database name in the URI)
mongoose.connect('mongodb://localhost:27017/shopDatabase')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB: ', err);
    });


// Define Mongoose schema for seller
const sellerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shopAddress: { type: String, required: true }
});

// Create Mongoose model for seller
const Seller = mongoose.model('Seller', sellerSchema);

// Route for serving the sign-up form
app.get('/signup-seller', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup-seller.html')); // Adjust path if needed
});

// Handle POST request to save seller data
// Handle POST request to save seller data
// Handle POST request to save seller data
app.post('/signup-seller', (req, res) => {
    const newSeller = new Seller({
        username: req.body.username,
        password: req.body.password,
        shopAddress: req.body.shopAddress
    });

    // Save seller data to the database
    newSeller.save()
    .then(() => {
        // On successful registration, redirect to the seller login page
        res.redirect('/seller-login.html');
    })
    .catch((err) => {
        // Log the entire error object for debugging
        console.error('Error saving seller data:', err);

        // Check for duplicate key error
        if (err.code === 11000) {
            res.redirect('/signup-seller.html?error=username_taken');
        } else {
            res.redirect('/signup-seller.html');
        }
    });


});

// Start the server (this should be outside of any routes)
const port = 3005
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


