<template>
  <div class="relative flex flex-col gap-1">
    <div
      @click="open = !open"
      class="rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer bg-black text-white dark:bg-white dark:text-black transition-all duration-200 ease-out border-2 border-white dark:border-black"
    >
      <div class="flex flex-wrap gap-2 flex-1">
        <span
          v-for="opt in selectedOptions"
          :key="opt.value"
          class="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-white/10 dark:bg-black/10 transition-all duration-200"
        >
          {{ opt.label }}

          <span
            class="material-icons text-sm cursor-pointer opacity-70 hover:opacity-100"
            @click.stop="remove(opt.value)"
          >
            close
          </span>
        </span>

        <span
          v-if="!selectedOptions.length"
          class="text-sm opacity-50 transition-opacity duration-200"
        >
          {{ label || 'Seleccionar...' }}
        </span>
      </div>

      <span
        class="material-icons text-base opacity-70 transition-transform duration-200 shrink-0"
        :class="{ 'rotate-180': open }"
      >
        expand_more
      </span>
    </div>

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
          @click="toggle(opt.value)"
          class="flex justify-between items-center px-3 py-2 text-sm cursor-pointer transition-all duration-150 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
        >
          <span>{{ opt.label }}</span>

          <span v-if="modelValue.includes(opt.value)" class="material-icons text-base">
            check
          </span>
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
  modelValue: T[]
  options: Option<T>[]
  label?: string
  trackBy?: (value: T) => unknown
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T[]): void
}>()

const open = ref(false)

const isEqual = (a: T, b: T) => {
  return props.trackBy ? props.trackBy(a) === props.trackBy(b) : a === b
}

const toggle = (value: T) => {
  const exists = props.modelValue.some((v) => isEqual(v, value))

  emit(
    'update:modelValue',
    exists ? props.modelValue.filter((v) => !isEqual(v, value)) : [...props.modelValue, value],
  )
}

const remove = (value: T) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((v) => !isEqual(v, value)),
  )
}

const selectedOptions = computed(() =>
  props.options.filter((o) => props.modelValue.some((v) => isEqual(v, o.value))),
)
</script>
