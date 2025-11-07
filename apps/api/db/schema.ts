import { ObjectId } from 'mongodb';

export interface Task {
  _id?: ObjectId;
  id: number;
  title: string;
  description: string;
  completed_at: Date | null;
  created_at: Date;
}

export const COLLECTIONS = {
  TASKS: 'tasks',
  COUNTERS: 'counters',
} as const;

export interface Counter {
  _id: string;
  sequence_value: number;
}
