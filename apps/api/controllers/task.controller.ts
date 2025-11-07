import type { Request, Response } from "express";
import { databaseConnection } from "../config/database";

export class TaskController {
  async getTasks(request: Request, res: Response) {
    const collection = databaseConnection.getDb().collection("tasks");

    const tasks = await collection.find({}).toArray();

    return res.status(200).json({ data: tasks });
  }
}
