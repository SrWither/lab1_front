<template>
  <nav
    class="w-full px-6 py-3 flex items-center justify-between bg-black text-white dark:bg-white dark:text-black transition-all duration-200 ease-out"
  >
    <!-- Title -->
    <div class="text-lg font-medium tracking-tight">
      {{ title }}
    </div>

    <!-- Links -->
    <div class="flex items-center gap-2">
      <RouterLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
      >
        <span class="material-icons text-base">
          {{ item.icon }}
        </span>
        <span>
          {{ item.label }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

type NavItem = {
  path: string
  label: string
  icon: string
}

type Props = {
  title: string
  items: NavItem[]
}

defineProps<Props>()
</script>
