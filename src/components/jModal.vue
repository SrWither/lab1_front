<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        @click="$emit('update:modelValue', false)"
      />
    </Transition>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div
          class="relative w-full max-w-md p-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-xl pointer-events-auto"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium">
              {{ title }}
            </h2>

            <button
              @click="$emit('update:modelValue', false)"
              class="opacity-70 hover:opacity-100 transition"
            >
              <span class="material-icons">close</span>
            </button>
          </div>

          <div class="text-sm opacity-80">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
}>()

defineEmits(['update:modelValue'])
</script>
