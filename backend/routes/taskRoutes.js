import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ALL routes protected
router.use(protect);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);

// only admin can delete
router.delete("/:id", authorize("admin"), deleteTask);

export default router;