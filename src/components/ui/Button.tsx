import { memo } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

type ButtonVariant = 'primary' | 'secondary' | 'coral' | 'coral-outline' | 'ghost'
type ButtonSize    = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary:        'bg-blue-500 text-white hover:bg-blue-600 border border-transparent',
  secondary:      'bg-white text-blue-700 border border-blue-500 hover:bg-blue-50',
  coral:          'bg-coral-500 text-white hover:bg-coral-600 border border-transparent',
  'coral-outline': 'bg-white text-coral-600 border border-coral-500 hover:bg-coral-50',
  ghost:          'bg-transparent text-slate-600 border border-transparent hover:bg-slate-100',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-base gap-2',
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  loading?:   boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  children:   React.ReactNode
}

export const Button = memo(function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded-lg transition-all',
        'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <LoadingSpinner size={size === 'sm' ? 14 : 16} className={variant === 'primary' || variant === 'coral' ? 'text-white' : 'text-current'} />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
})
