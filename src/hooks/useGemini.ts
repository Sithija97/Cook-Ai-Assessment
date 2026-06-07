import { useState, useCallback, useRef } from 'react'
import { logger } from '../utils/logger'
import { AUTO_RETRY_DELAY_MS } from '../utils/constants'
import { toast } from '../utils/toast'
import { GeminiApiError } from '../services/gemini'

export function useGemini<T>(fn: (...args: unknown[]) => Promise<T>) {
  const [data, setData]       = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const lastArgsRef    = useRef<unknown[] | null>(null)
  const hasAutoRetried = useRef(false)

  const execute = useCallback(async (...args: unknown[]): Promise<T | null> => {
    setLoading(true)
    setError(null)
    lastArgsRef.current    = args
    hasAutoRetried.current = false

    try {
      const result = await fn(...args)
      setData(result)
      setLoading(false)
      return result
    } catch (err) {
      logger.error('useGemini execute error:', err)

      if (err instanceof GeminiApiError && err.retryable && !hasAutoRetried.current) {
        hasAutoRetried.current = true
        logger.log('Auto-retrying after error...')
        await new Promise(r => setTimeout(r, AUTO_RETRY_DELAY_MS))
        try {
          const result = await fn(...args)
          setData(result)
          setLoading(false)
          return result
        } catch (retryErr) {
          logger.error('useGemini retry error:', retryErr)
          const msg = retryErr instanceof Error ? retryErr.message : 'Something went wrong in the kitchen.'
          setError(msg)
          toast.error(msg)
          setLoading(false)
          return null
        }
      }

      const msg = err instanceof Error ? err.message : 'Something went wrong in the kitchen.'
      setError(msg)
      toast.error(msg)
      setLoading(false)
      return null
    }
  }, [fn])

  const retry = useCallback((): Promise<T | null> => {
    if (!lastArgsRef.current) return Promise.resolve(null)
    return execute(...lastArgsRef.current)
  }, [execute])

  return { data, loading, error, execute, retry }
}
