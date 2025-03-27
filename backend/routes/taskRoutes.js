// routes/taskRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const User = require('../models/User');

const router = express.Router();

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get User's Tasks (GET /api/tasks)
router.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add Task (POST /api/tasks)
router.post('/', authenticate, async (req, res) => {
    const { title, description, completed } = req.body;

    console.log(title);

    if (!title) {
        return res.status(400).json({ message: 'Task title is required' });
    }

    try {
        const newTask = new Task({
            title,
            description,
            completed,
            user: req.user
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Task (PUT /api/tasks/:id)
router.put('/:id', authenticate, async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/:_id", authenticate, async (req, res) => {
    try {
      const task = await Task.findById(req.params._id); // MongoDB Mongoose example
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
});

// Delete Task (DELETE /api/tasks/:id)
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findOne({ _id: taskId, user: req.user });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        await Task.findByIdAndDelete(taskId);

        res.json({ message: 'Task removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
