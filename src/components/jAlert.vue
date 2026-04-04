<template>
  <div
    :class="[
      'flex items-center gap-2 px-4 py-2 rounded-xl text-sm',
      'transition-all duration-200 ease-out',
      variantClasses,
    ]"
  >
    <span class="material-icons text-base">
      {{ icon }}
    </span>

    <span class="opacity-90">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant: 'info' | 'success' | 'error'
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return `
        bg-black text-white
        dark:bg-white dark:text-black
      `
    case 'error':
      return `
        bg-black text-white
        dark:bg-white dark:text-black
      `
    default:
      return `
        bg-black text-white
        dark:bg-white dark:text-black
      `
  }
})

const icon = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'check_circle'
    case 'error':
      return 'error'
    default:
      return 'info'
  }
})
</script>
