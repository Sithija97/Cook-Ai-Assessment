import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChefHat, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChatBubble } from '../components/chat/ChatBubble'
import { ChatInput } from '../components/chat/ChatInput'
import { TypingIndicator } from '../components/chat/TypingIndicator'
import { useChatStore } from '../store/chatStore'
import { streamChatResponse } from '../services/gemini'
import { SUGGESTED_PROMPTS } from '../utils/constants'
import { logger } from '../utils/logger'

export default function CookingAssistantPage() {
  const [searchParams] = useSearchParams()
  const recipeParam = searchParams.get('recipe')

  const { messages, isTyping, addMessage, updateLastMessage, finalizeLastMessage, setTyping, clearChat } = useChatStore()
  const [lastUserMsg, setLastUserMsg] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = useCallback(async (text: string) => {
    const userMsg = { id: crypto.randomUUID(), role: 'user' as const, content: text, timestamp: Date.now() }
    addMessage(userMsg)
    setLastUserMsg(text)
    setTyping(true)

    addMessage({ id: crypto.randomUUID(), role: 'assistant', content: '', timestamp: Date.now(), isStreaming: true })

    let streamed = ''
    try {
      await streamChatResponse(
        messages,
        text,
        (chunk) => {
          streamed += chunk
          updateLastMessage(streamed)
        },
      )
      finalizeLastMessage(streamed)
    } catch (err) {
      logger.error('Chat stream error:', err)
      const message   = err instanceof Error ? err.message : ''
      const errorContent = message.includes('API key')
        ? 'Invalid API key — check your VITE_GEMINI_API_KEY in .env.'
        : message.includes('RATE_LIMIT') || message.includes('429')
        ? 'Rate limit reached. Please wait a moment and try again.'
        : `ChefAI encountered an error: ${message || 'Please try again.'}`
      finalizeLastMessage(errorContent, { isError: true })
    } finally {
      setTyping(false)
    }
  }, [messages, addMessage, updateLastMessage, finalizeLastMessage, setTyping])

  const handleClear = useCallback(() => {
    if (window.confirm('Clear all chat history?')) clearChat()
  }, [clearChat])

  const handleRetry = useCallback(() => {
    if (lastUserMsg) void sendMessage(lastUserMsg)
  }, [lastUserMsg, sendMessage])

  const prompts = recipeParam
    ? [...SUGGESTED_PROMPTS, `Tell me more about ${recipeParam}`]
    : SUGGESTED_PROMPTS

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 max-w-3xl mx-auto w-full">
          <div className="w-10 h-10 rounded-full bg-coral-50 flex items-center justify-center">
            <ChefHat size={20} className="text-coral-500" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-lg text-slate-800">ChefAI</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Online · Your personal culinary expert
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              aria-label="Clear chat history"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto py-6"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-coral-50 flex items-center justify-center mb-5">
                <ChefHat size={40} className="text-coral-500" />
              </div>
              <h2 className="font-display text-2xl text-slate-800 mb-2">Hi! I'm ChefAI 👨‍🍳</h2>
              <p className="text-slate-500 text-sm mb-8 max-w-sm">
                Ask me anything about cooking — ingredients, techniques, substitutions, or meal ideas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                {prompts.map((prompt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => void sendMessage(prompt)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 text-left hover:border-blue-300 hover:bg-blue-50 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map(msg => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  onRetry={msg.isError ? handleRetry : undefined}
                />
              ))}
            </AnimatePresence>
          )}

          {isTyping && !messages.some(m => m.isStreaming) && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex-shrink-0">
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}
