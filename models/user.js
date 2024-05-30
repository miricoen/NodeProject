// const mongoose = require('mongoose');
import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  links: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url'
  }]
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model("user", userModel);
