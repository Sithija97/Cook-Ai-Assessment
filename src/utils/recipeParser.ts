import { logger } from './logger'

export function stripMarkdownFences(raw: string): string {
  return raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()
}

export function parseGeminiJSON(raw: string): unknown {
  const cleaned = stripMarkdownFences(raw)
  try {
    return JSON.parse(cleaned)
  } catch (err) {
    logger.error('JSON parse failed:', err instanceof Error ? err.message : err, '\nRaw:', cleaned.slice(0, 300))
    throw new Error('AI returned an unexpected format. Please try again.')
  }
}

export function assertArray(value: unknown, label = 'response'): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array from AI ${label}, got ${typeof value}`)
  }
  return value
}

export function extractCompleteObjects(buffer: string): { items: unknown[]; remainder: string } {
  const items: unknown[] = []
  let remainder = buffer
  let depth = 0
  let start = -1

  for (let i = 0; i < remainder.length; i++) {
    const ch = remainder[i]
    if (ch === '{') {
      if (depth === 0) start = i
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && start !== -1) {
        const fragment = remainder.slice(start, i + 1)
        try {
          const obj = JSON.parse(fragment)
          items.push(obj)
        } catch {
          // incomplete or malformed — skip
        }
        start = -1
        remainder = remainder.slice(i + 1)
        i = -1
      }
    }
  }

  return { items, remainder }
}
