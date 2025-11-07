<template>
  <form @submit.prevent="handleSignUp" class="space-y-5">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
        Full Name
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="John Doe"
          :disabled="loading"
          class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>

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
          minlength="6"
          :disabled="loading"
          class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>
      <p class="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
    </div>

    <div>
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
        Confirm Password
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
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
        <svg class="h-5 w-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm text-red-800">{{ error }}</p>
      </div>
    </div>

    <div v-if="validationError" class="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
      <div class="flex items-center">
        <svg class="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <p class="text-sm text-yellow-800">{{ validationError }}</p>
      </div>
    </div>
    
    <button
      type="submit"
      :disabled="loading || !isFormValid"
      class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
        <svg class="h-5 w-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      {{ loading ? 'Creating account...' : 'Create account' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { signUp, loading, error, clearError } = useAuth();

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const validationError = computed(() => {
  if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
    return 'Passwords do not match';
  }
  if (form.password && form.password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
});

const isFormValid = computed(() => {
  return form.name && 
         form.email && 
         form.password && 
         form.confirmPassword && 
         !validationError.value;
});

const handleSignUp = async () => {
  clearError();
  
  if (validationError.value) {
    return;
  }
  
  try {
    await signUp(form.email, form.password, form.name);
    router.push('/dashboard');
  } catch (err) {
    console.error('Sign up failed:', err);
  }
};
</script>

<script lang="ts">
export default {
  name: 'RegisterForm'
};
</script>