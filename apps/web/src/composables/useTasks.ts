import { computed } from 'vue'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

export type Task = {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
  userId?: string
}

const API_BASE_URL = 'http://localhost:3000'

// Configure axios to include credentials
axios.defaults.withCredentials = true

export function useTasks() {
  const queryClient = useQueryClient()

  const fetchTasks = async (): Promise<Task[]> => {
    const res = await axios.get(`${API_BASE_URL}/api/tasks`)
    return res.data.data || []
  }

  const tasksQuery = useQuery<Task[], Error>({ queryKey: ['tasks'] as const, queryFn: fetchTasks })

  const createMutation = useMutation<Task, Error, { title: string; description?: string }>({
    mutationFn: async (payload: { title: string; description?: string }) => {
      const res = await axios.post(`${API_BASE_URL}/api/tasks`, payload)
      return res.data.data as Task
    },
    onSuccess(newTask: Task) {
      // Optimistically update tasks list
      queryClient.setQueryData(['tasks'], (old: Task[] | undefined) => [newTask, ...(old ?? [])])
    },
  })

  const updateMutation = useMutation<Task, Error, { id: string; updates: Partial<Task> }>({
    mutationFn: async (payload: { id: string; updates: Partial<Task> }) => {
      const res = await axios.put(`${API_BASE_URL}/api/tasks/${payload.id}`, payload.updates)
      return res.data.data as Task
    },
    onSuccess(updatedTask: Task) {
      queryClient.setQueryData(['tasks'], (old: Task[] | undefined) => (old ?? []).map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    },
  })

  const deleteMutation = useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_BASE_URL}/api/tasks/${id}`)
      return id
    },
    onSuccess(deletedId: string) {
      queryClient.setQueryData(['tasks'], (old: Task[] | undefined) => (old ?? []).filter((t) => t.id !== deletedId))
    },
  })

  return {
    tasksQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    refetch: tasksQuery.refetch,
    isLoading: computed(() => tasksQuery.isLoading),
    isError: computed(() => tasksQuery.isError),
    data: computed(() => tasksQuery.data ?? []),
  }
}