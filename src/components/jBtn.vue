<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="[
      'flex items-center gap-2 px-4 py-2 text-sm',
      'border select-none',
      'transition-all duration-200 ease-out',
      'active:scale-95',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100',
      rounded ? 'rounded-full' : 'rounded-lg',
      variantClasses,
      textAlignClasses,
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
  textAlign?: 'left' | 'center' | 'right'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconPosition: 'left',
  variant: 'primary',
  rounded: false,
  textAlign: 'center',
  disabled: false,
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
    bg-white text-black border-black
    hover:bg-black hover:text-white
    dark:bg-black dark:text-white dark:border-white
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

const textAlignClasses = computed(() => {
  switch (props.textAlign) {
    case 'left':
      return 'justify-start'
    case 'right':
      return 'justify-end'
    case 'center':
    default:
      return 'justify-center'
  }
})
</script>
