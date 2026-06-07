import { create } from 'zustand'
import type { ToastNotification, ToastType } from '../types'

interface ToastState {
  toasts: ToastNotification[]
  add:    (toast: { type: ToastType; message: string }) => void
  remove: (id: number) => void
}

let _id = 0

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  add:    (toast) => set((s) => ({ toasts: [...s.toasts, { id: ++_id, ...toast }] })),
  remove: (id)    => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
