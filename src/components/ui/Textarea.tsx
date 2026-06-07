import { memo, forwardRef } from 'react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:     string
  error?:     string
  className?: string
}

export const Textarea = memo(forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { label, error, className = '', id, ...rest },
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
      <textarea
        id={inputId}
        ref={ref}
        className={[
          'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900',
          'placeholder:text-slate-400 transition-all resize-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-red-400' : '',
          className,
        ].join(' ')}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}))
