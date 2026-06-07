import { useState, useCallback, useRef } from 'react'
import { extractCompleteObjects, parseGeminiJSON } from '../utils/recipeParser'
import { logger } from '../utils/logger'
import { toast } from '../utils/toast'

type ParseStrategy = 'array-items' | 'object-keys' | 'full'

interface UseStreamingJSONOptions<T, Args extends unknown[]> {
  streamFn:      (...args: Args) => AsyncGenerator<string>
  parseStrategy?: ParseStrategy
  onItem?:       (item: T) => void
  onComplete?:   (data: unknown) => void
  onError?:      (err: unknown) => void
}

interface UseStreamingJSONResult<T, Args extends unknown[]> {
  streamedItems: T[]
  isStreaming:   boolean
  progress:      number
  error:         string | null
  start:         (...args: Args) => Promise<void>
  cancel:        () => void
}

export function useStreamingJSON<T, Args extends unknown[] = unknown[]>({
  streamFn,
  parseStrategy = 'full',
  onItem,
  onComplete,
  onError,
}: UseStreamingJSONOptions<T, Args>): UseStreamingJSONResult<T, Args> {
  const [streamedItems, setStreamedItems] = useState<T[]>([])
  const [isStreaming, setIsStreaming]     = useState(false)
  const [progress, setProgress]          = useState(0)
  const [error, setError]                = useState<string | null>(null)
  const cancelRef      = useRef(false)
  const bufferRef      = useRef('')
  const seenCountRef   = useRef(0)

  const start = useCallback(async (...args: Args): Promise<void> => {
    cancelRef.current    = false
    bufferRef.current    = ''
    seenCountRef.current = 0
    setStreamedItems([])
    setIsStreaming(true)
    setError(null)
    setProgress(0)

    try {
      const generator = streamFn(...args)

      for await (const chunk of generator) {
        if (cancelRef.current) break
        bufferRef.current += chunk

        if (parseStrategy === 'array-items' || parseStrategy === 'object-keys') {
          const { items } = extractCompleteObjects(bufferRef.current)
          const newItems = items.slice(seenCountRef.current) as T[]
          if (newItems.length > 0) {
            seenCountRef.current = items.length
            setStreamedItems(prev => {
              const next = [...prev, ...newItems]
              if (parseStrategy === 'array-items') {
                setProgress(Math.min(next.length / 6, 1))
              }
              return next
            })
            newItems.forEach(item => onItem?.(item))
          }
        }
      }

      if (!cancelRef.current) {
        try {
          const full = parseGeminiJSON(bufferRef.current)
          setProgress(1)
          onComplete?.(full)
          if (parseStrategy === 'full') {
            const items = Array.isArray(full) ? (full as T[]) : [full as T]
            setStreamedItems(items)
          }
        } catch (parseErr) {
          logger.error('Streaming JSON parse error:', parseErr)
          const msg = 'AI returned an unexpected format. Please try again.'
          setError(msg)
          toast.error(msg)
          onError?.(parseErr)
        }
      }
    } catch (err) {
      if (!cancelRef.current) {
        logger.error('Streaming error:', err)
        const msg = err instanceof Error ? err.message : 'Streaming failed. Please try again.'
        setError(msg)
        toast.error(msg)
        onError?.(err)
      }
    } finally {
      setIsStreaming(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamFn, parseStrategy, onItem, onComplete, onError])

  const cancel = useCallback(() => {
    cancelRef.current = true
    setIsStreaming(false)
  }, [])

  return { streamedItems, isStreaming, progress, error, start, cancel }
}
