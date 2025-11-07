<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { useAuth } from './composables/useAuth'
import { onMounted } from 'vue'

const { checkSession } = useAuth()

// Check if user is already logged in on app start
onMounted(() => {
  checkSession()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TodoApp'
};
</script>
