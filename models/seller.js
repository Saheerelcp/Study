const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
});

// Export the schema instead of the model
module.exports = SellerSchema;
