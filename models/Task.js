const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
