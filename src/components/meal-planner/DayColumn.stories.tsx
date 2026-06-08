import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { DayColumn } from './DayColumn'
import { mockRecipe, mockEasyRecipe, mockHardRecipe } from '../../stories/mockData'
import type { MealPlanDay } from '../../types'

const fullDay: MealPlanDay = {
  day: 'Monday',
  dayIndex: 0,
  meals: { breakfast: mockEasyRecipe, lunch: mockRecipe, dinner: mockHardRecipe },
  totalCalories: 1720,
  estimatedCost: '$12.50',
}

const partialDay: MealPlanDay = {
  day: 'Tuesday',
  dayIndex: 1,
  meals: { breakfast: mockEasyRecipe },
  totalCalories: 320,
  estimatedCost: '$3.50',
}

const emptyDay: MealPlanDay = {
  day: 'Wednesday',
  dayIndex: 2,
  meals: {},
  totalCalories: 0,
  estimatedCost: '',
}

const meta: Meta<typeof DayColumn> = {
  title: 'Organisms/DayColumn',
  component: DayColumn,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-48">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const FullDay: Story = {
  render: () => (
    <DayColumn
      day={fullDay}
      dayIndex={0}
      includeMeals={['breakfast', 'lunch', 'dinner']}
      onRegenerate={() => {}}
      onRemove={() => {}}
    />
  ),
}

export const PartialDay: Story = {
  render: () => (
    <DayColumn
      day={partialDay}
      dayIndex={1}
      includeMeals={['breakfast', 'lunch', 'dinner']}
      onRegenerate={() => {}}
      onRemove={() => {}}
    />
  ),
}

export const EmptyDay: Story = {
  render: () => (
    <DayColumn
      day={emptyDay}
      dayIndex={2}
      includeMeals={['breakfast', 'lunch', 'dinner']}
      onRegenerate={() => {}}
      onRemove={() => {}}
    />
  ),
}

export const WithSnack: Story = {
  render: () => (
    <DayColumn
      day={{ ...fullDay, meals: { ...fullDay.meals, snack: mockEasyRecipe } }}
      dayIndex={0}
      includeMeals={['breakfast', 'lunch', 'dinner', 'snack']}
      onRegenerate={() => {}}
      onRemove={() => {}}
    />
  ),
}

export const Regenerating: Story = {
  render: () => (
    <DayColumn
      day={fullDay}
      dayIndex={0}
      includeMeals={['breakfast', 'lunch', 'dinner']}
      onRegenerate={() => {}}
      onRemove={() => {}}
      regeneratingSlots={{ '0-lunch': true }}
    />
  ),
}
