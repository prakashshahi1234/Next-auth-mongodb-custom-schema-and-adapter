const mongoose = require('mongoose');
// Define the Session schema
const sessionSchema = new mongoose.Schema({
 
  expires: {
    type: Date,
    required: true
  },
  sessionToken: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
}, { timestamps: true });


module.exports = sessionSchema