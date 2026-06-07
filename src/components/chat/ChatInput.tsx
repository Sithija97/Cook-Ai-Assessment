import { memo, useRef, useCallback, useState, useEffect } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { CHAT_MAX_CHARS } from '../../utils/constants'

interface Props {
  onSend:    (text: string) => void
  disabled?: boolean
}

export const ChatInput = memo(function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
  }, [value])

  const handleSend = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }, [value, disabled, onSend])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  const charCount = value.length
  const overLimit = charCount > CHAT_MAX_CHARS
  const canSend   = value.trim().length > 0 && !disabled && !overLimit

  return (
    <div className="border-t border-slate-100 bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className={`flex items-end gap-3 border rounded-2xl px-4 py-2.5 transition-all ${
          overLimit ? 'border-red-300' : 'border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'
        } ${disabled ? 'bg-slate-50' : 'bg-white'}`}>
          <button
            type="button"
            disabled
            aria-label="File upload — coming soon"
            title="File upload coming soon"
            className="text-slate-300 cursor-not-allowed flex-shrink-0 mb-0.5"
          >
            <Paperclip size={18} />
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={disabled}
            placeholder={disabled ? 'ChefAI is thinking...' : 'Ask ChefAI anything about cooking…'}
            aria-label="Chat message input"
            rows={1}
            className="flex-1 resize-none border-0 outline-none text-sm text-slate-800 placeholder:text-slate-400 bg-transparent py-1 max-h-28 disabled:cursor-not-allowed"
          />

          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className={`text-[10px] ${charCount > 450 ? 'text-coral-500' : 'text-slate-400'}`}>
              {charCount}/{CHAT_MAX_CHARS}
            </span>
            <button
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-blue-500 ${
                canSend
                  ? 'bg-coral-500 hover:bg-coral-600 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-1.5">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
})
