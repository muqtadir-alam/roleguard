import Task from "../models/Task.js";
import { sendSuccess, sendError } from "../utils/response.js"
// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
    });

    return sendSuccess(res, task, "Task created successfully");
  } catch (error) {
    return sendError(res, error.message);
  }
};

// GET TASKS
export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "email");
    } else {
      tasks = await Task.find({ user: req.user.id });
    }

    return sendSuccess(
      res,
      tasks,
      "Tasks fetched successfully",
      { total: tasks.length }
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return sendError(res, "Task not found", 404);
    }

    // 🔐 Only owner or admin can update
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user.id
    ) {
      return sendError(res, "Not authorized", 403);
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return sendSuccess(res, task, "Task updated successfully");
  } catch (error) {
    return sendError(res, error.message);
  }
};

// DELETE TASK (ADMIN ONLY)
export const deleteTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return sendError(res, "Admin only action", 403);
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return sendError(res, "Task not found", 404);
    }

    await task.deleteOne();

    return sendSuccess(res, {}, "Task deleted successfully");
  } catch (error) {
    return sendError(res, error.message);
  }
};