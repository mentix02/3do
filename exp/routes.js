const express = require("express");
const Task = require("./models/task");

const router = express.Router();

// Get all tasks
router.get("/tasks", async (_, res) => {
	const tasks = await Task.find();
	res.json(tasks);
});

// Create a new task
router.post("/tasks", async (req, res) => {
	const task = new Task(req.body);
	await task.save();
	res.status(201).json(task);
});

// Get a task by id
router.get("/tasks/:id", async (req, res) => {
	const task = await Task.findById(req.params.id);
	if (!task) {
		return res.status(404).send("Task not found");
	}
	res.json(task);
});

// Delete a task by id
router.delete("/tasks/:id", async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id);
	if (!task) {
		return res.status(404).send("Task not found");
	}
	res.json({ message: "Task deleted" });
});

// Update a task by id
router.patch("/tasks/:id", async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	if (!task) {
		return res.status(404).send("Task not found");
	}
	res.json(task);
});

module.exports = router;