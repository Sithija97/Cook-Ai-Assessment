import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { MealSlot } from './MealSlot'
import { mockRecipe, mockEasyRecipe } from '../../stories/mockData'

const meta: Meta<typeof MealSlot> = {
  title: 'Organisms/MealSlot',
  component: MealSlot,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    mealType: { control: 'select', options: ['breakfast', 'lunch', 'dinner', 'snack'] },
    isRegenerating: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: () => (
    <div className="w-48">
      <MealSlot mealType="breakfast" recipe={null} onRegenerate={() => {}} onRemove={() => {}} />
    </div>
  ),
}

export const WithRecipe: Story = {
  render: () => (
    <div className="w-48">
      <MealSlot mealType="lunch" recipe={mockRecipe} onRegenerate={() => {}} onRemove={() => {}} />
    </div>
  ),
}

export const Regenerating: Story = {
  render: () => (
    <div className="w-48">
      <MealSlot mealType="dinner" recipe={null} onRegenerate={() => {}} onRemove={() => {}} isRegenerating />
    </div>
  ),
}

export const AllMealTypes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-4 gap-3 w-[800px]">
      <MealSlot mealType="breakfast" recipe={mockEasyRecipe} onRegenerate={() => {}} onRemove={() => {}} />
      <MealSlot mealType="lunch"     recipe={mockRecipe}     onRegenerate={() => {}} onRemove={() => {}} />
      <MealSlot mealType="dinner"    recipe={null}           onRegenerate={() => {}} onRemove={() => {}} />
      <MealSlot mealType="snack"     recipe={null}           onRegenerate={() => {}} onRemove={() => {}} isRegenerating />
    </div>
  ),
}
