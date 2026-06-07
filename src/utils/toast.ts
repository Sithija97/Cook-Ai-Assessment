import { useToastStore } from '../store/toastStore'
import type { ToastType } from '../types'

export const toast: Record<ToastType, (message: string) => void> = {
  error:   (message) => useToastStore.getState().add({ type: 'error',   message }),
  success: (message) => useToastStore.getState().add({ type: 'success', message }),
  info:    (message) => useToastStore.getState().add({ type: 'info',    message }),
}
