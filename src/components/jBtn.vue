<template>
  <button
    @click="$emit('click')"
    :class="[
      'flex items-center gap-2 px-4 py-2 text-sm',
      'border select-none',
      'transition-all duration-200 ease-out',
      'active:scale-95',
      rounded ? 'rounded-full' : 'rounded-lg',
      variantClasses,
    ]"
  >
    <!-- Icon left -->
    <span v-if="icon && iconPosition === 'left'" class="material-icons text-base">
      {{ icon }}
    </span>

    <!-- Label -->
    <span v-if="label">
      {{ label }}
    </span>

    <!-- Icon right -->
    <span v-if="icon && iconPosition === 'right'" class="material-icons text-base">
      {{ icon }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  label?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  variant?: 'primary' | 'secondary' | 'tertiary'
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconPosition: 'left',
  variant: 'primary',
  rounded: false,
})

defineEmits(['click'])

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return `
        bg-black text-white border-black
        hover:bg-white hover:text-black
        dark:bg-white dark:text-black dark:border-white
        dark:hover:bg-black dark:hover:text-white
      `

    case 'secondary':
      return `
        bg-transparent text-black border-black
        hover:bg-black hover:text-white
        dark:text-white dark:border-white
        dark:hover:bg-white dark:hover:text-black
      `

    case 'tertiary':
      return `
        bg-transparent border-transparent text-black
        hover:underline
        dark:text-white
      `

    default:
      return ''
  }
})
</script>
