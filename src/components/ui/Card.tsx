import { memo } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children:   React.ReactNode
}

export const Card = memo(function Card({ className = '', children, ...rest }: Props) {
  return (
    <div
      className={['bg-white rounded-xl border border-slate-200 shadow-sm', className].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
})
