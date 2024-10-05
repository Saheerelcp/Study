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
mongoose.connect('mongodb://localhost:27017/customerDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB: ', err);
    });


// Define Mongoose schema for seller
const CustomerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
});

// Create Mongoose model for Customer
const Customer = mongoose.model('Customer', CustomerSchema);

// Route for serving the sign-up form
app.get('/signup-customer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup-customer.html')); // Adjust path if needed
});

// Handle POST request to save seller data
// Handle POST request to save seller data
// Handle POST request to save seller data
app.post('/signup-customer', (req, res) => {
    const newCustomer = new Customer({
        username: req.body.username,
        password: req.body.password,
        
    });

    // Save seller data to the database
    newCustomer.save()
    .then(() => {
        // On successful registration, redirect to the seller login page
        res.redirect('/customer-login.html');
    })
    .catch((err) => {
        // Log the entire error object for debugging
        console.error('Error saving seller data:', err);

        // Check for duplicate key error
        if (err.code === 11000) {
            res.redirect('/signup-customer.html?error=username_taken');
           
        } else {
            res.redirect('/signup-customer.html');
            
        }
    });


});

// Start the server (this should be outside of any routes)
const port = 3008
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
