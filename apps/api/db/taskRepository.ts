import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from './connection';
import type { Task, Counter } from './schema';
import { COLLECTIONS } from './schema';

export class TaskRepository {
  private tasksCollection: Collection<Task>;
  private countersCollection: Collection<Counter>;

  constructor() {
    const db = getDatabase();
    this.tasksCollection = db.collection<Task>(COLLECTIONS.TASKS);
    this.countersCollection = db.collection<Counter>(COLLECTIONS.COUNTERS);
  }

  private async getNextSequence(): Promise<number> {
    const result = await this.countersCollection.findOneAndUpdate(
      { _id: 'taskId' },
      { $inc: { sequence_value: 1 } },
      { 
        upsert: true, 
        returnDocument: 'after'
      }
    );
    
    return result?.sequence_value || 1;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksCollection
      .find({})
      .sort({ completed_at: 1, created_at: -1 })
      .toArray();
    
    return tasks;
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.tasksCollection.findOne({ id });
    return task;
  }

  async createTask(taskData: { title: string; description: string }): Promise<Task> {
    const id = await this.getNextSequence();
    
    const newTask: Task = {
      id,
      title: taskData.title,
      description: taskData.description,
      completed_at: null,
      created_at: new Date(),
    };

    await this.tasksCollection.insertOne(newTask);
    
    return newTask;
  }

  async updateTask(
    id: number, 
    updates: { title?: string; description?: string; completed_at?: Date | null }
  ): Promise<Task | null> {
    const result = await this.tasksCollection.findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );

    return result;
  }

  async deleteTask(id: number): Promise<Task | null> {
    const result = await this.tasksCollection.findOneAndDelete({ id });
    return result;
  }

  async getTaskStats(): Promise<{ total: number; completed: number; pending: number }> {
    const total = await this.tasksCollection.countDocuments();
    const completed = await this.tasksCollection.countDocuments({ 
      completed_at: { $ne: null } 
    });
    
    return {
      total,
      completed,
      pending: total - completed,
    };
  }
}
