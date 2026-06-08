import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoadingSpinner } from './LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Atoms/LoadingSpinner',
  component: LoadingSpinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 12, max: 64, step: 4 } },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 24 },
}

export const Coral: Story = {
  args: { size: 24, className: 'text-coral-500' },
}

export const White: Story = {
  args: { size: 24, className: 'text-white' },
  parameters: { backgrounds: { default: 'dark' } },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LoadingSpinner size={16} />
      <LoadingSpinner size={24} />
      <LoadingSpinner size={32} />
      <LoadingSpinner size={48} />
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <LoadingSpinner size={16} />
      <span>Generating recipe...</span>
    </div>
  ),
}
