<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { AuthStore } from './stores/auth'
import { UserStore } from './stores/user'
import { useRouter } from 'vue-router'
import jNavbar from '@/components/jNavbar.vue'
import jToast from './components/jToast.vue'
import jFooter from '@/components/jFooter.vue'
import jSpinner from '@/components/jSpinner.vue'
import { setAuthToken } from './api/auth'
import { getCurrentUser } from './api/users'

const authStore = AuthStore()
const userStore = UserStore()
const router = useRouter()

const appReady = ref(false)

const items = [
  { label: 'Código', href: 'https://github.com/SrWither/lab1_front', icon: 'code' },
  { label: 'Creditos', href: '/credits', icon: 'star', route: true },
  { label: 'Componentes', href: '/components', icon: 'widgets', route: true },
]

const navbarItems = computed(() => {
  const base = [{ path: '/', label: 'Inicio', icon: 'home' }]
  if (authStore.token) {
    base.push(
      { path: '/catalogo', label: 'Catálogo', icon: 'search' },
      { path: '/mi-lista', label: 'Mi lista', icon: 'format_list_bulleted' },
      { path: '/settings', label: 'Settings', icon: 'settings' },
      { path: '/logout', label: 'Logout', icon: 'logout' },
    )
  } else {
    base.push(
      { path: '/login', label: 'Login', icon: 'login' },
      { path: '/register', label: 'Register', icon: 'person_add' },
    )
  }
  return base
})

onBeforeMount(async () => {
  try {
    if (!authStore.token) {
      router.push('/login')
      return
    }

    setAuthToken(authStore.token)
    const user = await getCurrentUser()

    if (user) {
      userStore.setUser(user)
      const publicRoutes = ['/login', '/register']
      if (publicRoutes.includes(router.currentRoute.value.path)) {
        router.push('/')
      }
    } else {
      authStore.clearToken()
      router.push('/login')
    }
  } finally {
    appReady.value = true
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col transition-all">
    <jToast />
    <header>
      <jNavbar title="Juegos" :items="navbarItems" />
    </header>

    <main class="flex-1 bg-white dark:bg-black">
      <div v-if="!appReady" class="flex justify-center items-center h-64">
        <jSpinner />
      </div>

      <RouterView v-else v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer>
      <jFooter title="Juegos" :items="items" />
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
