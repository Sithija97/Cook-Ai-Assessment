import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ChefHat, AlertCircle, RefreshCw } from 'lucide-react'
import type { ChatMessage } from '../../types'

const dotVariants: Variants = {
  hidden:  { opacity: 0.3 },
  visible: { opacity: 1, transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.5 } },
}

function StreamingDots({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <span className="inline-flex items-center gap-[3px] ml-1 align-middle">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-blue-400 block"
          variants={reducedMotion ? {} : dotVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

interface Props {
  message:  ChatMessage
  onRetry?: () => void
}

export const ChatBubble = memo(function ChatBubble({ message, onRetry }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const isUser  = message.role === 'user'
  const isError = message.isError

  const variants: Variants = {
    hidden:  { opacity: 0, x: isUser ? 20 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      className={`flex items-end gap-2 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}
      variants={shouldReduceMotion ? {} : variants}
      initial="hidden"
      animate="visible"
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-coral-50 flex items-center justify-center flex-shrink-0">
          <ChefHat size={14} className="text-coral-500" />
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {isError ? (
          <div className="bg-coral-50 border border-coral-100 rounded-[18px] px-4 py-3 text-sm text-coral-700 flex items-center gap-2">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{message.content}</span>
            {onRetry && (
              <button
                onClick={onRetry}
                aria-label="Retry message"
                className="ml-1 text-coral-600 hover:text-coral-700 focus-visible:ring-1 focus-visible:ring-coral-500 rounded"
              >
                <RefreshCw size={13} />
              </button>
            )}
          </div>
        ) : isUser ? (
          <div
            className="bg-blue-500 text-white text-sm leading-relaxed px-4 py-3 whitespace-pre-wrap"
            style={{ borderRadius: '18px 18px 4px 18px' }}
          >
            {message.content}
          </div>
        ) : (
          <div
            className="bg-white border border-blue-100 border-l-[3px] border-l-blue-500 text-slate-700 text-sm leading-relaxed px-4 py-3 whitespace-pre-wrap"
            style={{ borderRadius: '18px 18px 18px 4px' }}
          >
            {message.content}
            {message.isStreaming && <StreamingDots reducedMotion={shouldReduceMotion} />}
          </div>
        )}

        <span className="text-[11px] text-slate-400 px-1">{formatTime(message.timestamp)}</span>
      </div>
    </motion.div>
  )
})
