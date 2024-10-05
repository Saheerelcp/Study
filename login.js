const express = require('express');
const mongoose = require('mongoose');
const CustomerSchema = require('./models/customer'); // Your Customer model
const SellerSchema = require('./models/seller'); // Your Seller model

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to shopdatabase
const shopConnection = mongoose.createConnection('mongodb://localhost/shopdatabase');

shopConnection.on('connected', () => {
  console.log('Connected to shopdatabase!');
});

shopConnection.on('error', (err) => {
  console.error('Shop database connection error:', err);
});

// Connect to customerdb
const customerConnection = mongoose.createConnection('mongodb://localhost/customerdb');

customerConnection.on('connected', () => {
  console.log('Connected to customerdb!');
});

customerConnection.on('error', (err) => {
  console.error('Customer database connection error:', err);
});

// Create models using the schemas
const CustomerModel = customerConnection.model('Customer', CustomerSchema);
const SellerModel = shopConnection.model('Seller', SellerSchema);
// Route for serving the sign-up form
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'seller-login.html')); // Adjust path if needed
});
// POST Login Route
app.post('/login', async (req, res) => {

  const { username, password, role } = req.body;
    console.log(username);
  try {
    console.log(`Received login request for ${role}: ${username}`);

    // Check if the role is 'seller' or 'customer'
    let user;
    if (role === 'seller') {
      console.log("is working")
      user = await SellerModel.findOne({ username: username });
    } else {
      user = await CustomerModel.findOne({ username: username });
    }

    if (!user) {

      console.log('Username is invalid.');
      return res.status(400).send('Username is invalid. Please sign up.');
    }

    // Check if the passwords match
    if (user.password !== password) {
      console.log('Invalid password.');
      return res.status(400).send('Invalid password. Please try again.');
    }

    console.log('Login successful!');

    // Redirect to respective dashboard
    if (role === 'seller') {
      console.log("is any response");
      return res.redirect('/good');
      
    } else {
      console.log("anything");
      return res.redirect('/good');
    }

  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).send('Server error.');
  }
});

// Start the server
const PORT = process.env.PORT || 5040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
