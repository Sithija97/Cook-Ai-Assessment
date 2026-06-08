import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: 'h-4 w-48' },
}

export const Circle: Story = {
  args: { className: 'w-12 h-12 rounded-full' },
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-72 bg-white rounded-xl border border-slate-200 p-4 space-y-3">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  ),
}

export const TextLines: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  ),
}
