const Task = require("../models/Task");
const taskSchema = require("../schemas/taskSchema");

exports.createTask = async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details.map((err) => err.message) });

    const task = await Task.create({ ...req.body, UserId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details.map((err) => err.message) });

    const task = await Task.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
