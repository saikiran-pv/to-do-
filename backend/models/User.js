const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcryptjs

// Create the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash password before saving the user to the database
userSchema.pre('save', async function(next) {
  // Hash the password if it is modified or new
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
  }
  next();
});

// Method to check if the entered password matches the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare entered password with hashed password
};

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = User;

