<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          Create your account
        </h2>
        <p class="text-gray-600">
          Start organizing your tasks today
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/50">
        <RegisterForm />
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in instead
            </router-link>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <p class="mt-6 text-center text-xs text-gray-500">
        By signing up, you agree to our Terms and Privacy Policy
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '../components/RegisterForm.vue';
</script>

<script lang="ts">
export default {
  name: 'RegisterView'
};
</script>