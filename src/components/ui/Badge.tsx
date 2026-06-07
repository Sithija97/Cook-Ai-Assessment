import { memo } from 'react'

type BadgeVariant = 'blue' | 'coral' | 'green' | 'amber' | 'red' | 'gray'

const variantClasses: Record<BadgeVariant, string> = {
  blue:  'bg-blue-50 text-blue-700 border border-blue-100',
  coral: 'bg-coral-50 text-coral-700 border border-coral-100',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border border-amber-100',
  red:   'bg-red-50 text-red-700 border border-red-100',
  gray:  'bg-slate-100 text-slate-600 border border-slate-200',
}

interface Props {
  variant?:   BadgeVariant
  className?: string
  children:   React.ReactNode
}

export const Badge = memo(function Badge({ variant = 'blue', className = '', children }: Props) {
  return (
    <span className={[
      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
      variantClasses[variant],
      className,
    ].join(' ')}>
      {children}
    </span>
  )
})
