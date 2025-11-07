<template>
  <div class="task-item" :class="{ 'completed': task.completed }">
    <div class="task-content">
      <div class="task-header">
        <h3 class="task-title">{{ task.title }}</h3>
        <div class="task-actions">
          <button 
            @click="$emit('toggle', task.id)" 
            class="toggle-btn"
            :class="{ 'completed': task.completed }"
          >
            {{ task.completed ? '✓' : '○' }}
          </button>
          <button @click="$emit('edit', task)" class="edit-btn">
            ✏️
          </button>
          <button @click="$emit('delete', task.id)" class="delete-btn">
            🗑️
          </button>
        </div>
      </div>
      
      <p v-if="task.description" class="task-description">
        {{ task.description }}
      </p>
      
      <div class="task-meta">
        <small class="task-date">
          Created: {{ formatDate(task.createdAt) }}
        </small>
        <small v-if="task.updatedAt !== task.createdAt" class="task-date">
          Updated: {{ formatDate(task.updatedAt) }}
        </small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../composables/useTasks';

defineProps<{
  task: Task;
}>();

defineEmits<{
  toggle: [id: string];
  edit: [task: Task];
  delete: [id: string];
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<script lang="ts">
export default {
  name: 'TaskItem'
};
</script>

<style scoped>
.task-item {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-item.completed {
  opacity: 0.7;
  background-color: #f8f9fa;
}

.task-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.task-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  flex: 1;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #6c757d;
}

.task-actions {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
}

.task-actions button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.toggle-btn {
  color: #6c757d;
  font-weight: bold;
}

.toggle-btn.completed {
  color: #28a745;
}

.edit-btn:hover {
  background-color: #e7f3ff;
}

.delete-btn:hover {
  background-color: #ffe6e6;
}

.task-description {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.task-item.completed .task-description {
  text-decoration: line-through;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.task-date {
  color: #999;
  font-size: 0.75rem;
}
</style>