const Task = require("../models/Task");
const User = require("../models/User");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const userId = req.user._id;

    const newTask = new Task({
      user: userId,
      title,
      description,
      priority,
      dueDate,
    });

    const savedTask = await newTask.save();

    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, completed, priority, dueDate } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, completed, priority, dueDate },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
