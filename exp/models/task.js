const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  content: String,
  priority: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);