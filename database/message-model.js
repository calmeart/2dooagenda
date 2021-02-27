const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userMail: String,
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Message", messageSchema);
