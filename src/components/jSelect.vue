<template>
  <div class="relative flex flex-col gap-1">
    <button
      @click="open = !open"
      class="flex justify-between items-center px-3 py-2 rounded-xl text-sm bg-black text-white dark:bg-white dark:text-black transition-all duration-200 ease-out"
    >
      <span
        :class="['transition-opacity duration-200', selectedLabel ? 'opacity-90' : 'opacity-50']"
      >
        {{ selectedLabel || label || 'Seleccionar...' }}
      </span>

      <span
        class="material-icons text-base opacity-70 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
      >
        expand_more
      </span>
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="open"
        class="absolute top-full mt-1 w-full rounded-xl overflow-hidden z-10 bg-black text-white dark:bg-white dark:text-black shadow-lg origin-top"
      >
        <div
          v-for="opt in options"
          :key="opt.value"
          @click="select(opt.value)"
          class="px-3 py-2 text-sm cursor-pointer transition-all duration-150 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
        >
          {{ opt.label }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T extends PropertyKey">
import { computed, ref } from 'vue'

type Option<T> = {
  label: string
  value: T
}

const props = defineProps<{
  modelValue: T | null
  options: Option<T>[]
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()

const open = ref(false)

const select = (value: T) => {
  emit('update:modelValue', value)
  open.value = false
}

const selectedLabel = computed(() => props.options.find((o) => o.value === props.modelValue)?.label)
</script>
