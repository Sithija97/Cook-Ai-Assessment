import { memo } from 'react'

interface Props {
  className?: string
}

export const Skeleton = memo(function Skeleton({ className = '' }: Props) {
  return (
    <div className={['bg-slate-200 animate-pulse rounded', className].join(' ')} aria-hidden="true" />
  )
})
