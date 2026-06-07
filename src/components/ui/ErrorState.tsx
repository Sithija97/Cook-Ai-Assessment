import { memo } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './Button'

interface Props {
  message?:    string
  onRetry?:    () => void
  retryLabel?: string
}

export const ErrorState = memo(function ErrorState({
  message    = 'ChefAI is taking a break — please try again.',
  onRetry,
  retryLabel = 'Try Again',
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="bg-coral-50 w-20 h-20 rounded-full flex items-center justify-center mb-5">
        <AlertCircle className="text-coral-500" size={36} />
      </div>
      <h3 className="font-display text-xl text-slate-800 mb-2">Something went wrong</h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="coral" onClick={onRetry} leftIcon={<RefreshCw size={14} />}>
          {retryLabel}
        </Button>
      )}
    </div>
  )
})
