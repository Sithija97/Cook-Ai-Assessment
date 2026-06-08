import type { Meta, StoryObj } from '@storybook/react-vite'
import { DifficultyBadge } from './DifficultyBadge'

const meta: Meta<typeof DifficultyBadge> = {
  title: 'Atoms/DifficultyBadge',
  component: DifficultyBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    difficulty: { control: 'select', options: ['Easy', 'Medium', 'Hard'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Easy: Story = {
  args: { difficulty: 'Easy' },
}

export const Medium: Story = {
  args: { difficulty: 'Medium' },
}

export const Hard: Story = {
  args: { difficulty: 'Hard' },
}

export const AllDifficulties: Story = {
  render: () => (
    <div className="flex gap-2">
      <DifficultyBadge difficulty="Easy" />
      <DifficultyBadge difficulty="Medium" />
      <DifficultyBadge difficulty="Hard" />
    </div>
  ),
}
