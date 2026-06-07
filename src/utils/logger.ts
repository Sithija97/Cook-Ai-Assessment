const isDev = import.meta.env.DEV

export const logger = {
  log:   (...args: unknown[]): void => { isDev && console.log('[ChefAI]', ...args) },
  error: (...args: unknown[]): void => { isDev && console.error('[ChefAI Error]', ...args) },
  warn:  (...args: unknown[]): void => { isDev && console.warn('[ChefAI Warn]', ...args) },
}
