const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: false
  },

  phone:{
    type: Number,
    validate: [validator.isMobilePhone, "Please Enter a valid  Phone"],
    
  },
 

  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  adress :{
  type:String,

  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});



module.exports = userSchema
