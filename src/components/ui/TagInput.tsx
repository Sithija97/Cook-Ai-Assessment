import { memo, useState, useRef, useCallback } from 'react'
import { X } from 'lucide-react'

interface Props {
  tags:         string[]
  onChange:     (tags: string[]) => void
  placeholder?: string
  label?:       string
  id?:          string
}

export const TagInput = memo(function TagInput({
  tags = [],
  onChange,
  placeholder = 'Type and press Enter',
  label,
  id,
}: Props) {
  const [input, setInput]   = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId  = id || 'tag-input'

  const addTag = useCallback((value: string) => {
    const trimmed = value.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInput('')
  }, [tags, onChange])

  const removeTag = useCallback((tag: string) => {
    onChange(tags.filter(t => t !== tag))
  }, [tags, onChange])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }, [input, tags, addTag, removeTag])

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div
        className="flex flex-wrap gap-2 p-2 rounded-lg border border-slate-200 bg-white cursor-text min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2.5 py-0.5 text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag} tag`}
              className="text-blue-400 hover:text-blue-700 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-full"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          id={inputId}
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => { if (input) addTag(input) }}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-24 border-0 outline-none text-sm text-slate-900 placeholder:text-slate-400 bg-transparent"
        />
      </div>
    </div>
  )
})
