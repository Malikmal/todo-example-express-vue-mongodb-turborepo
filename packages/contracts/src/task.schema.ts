import { z } from "zod";

// Task Schema
export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  completed_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
});

// Create Task Request Schema
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .trim()
    .optional()
    .default(""),
});

// Update Task Request Schema
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title must not be empty")
    .max(200, "Title must be less than 200 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .trim()
    .optional(),
  completed_at: z.string().datetime().nullable().optional(),
});

// Get Tasks Response Schema
export const getTasksResponseSchema = z.object({
  tasks: z.array(taskSchema),
  total: z.number().int().nonnegative(),
  completed: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
});

// Get Single Task Response Schema
export const getTaskResponseSchema = z.object({
  task: taskSchema,
});

// Create Task Response Schema
export const createTaskResponseSchema = z.object({
  task: taskSchema,
  message: z.string(),
});

// Update Task Response Schema
export const updateTaskResponseSchema = z.object({
  task: taskSchema,
  message: z.string(),
});

// Delete Task Response Schema
export const deleteTaskResponseSchema = z.object({
  message: z.string(),
  task: taskSchema,
});

// Error Response Schema
export const errorResponseSchema = z.object({
  message: z.string(),
  error: z.string().optional(),
});

// TypeScript Types exported from Zod schemas
export type Task = z.infer<typeof taskSchema>;
export type CreateTaskRequest = z.infer<typeof createTaskSchema>;
export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;
export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>;
export type GetTaskResponse = z.infer<typeof getTaskResponseSchema>;
export type CreateTaskResponse = z.infer<typeof createTaskResponseSchema>;
export type UpdateTaskResponse = z.infer<typeof updateTaskResponseSchema>;
export type DeleteTaskResponse = z.infer<typeof deleteTaskResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
