import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ChefHat } from 'lucide-react'

const dotVariants: Variants = {
  hidden: { y: 0 },
  bounce: { y: -6, transition: { type: 'spring', stiffness: 300, damping: 10, repeat: Infinity, repeatType: 'reverse' } },
}

export const TypingIndicator = memo(function TypingIndicator() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-7 h-7 rounded-full bg-coral-50 flex items-center justify-center flex-shrink-0">
        <ChefHat size={14} className="text-coral-500" />
      </div>
      <div className="flex items-center gap-1.5 bg-white border border-blue-100 border-l-[3px] border-l-blue-500 rounded-[18px_18px_18px_4px] px-4 py-3">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400 block"
            variants={shouldReduceMotion ? {} : dotVariants}
            initial="hidden"
            animate="bounce"
            transition={{ delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
})
