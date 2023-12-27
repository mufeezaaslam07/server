const express = require("express");
const passport = require("passport");
const taskController = require("../controllers/taskController");
const Task = require("../models/Task");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("User ID:", req.user._id);

      const tasks = await Task.find({ user: req.user._id });

      console.log("User Tasks:", tasks);

      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  taskController.createTask
);
router.put(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),
  taskController.updateTask
);
router.delete(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),
  taskController.deleteTask
);

module.exports = router;
