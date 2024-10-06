const express = require('express');
const mongoose = require('mongoose');
const CustomerSchema = require('./models/customer'); // Your Customer model
const SellerSchema = require('./models/seller'); // Your Seller model
const path = require('path'); 
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to shopdatabase
const shopConnection = mongoose.createConnection('mongodb://localhost/shopDatabase');

shopConnection.on('connected', () => {
  console.log('Connected to shopdatabase!');
});

shopConnection.on('error', (err) => {
  console.error('Shop database connection error:', err);
});

// Connect to customerdb
const customerConnection = mongoose.createConnection('mongodb://localhost/customerDB');

customerConnection.on('connected', () => {
  console.log('Connected to customerdb!');
});

customerConnection.on('error', (err) => {
  console.error('Customer database connection error:', err);
});

// Create models using the schemas
const CustomerModel = customerConnection.model('Customer', CustomerSchema);
const SellerModel = shopConnection.model('Seller', SellerSchema);
app.use(express.static('public'));
// Route for serving the sign-up form
app.get('/seller-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'seller-login.html'));  // Update to the actual file path
});

app.get('/customer-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'customer-login.html'));  // Update to the actual file path
});
app.get('/LogoInterface', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'LogoInterface.html')); // Adjust the file path as needed
});

// POST Login Route
app.post('/LogoInterface', async (req, res) => {
  console.log("POST request received at /Logointerface");  // This log helps
  const { username, password, role } = req.body;
  console.log(`Login request for role: ${role}, username: ${username}`);

  try {
    let user;

    // Test MongoDB queries directly
    if (role === 'seller') {
      console.log("Querying sellers...");
      user = await SellerModel.findOne({ username });
    } else if (role === 'customer') {
      console.log("Querying customers...");
      user = await CustomerModel.findOne({ username });
    }

    console.log("User found:", user);

    if (!user) {
      console.log("No user found with that username.");
      return res.status(400).send('Invalid username.');
    }

    if (user.password !== password) {
      console.log("Passwords do not match.");
      return res.status(400).send('Invalid password.');
    }

    console.log("Login successful!");
    
    return res.redirect('/LogoInterface');
  } catch (err) {
    console.log("Error during MongoDB query:", err);
    return res.status(500).send("Database error. Please try again.");
  }
});


// Start the server
const PORT = process.env.PORT || 5073;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
