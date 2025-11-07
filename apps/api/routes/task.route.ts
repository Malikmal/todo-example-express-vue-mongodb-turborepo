import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { optionalAuth, requireAuth } from "../middlewares/auth.middleware";

const router = Router();

const taskController = new TaskController();

// Task routes with authentication
router.get("/api/tasks", optionalAuth, taskController.getTasks);
router.post("/api/tasks", requireAuth, taskController.createTask);
router.put("/api/tasks/:id", requireAuth, taskController.updateTask);
router.delete("/api/tasks/:id", requireAuth, taskController.deleteTask);

export default router;
