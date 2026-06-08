import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect } from 'react'
import { Toaster } from './Toaster'
import { useToastStore } from '../../store/toastStore'
import type { ToastType } from '../../types'

const meta: Meta = {
  title: 'Molecules/Toast',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function ToastDemo({ toasts }: { toasts: Array<{ type: ToastType; message: string }> }) {
  useEffect(() => {
    const { add } = useToastStore.getState()
    toasts.forEach((t, i) => setTimeout(() => add(t), i * 120))
  }, [])

  return (
    <div className="h-64 relative">
      <p className="absolute top-4 left-4 text-sm text-slate-400">Toasts appear in the bottom-right corner</p>
      <Toaster />
    </div>
  )
}

export const Success: Story = {
  render: () => (
    <ToastDemo toasts={[{ type: 'success', message: 'Recipe saved to your favourites!' }]} />
  ),
}

export const Error: Story = {
  render: () => (
    <ToastDemo toasts={[{ type: 'error', message: 'Failed to connect. Please check your API key and try again.' }]} />
  ),
}

export const Info: Story = {
  render: () => (
    <ToastDemo toasts={[{ type: 'info', message: 'ChefAI is generating your weekly meal plan...' }]} />
  ),
}

export const AllTypes: Story = {
  render: () => (
    <ToastDemo toasts={[
      { type: 'success', message: 'Meal plan saved successfully!' },
      { type: 'error',   message: 'Could not connect to Gemini API.' },
      { type: 'info',    message: 'Generating 7-day meal plan...' },
    ]} />
  ),
}

export const Interactive: Story = {
  render: () => {
    const add = useToastStore(s => s.add)
    return (
      <div className="h-64 relative flex items-start justify-start p-6 gap-3">
        <button
          onClick={() => add({ type: 'success', message: 'Recipe saved successfully!' })}
          className="px-3 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600"
        >
          Show Success
        </button>
        <button
          onClick={() => add({ type: 'error', message: 'Something went wrong. Please try again.' })}
          className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
        >
          Show Error
        </button>
        <button
          onClick={() => add({ type: 'info', message: 'Generating your personalised meal plan...' })}
          className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
        >
          Show Info
        </button>
        <Toaster />
      </div>
    )
  },
}
