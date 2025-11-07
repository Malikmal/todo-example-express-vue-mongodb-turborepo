<template>
  <div 
    v-if="show"
    :class="[
      'rounded-md p-4 mb-4',
      {
        'bg-red-50 border border-red-200 text-red-800': type === 'error',
        'bg-green-50 border border-green-200 text-green-800': type === 'success',
        'bg-blue-50 border border-blue-200 text-blue-800': type === 'info',
        'bg-yellow-50 border border-yellow-200 text-yellow-800': type === 'warning'
      }
    ]"
  >
    <div class="flex">
      <div class="flex-1">
        {{ message }}
      </div>
      <button
        v-if="dismissible"
        @click="$emit('dismiss')"
        class="ml-3 text-gray-400 hover:text-gray-600"
      >
        <span class="sr-only">Dismiss</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
  type?: 'error' | 'success' | 'info' | 'warning'
  show?: boolean
  dismissible?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'info',
  show: true,
  dismissible: true
})

defineEmits<{
  dismiss: []
}>()
</script>