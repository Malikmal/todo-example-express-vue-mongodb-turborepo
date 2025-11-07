<template>
  <div class="task-form-overlay" @click.self="$emit('cancel')">
    <div class="task-form-modal">
      <div class="task-form-header">
        <h2>{{ isEdit ? 'Edit Task' : 'Create New Task' }}</h2>
        <button @click="$emit('cancel')" class="close-btn">✕</button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="task-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            placeholder="Enter task title"
            :disabled="loading"
            maxlength="200"
          />
        </div>
        
        <div class="form-group">
          <label for="description">Description (Optional)</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Enter task description"
            :disabled="loading"
            rows="4"
            maxlength="500"
          ></textarea>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="cancel-btn" :disabled="loading">
            Cancel
          </button>
          <button type="submit" :disabled="loading || !form.title.trim()" class="submit-btn">
            {{ loading ? 'Saving...' : (isEdit ? 'Update Task' : 'Create Task') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Task } from '../composables/useTasks';

const props = defineProps<{
  task?: Task;
  loading?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  submit: [data: { title: string; description?: string }];
  cancel: [];
}>();

const isEdit = !!props.task;

const form = reactive({
  title: '',
  description: '',
});

// Initialize form with task data if editing
watch(() => props.task, (task) => {
  if (task) {
    form.title = task.title;
    form.description = task.description || '';
  } else {
    form.title = '';
    form.description = '';
  }
}, { immediate: true });

const handleSubmit = () => {
  if (!form.title.trim()) return;
  
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim() || undefined,
  });
};
</script>

<script lang="ts">
export default {
  name: 'TaskForm'
};
</script>

<style scoped>
.task-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.task-form-modal {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.task-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.task-form-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

.task-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input:disabled,
.form-group textarea:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.cancel-btn,
.submit-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #5a6268;
}

.submit-btn {
  background-color: #007bff;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.cancel-btn:disabled,
.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>