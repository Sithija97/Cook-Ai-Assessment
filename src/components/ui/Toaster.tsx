import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useToastStore } from '../../store/toastStore'
import type { ToastType, ToastNotification } from '../../types'

const DURATION = 6000

interface TypeConfig {
  Icon:      LucideIcon
  iconCls:   string
  barCls:    string
  borderCls: string
}

const TYPE_CONFIG: Record<ToastType, TypeConfig> = {
  error:   { Icon: AlertCircle,  iconCls: 'text-coral-500',   barCls: 'bg-coral-500',   borderCls: 'border-l-coral-500'   },
  success: { Icon: CheckCircle2, iconCls: 'text-emerald-500', barCls: 'bg-emerald-500', borderCls: 'border-l-emerald-500' },
  info:    { Icon: Info,         iconCls: 'text-blue-500',    barCls: 'bg-blue-500',    borderCls: 'border-l-blue-500'    },
}

function Toast({ id, type, message }: ToastNotification) {
  const remove = useToastStore((s) => s.remove)
  const cfg    = TYPE_CONFIG[type] ?? TYPE_CONFIG.info
  const { Icon } = cfg

  useEffect(() => {
    const timer = setTimeout(() => remove(id), DURATION)
    return () => clearTimeout(timer)
  }, [id, remove])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 64, scale: 0.95 }}
      animate={{ opacity: 1, x: 0,  scale: 1    }}
      exit={{    opacity: 0, x: 64, scale: 0.95, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
      className={`relative bg-white border border-slate-200 border-l-4 ${cfg.borderCls} rounded-xl shadow-lg w-80 overflow-hidden`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3 px-4 py-3.5 pr-10">
        <Icon size={16} className={`${cfg.iconCls} flex-shrink-0 mt-0.5`} />
        <p className="text-sm text-slate-700 leading-snug">{message}</p>
      </div>

      <button
        onClick={() => remove(id)}
        aria-label="Dismiss notification"
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors rounded focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <X size={13} />
      </button>

      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 ${cfg.barCls} origin-left`}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: DURATION / 1000, ease: 'linear' }}
      />
    </motion.div>
  )
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts)

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
