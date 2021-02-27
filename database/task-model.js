const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: String
});

module.exports = mongoose.model("Task", taskSchema);
