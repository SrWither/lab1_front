import { defineStore } from 'pinia'
import type { Usuario } from '@/api/types'

export const UserStore = defineStore('user', {
  state: (): { user: Usuario | null } => ({ user: null }),
  actions: {
    setUser(user: Usuario): void {
      this.user = user
    },

    clearUser(): void {
      this.user = null
    },
  },
})
