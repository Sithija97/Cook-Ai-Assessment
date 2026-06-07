import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS, CHAT_MAX_MESSAGES } from '../utils/constants'
import type { ChatMessage } from '../types'

interface ChatState {
  messages:            ChatMessage[]
  isTyping:            boolean
  addMessage:          (msg: ChatMessage) => void
  updateLastMessage:   (content: string) => void
  finalizeLastMessage: (content: string, extra?: Partial<ChatMessage>) => void
  setTyping:           (bool: boolean) => void
  clearChat:           () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isTyping: false,

      addMessage: (msg) =>
        set((state) => {
          const messages = [...state.messages, msg]
          return {
            messages: messages.length > CHAT_MAX_MESSAGES
              ? messages.slice(messages.length - CHAT_MAX_MESSAGES)
              : messages,
          }
        }),

      updateLastMessage: (content) =>
        set((state) => {
          const messages = [...state.messages]
          if (messages.length === 0) return state
          messages[messages.length - 1] = {
            ...messages[messages.length - 1],
            content,
            isStreaming: true,
          }
          return { messages }
        }),

      finalizeLastMessage: (content, extra = {}) =>
        set((state) => {
          const messages = [...state.messages]
          if (messages.length === 0) return state
          messages[messages.length - 1] = {
            ...messages[messages.length - 1],
            content,
            isStreaming: false,
            ...extra,
          }
          return { messages }
        }),

      setTyping: (bool) => set({ isTyping: bool }),

      clearChat: () => set({ messages: [], isTyping: false }),
    }),
    { name: STORAGE_KEYS.CHAT },
  ),
)
