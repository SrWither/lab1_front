import type { RouteLocationNormalized } from 'vue-router'
import { getItemFromLocalStorage } from '@/utils/localStorage'

const authMiddleware = async (to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
  const token = getItemFromLocalStorage<string>('auth')

  const isPublicRoute = to.path === '/login' || to.path === '/register' || to.path === '/components'

  if (!token && !isPublicRoute) {
    return '/login'
  }

  if (token && isPublicRoute) {
    return '/'
  }

  return true
}

export default authMiddleware
