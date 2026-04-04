import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from '@/middlewares/auth'

import HomeView from '@/views/HomeView.vue'
import ComponentsView from '@/views/ComponentsView.vue'

// Auth
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import LogoutView from '@/views/auth/LogoutView.vue'
import SettingsView from '@/views/SettingsView.vue'

// Juegos
import CatalogoView from '@/views/CatalogoView.vue'
import MiListaView from '@/views/MiListaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentsView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
    { path: '/catalogo', name: 'catalogo', component: CatalogoView },
    { path: '/mi-lista', name: 'mi-lista', component: MiListaView },
    { path: '/settings', name: 'settings', component: SettingsView },
  ],
})

router.beforeEach(authMiddleware)

export default router
