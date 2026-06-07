import { memo, forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string
  error?:     string
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
}

export const Input = memo(forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, leftIcon, rightIcon, className = '', id, ...rest },
  ref,
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          className={[
            'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900',
            'placeholder:text-slate-400 transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:border-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error     ? 'border-red-400 focus-visible:ring-red-400' : '',
            leftIcon  ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            className,
          ].join(' ')}
          {...rest}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}))
