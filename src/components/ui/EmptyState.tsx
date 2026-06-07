import { memo } from 'react'
import { Button } from './Button'

interface Props {
  icon:          React.ReactNode
  iconColor?:    'blue' | 'coral'
  title:         string
  description?:  string
  actionLabel?:  string
  onAction?:     () => void
}

export const EmptyState = memo(function EmptyState({
  icon,
  iconColor = 'blue',
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  const circleBg    = iconColor === 'coral' ? 'bg-coral-50'   : 'bg-blue-50'
  const iconColorCls = iconColor === 'coral' ? 'text-coral-500' : 'text-blue-500'

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className={`${circleBg} ${iconColorCls} w-20 h-20 rounded-full flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="font-display text-2xl text-slate-800 mb-2">{title}</h3>
      {description && (
        <p className="text-slate-500 text-sm max-w-sm mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
})
