<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          Welcome back
        </h2>
        <p class="text-gray-600">
          Sign in to continue to your dashboard
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/50">
        <LoginForm />
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-600">
            Don't have an account?
            <router-link to="/register" class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Create one now
            </router-link>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <p class="mt-6 text-center text-xs text-gray-500">
        Protected by industry-standard encryption
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
</script>

<script lang="ts">
export default {
  name: 'LoginView'
};
</script>