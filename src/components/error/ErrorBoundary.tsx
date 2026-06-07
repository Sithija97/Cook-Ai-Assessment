import React from 'react'
import { ErrorState } from '../ui/ErrorState'
import { logger } from '../../utils/logger'

interface Props {
  children:  React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error:    Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    logger.error('ErrorBoundary caught:', error, info)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-[40vh] flex items-center justify-center">
          <ErrorState
            message="Something went wrong rendering this page. Please refresh."
            onRetry={() => this.setState({ hasError: false, error: null })}
          />
        </div>
      )
    }
    return this.props.children
  }
}
