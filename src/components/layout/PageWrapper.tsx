import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children:   React.ReactNode
  className?: string
}

export const PageWrapper = memo(function PageWrapper({ children, className = '' }: Props) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.main
      id="main-content"
      className={['max-w-7xl mx-auto px-4 sm:px-6 py-8', className].join(' ')}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
})
