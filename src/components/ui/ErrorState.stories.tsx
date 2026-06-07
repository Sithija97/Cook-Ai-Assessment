import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorState } from './ErrorState'

const meta: Meta<typeof ErrorState> = {
  title: 'UI/ErrorState',
  component: ErrorState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'ChefAI is taking a break — please try again.',
    onRetry: () => alert('Retrying...'),
  },
}

export const ApiError: Story = {
  args: {
    message: 'Failed to connect to Gemini API. Check your API key in settings.',
    onRetry: () => {},
    retryLabel: 'Retry Connection',
  },
}

export const NoRetry: Story = {
  args: {
    message: 'An unexpected error occurred. Please refresh the page.',
  },
}
