<template>
  <form @submit.prevent="handleSignIn" class="space-y-6">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
        Email address
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
          </svg>
        </div>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="you@example.com"
          :disabled="loading"
          class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
    
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="••••••••"
          :disabled="loading"
          class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
    
    <div v-if="error" class="rounded-lg bg-red-50 border border-red-200 p-4">
      <div class="flex items-center">
        <svg class="h-5 w-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm text-red-800">{{ error }}</p>
      </div>
    </div>
    
    <button
      type="submit"
      :disabled="loading"
      class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
        <svg class="h-5 w-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      {{ loading ? 'Signing in...' : 'Sign in' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { signIn, loading, error, clearError } = useAuth();

const form = reactive({
  email: '',
  password: '',
});

const handleSignIn = async () => {
  clearError();
  
  try {
    await signIn(form.email, form.password);
    router.push('/dashboard');
  } catch (err) {
    console.error('Sign in failed:', err);
  }
};
</script>

<script lang="ts">
export default {
  name: 'LoginForm'
};
</script>