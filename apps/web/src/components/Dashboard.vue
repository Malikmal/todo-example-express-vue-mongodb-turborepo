<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-content">
        <h1>Todo Dashboard</h1>
        <div class="user-info">
          <span v-if="user" class="welcome-text">Welcome, {{ user.name }}!</span>
          <button @click="handleSignOut" class="signout-btn">Sign Out</button>
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <div class="dashboard-content">
        <div class="tasks-header">
          <h2>Your Tasks</h2>
          <button @click="showCreateForm = true" class="create-task-btn">
            + Add New Task
          </button>
        </div>

        <div v-if="tasksLoading" class="loading-state">
          <p>Loading tasks...</p>
        </div>

        <div v-else-if="tasksError" class="error-state">
          <p>Error loading tasks: {{ tasksError }}</p>
          <button @click="loadTasks" class="retry-btn">Retry</button>
        </div>

        <div v-else-if="tasks.length === 0" class="empty-state">
          <p>No tasks yet. Create your first task!</p>
        </div>

        <div v-else class="tasks-container">
          <div class="tasks-stats">
            <div class="stat">
              <span class="stat-number">{{ tasks.length }}</span>
              <span class="stat-label">Total</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ completedTasks }}</span>
              <span class="stat-label">Completed</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ pendingTasks }}</span>
              <span class="stat-label">Pending</span>
            </div>
          </div>

          <div class="tasks-filters">
            <button 
              @click="filter = 'all'" 
              :class="{ active: filter === 'all' }"
              class="filter-btn"
            >
              All
            </button>
            <button 
              @click="filter = 'pending'" 
              :class="{ active: filter === 'pending' }"
              class="filter-btn"
            >
              Pending
            </button>
            <button 
              @click="filter = 'completed'" 
              :class="{ active: filter === 'completed' }"
              class="filter-btn"
            >
              Completed
            </button>
          </div>

          <div class="tasks-list">
            <TaskItem
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
              @toggle="handleToggleTask"
              @edit="handleEditTask"
              @delete="handleDeleteTask"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- Task Form Modal -->
    <TaskForm
      v-if="showCreateForm || editingTask"
      :task="editingTask || undefined"
      :loading="tasksLoading"
      :error="tasksError"
      @submit="handleTaskSubmit"
      @cancel="handleCancelForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useTasks, type Task } from '../composables/useTasks';
import TaskItem from '../components/TaskItem.vue';
import TaskForm from '../components/TaskForm.vue';

const router = useRouter();
const { user, signOut } = useAuth();
const { 
  tasks, 
  loading: tasksLoading, 
  error: tasksError, 
  fetchTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskCompletion 
} = useTasks();

const showCreateForm = ref(false);
const editingTask = ref<Task | null>(null);
const filter = ref<'all' | 'pending' | 'completed'>('all');

const completedTasks = computed(() => 
  tasks.value.filter(task => task.completed).length
);

const pendingTasks = computed(() => 
  tasks.value.filter(task => !task.completed).length
);

const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'pending':
      return tasks.value.filter(task => !task.completed);
    case 'completed':
      return tasks.value.filter(task => task.completed);
    default:
      return tasks.value;
  }
});

const loadTasks = async () => {
  try {
    await fetchTasks();
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
};

const handleSignOut = async () => {
  try {
    await signOut();
    router.push('/login');
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};

const handleToggleTask = async (taskId: string) => {
  try {
    await toggleTaskCompletion(taskId);
  } catch (error) {
    console.error('Failed to toggle task:', error);
  }
};

const handleEditTask = (task: Task) => {
  editingTask.value = task;
  showCreateForm.value = false;
};

const handleDeleteTask = async (taskId: string) => {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }
};

const handleTaskSubmit = async (data: { title: string; description?: string }) => {
  try {
    if (editingTask.value) {
      await updateTask(editingTask.value.id, data);
    } else {
      await createTask(data.title, data.description);
    }
    handleCancelForm();
  } catch (error) {
    console.error('Failed to save task:', error);
  }
};

const handleCancelForm = () => {
  showCreateForm.value = false;
  editingTask.value = null;
};

onMounted(() => {
  loadTasks();
});
</script>

<script lang="ts">
export default {
  name: 'DashboardView'
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.dashboard-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-text {
  color: #666;
  font-weight: 500;
}

.signout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.signout-btn:hover {
  background-color: #c82333;
}

.dashboard-main {
  padding: 2rem 0;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.tasks-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.create-task-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.create-task-btn:hover {
  background-color: #218838;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.retry-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.tasks-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.stat {
  text-align: center;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 100px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

.tasks-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: #f8f9fa;
}

.filter-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .tasks-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .tasks-stats {
    flex-direction: column;
    align-items: center;
  }

  .tasks-filters {
    flex-wrap: wrap;
  }
}
</style>