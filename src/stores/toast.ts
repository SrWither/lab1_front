import { defineStore } from 'pinia'

export type TToastStatus = 'info' | 'success' | 'warning' | 'error'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

interface IToast {
  text: string
  status: TToastStatus
  id: number
  position: ToastPosition
}

type ToastPayload = { timeout?: number; text: string; position?: ToastPosition }

const defaultTimeout = 2000
const delayBetweenToasts = 300
const defaultPosition: ToastPosition = 'bottom-right'

const createToast = (text: string, status: TToastStatus, position: ToastPosition): IToast => ({
  text,
  status,
  id: Math.random() * 1000,
  position,
})

export default defineStore('toaster-store', {
  state: (): { toasts: IToast[] } => ({
    toasts: [],
  }),

  actions: {
    async updateState(payload: ToastPayload, status: TToastStatus) {
      const { text, timeout, position = defaultPosition } = payload

      const toast = createToast(text, status, position)

      this.toasts.unshift(toast)

      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== toast.id)
      }, timeout ?? defaultTimeout)

      await new Promise((resolve) => setTimeout(resolve, delayBetweenToasts))
    },

    async info(payload: ToastPayload) {
      await this.updateState(payload, 'info')
    },

    async success(payload: ToastPayload) {
      await this.updateState(payload, 'success')
    },

    async warning(payload: ToastPayload) {
      await this.updateState(payload, 'warning')
    },

    async error(payload: ToastPayload) {
      await this.updateState(payload, 'error')
    },
  },
})
