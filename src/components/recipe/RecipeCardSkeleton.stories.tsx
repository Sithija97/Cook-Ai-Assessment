import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecipeCardSkeleton } from './RecipeCardSkeleton'

const meta: Meta<typeof RecipeCardSkeleton> = {
  title: 'Recipe/RecipeCardSkeleton',
  component: RecipeCardSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LoadingGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[900px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  ),
}
