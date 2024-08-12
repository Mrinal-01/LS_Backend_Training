const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  name:{
    type:String,
    required:true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  phoneNumber:{
    type:String
  },
  coin: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  createdAt: {               // New field added
    type: Date,
    default: Date.now
  },
  updatedAt: {                  // New field added
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
