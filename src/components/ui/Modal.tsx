import { useEffect, useRef, memo } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

interface Props {
  open:      boolean
  onClose:   () => void
  title?:    string
  size?:     'sm' | 'md' | 'lg'
  children:  React.ReactNode
}

export const Modal = memo(function Modal({ open, onClose, title, size = 'md', children }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    contentRef.current?.focus()
    return () => prev?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const backdropVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.15 } },
  }
  const contentVariants: Variants = {
    hidden:  { opacity: 0, scale: 0.95, y: 8 },
    visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.2 } },
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={[
              'relative bg-white rounded-2xl shadow-2xl w-full z-10',
              sizeClasses[size],
            ].join(' ')}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {title && (
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
                <h2 className="font-display text-lg text-slate-800">{title}</h2>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 z-10 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X size={18} />
              </button>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
