import type { RouteLocationNormalized } from 'vue-router'
import { getItemFromLocalStorage } from '@/utils/localStorage'

const authMiddleware = async (to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
  const token = getItemFromLocalStorage<string>('auth')

  const isPublicRoute = ['/login', '/register', '/components', '/credits'].includes(to.path)

  if (!token && !isPublicRoute) {
    return '/login'
  }

  if (token && (to.path === '/login' || to.path === '/register')) {
    return '/'
  }

  return true
}

export default authMiddleware
