import { defineStore } from 'pinia'
import type { User } from '@/api/users'

export const UserStore = defineStore('user', {
  state: (): { user: User | null } => ({ user: null }),
  actions: {
    setUser(user: User): void {
      this.user = user
    },

    clearUser(): void {
      this.user = null
    },
  },
})
