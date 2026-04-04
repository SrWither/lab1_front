<template>
  <div class="relative">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="label"
      class="w-full px-3 py-2 rounded-xl outline-none text-sm bg-black text-white dark:bg-white dark:text-black transition-all duration-200 ease-out placeholder:opacity-50"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    type?: 'text' | 'email' | 'password'
  }>(),
  {
    type: 'text',
  },
)

defineEmits(['update:modelValue'])
</script>

<style scoped>
input:not(:placeholder-shown)::placeholder {
  opacity: 0;
  transition: opacity 0.2s ease;
}
</style>
