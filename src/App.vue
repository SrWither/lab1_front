<script setup lang="ts">
import jNavbar from '@/components/jNavbar.vue'
import jToast from './components/jToast.vue'
import jFooter from '@/components/jFooter.vue'

const items = [
  { label: 'GitHub', href: 'https://github.com', icon: 'code' },
  { label: 'Docs', href: '#', icon: 'description' },
  { label: 'Contacto', href: '#', icon: 'mail' },
]

const navbarItems = [
  { path: '/', label: 'Inicio', icon: 'home' },
  { path: '/components', label: 'Componentes', icon: 'widgets' },
  { path: '/about', label: 'Info', icon: 'info' },
]
</script>

<template>
  <div class="min-h-screen flex flex-col transition-all">
    <jToast />
    <header>
      <jNavbar title="Mi App" :items="navbarItems" />
    </header>

    <main class="flex-1 bg-white dark:bg-black">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer>
      <jFooter title="Mi App" :items="items" />
    </footer>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
