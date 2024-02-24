const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Use validator library to validate email
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    }, // Ensures email uniqueness
  },
  password: {
    type: String,
    required: true,
    
  },
  token: {
    type: String,
    default : ""
    // You can add any other validations or default values for the token field if needed
  },
});

userSchema.pre("save", async function (next) {
    try {
        // Check password length
        if (this.isModified('password')) {
          if (this.password.length < 8) {
            throw new Error('Password must be at least 8 characters long!');
          }
        }
  
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Replace the plain password with the hashed password
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
