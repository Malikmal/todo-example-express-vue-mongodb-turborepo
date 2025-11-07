import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class TaskController {
  async getTasks(request: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({ data: tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch tasks",
      });
    }
  }

  async createTask(request: Request, res: Response) {
    try {
      const { title, description } = request.body;
      const userId = request.user?.id;

      if (!title) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Title is required",
        });
      }

      const task = await prisma.task.create({
        data: {
          title,
          description,
          userId,
        },
      });

      return res.status(201).json({ data: task });
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to create task",
      });
    }
  }

  async updateTask(request: Request, res: Response) {
    try {
      const { id } = request.params;
      const { title, description, completed } = request.body;

      const task = await prisma.task.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(completed !== undefined && { completed }),
        },
      });

      return res.status(200).json({ data: task });
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to update task",
      });
    }
  }

  async deleteTask(request: Request, res: Response) {
    try {
      const { id } = request.params;

      await prisma.task.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to delete task",
      });
    }
  }
}
