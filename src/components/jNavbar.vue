<template>
  <nav
    class="w-full px-6 py-3 flex flex-col md:flex-row items-center md:justify-between bg-black text-white dark:bg-white dark:text-black transition-all duration-200 ease-out"
  >
    <div class="text-lg font-medium tracking-tight text-center md:text-left">
      {{ title }}
    </div>

    <div
      class="flex flex-wrap justify-center gap-2 mt-2 md:mt-0 md:justify-end w-full md:w-auto items-center"
    >
      <RouterLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
      >
        <span class="material-icons text-base">
          {{ item.icon }}
        </span>
        <span>{{ item.label }}</span>
      </RouterLink>

      <button
        @click="toggleTheme"
        class="flex ml-2 p-2 rounded-full bg-gray-200 dark:bg-black text-black dark:text-white transition-all duration-500 ease-out hover:scale-110"
      >
        <span
          class="material-icons transition-transform duration-500 ease-out"
          :class="theme === 'dark' ? 'rotate-180' : ''"
        >
          {{ theme === 'dark' ? 'dark_mode' : 'light_mode' }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

type NavItem = { path: string; label: string; icon: string }
type Props = { title: string; items: NavItem[] }
defineProps<Props>()

const theme = ref<'light' | 'dark'>('light')

onMounted(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (saved) theme.value = saved
  applyTheme()
})

const applyTheme = () => {
  if (theme.value === 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
  localStorage.setItem('theme', theme.value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme()
}

watch(theme, () => {
  applyTheme()
})
</script>
