<template>
  <footer
    class="w-full px-6 py-4 bg-black text-white dark:bg-white dark:text-black transition-all duration-200 ease-out"
  >
    <div class="flex flex-col md:flex-row items-center justify-between gap-3">
      <!-- Left -->
      <div class="text-sm opacity-70">© {{ year }} {{ title }}</div>

      <!-- Right -->
      <div class="flex items-center gap-4">
        <a
          v-for="item in items"
          :key="item.label"
          :href="item.href"
          target="_blank"
          class="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-all duration-200"
        >
          <span v-if="item.icon" class="material-icons text-base">
            {{ item.icon }}
          </span>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type FooterItem = {
  label: string
  href: string
  icon?: string
}

type Props = {
  title: string
  items?: FooterItem[]
}

withDefaults(defineProps<Props>(), {
  items: () => [],
})

const year = computed(() => new Date().getFullYear())
</script>
