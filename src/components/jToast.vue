<template>
  <Teleport to="body">
    <div
      v-for="pos in POSITIONS"
      :key="pos"
      class="fixed z-50 flex gap-3 p-4 pointer-events-none w-full sm:w-auto"
      :class="getPositionClasses(pos)"
    >
      <TransitionGroup
        :name="pos.includes('top') ? 'toast-top' : 'toast-bottom'"
        tag="ul"
        class="flex w-full sm:w-auto gap-3"
        :class="pos.includes('top') ? 'flex-col' : 'flex-col-reverse'"
      >
        <li
          v-for="toast in groupedToasts[pos]"
          :key="toast.id"
          class="flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border border-black/5 dark:border-white/10 pointer-events-auto transition-colors duration-200"
          :class="[toastClassMap[toast.status], toast.text ? 'opacity-100' : 'opacity-0']"
        >
          <span class="material-icons text-xl opacity-90 shrink-0">
            {{ iconMap[toast.status] }}
          </span>

          <span class="text-sm font-medium leading-tight pr-2">
            {{ toast.text }}
          </span>
        </li>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useToasterStore, { type TToastStatus, type ToastPosition } from '@/stores/toast'

const toastStore = useToasterStore()

const POSITIONS: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

const groupedToasts = computed(() => {
  const groups = {} as Record<ToastPosition, typeof toastStore.toasts>

  POSITIONS.forEach((pos) => (groups[pos] = []))

  toastStore.toasts.forEach((toast) => {
    groups[toast.position].push(toast)
  })

  return groups
})

const getPositionClasses = (pos: ToastPosition) => {
  switch (pos) {
    case 'top-left':
      return 'top-0 left-0 items-start'
    case 'top-center':
      return 'top-0 left-1/2 -translate-x-1/2 items-center'
    case 'top-right':
      return 'top-0 right-0 items-end'
    case 'bottom-left':
      return 'bottom-0 left-0 items-start'
    case 'bottom-center':
      return 'bottom-0 left-1/2 -translate-x-1/2 items-center'
    case 'bottom-right':
      return 'bottom-0 right-0 items-end'
  }
}

const toastClassMap: Record<TToastStatus, string> = {
  success: 'bg-green-600 text-white dark:bg-green-500 dark:text-black',
  error: 'bg-red-600 text-white dark:bg-red-500 dark:text-black',
  warning: 'bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black',
  info: 'bg-black text-white dark:bg-white dark:text-black',
}

const iconMap: Record<TToastStatus, string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
}
</script>

<style scoped>
.toast-top-enter-from,
.toast-top-leave-to {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

.toast-bottom-enter-from,
.toast-bottom-leave-to {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}

.toast-top-enter-active,
.toast-bottom-enter-active,
.toast-top-leave-active,
.toast-bottom-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-top-move,
.toast-bottom-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
