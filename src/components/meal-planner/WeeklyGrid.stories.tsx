import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { WeeklyGrid } from './WeeklyGrid'
import { mockRecipe, mockEasyRecipe, mockHardRecipe } from '../../stories/mockData'
import type { MealPlan } from '../../types'

const mockMealPlan: MealPlan = {
  days: [
    { day: 'Mon', dayIndex: 0, meals: { breakfast: mockEasyRecipe, lunch: mockRecipe, dinner: mockHardRecipe }, totalCalories: 1720, estimatedCost: '$12.50' },
    { day: 'Tue', dayIndex: 1, meals: { breakfast: mockEasyRecipe, lunch: mockRecipe, dinner: mockRecipe   }, totalCalories: 1420, estimatedCost: '$10.00' },
    { day: 'Wed', dayIndex: 2, meals: { breakfast: mockRecipe,     lunch: mockHardRecipe                  }, totalCalories: 1400, estimatedCost: '$11.00' },
    { day: 'Thu', dayIndex: 3, meals: { breakfast: mockEasyRecipe, lunch: mockRecipe, dinner: mockHardRecipe }, totalCalories: 1720, estimatedCost: '$12.50' },
    { day: 'Fri', dayIndex: 4, meals: { breakfast: mockEasyRecipe, dinner: mockRecipe                     }, totalCalories: 900,  estimatedCost: '$8.00'  },
    { day: 'Sat', dayIndex: 5, meals: { breakfast: mockRecipe,     lunch: mockEasyRecipe, dinner: mockHardRecipe }, totalCalories: 1720, estimatedCost: '$13.00' },
    { day: 'Sun', dayIndex: 6, meals: { breakfast: mockEasyRecipe, lunch: mockHardRecipe, dinner: mockRecipe    }, totalCalories: 1720, estimatedCost: '$11.50' },
  ],
  weeklyNutritionSummary: { avgDailyCalories: 1514, avgProtein: '82g', avgCarbs: '198g', avgFat: '58g' },
  shoppingList: {
    produce:  ['avocado', 'tomatoes', 'spinach', 'lemon'],
    proteins: ['chicken breast', 'eggs', 'guanciale'],
    dairy:    ['pecorino romano', 'parmesan', 'butter'],
    pantry:   ['olive oil', 'spaghetti', 'black pepper'],
    grains:   ['pasta', 'bread', 'puff pastry'],
  },
}

const meta: Meta<typeof WeeklyGrid> = {
  title: 'Templates/WeeklyGrid',
  component: WeeklyGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="p-6">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const FullWeek: Story = {
  render: () => (
    <WeeklyGrid
      mealPlan={mockMealPlan}
      includeMeals={['breakfast', 'lunch', 'dinner']}
      onRegenerate={() => {}}
      onRemove={() => {}}
    />
  ),
}

export const WithSnacks: Story = {
  render: () => (
    <WeeklyGrid
      mealPlan={{
        ...mockMealPlan,
        days: mockMealPlan.days.map(d => ({
          ...d,
          meals: { ...d.meals, snack: mockEasyRecipe },
        })),
      }}
      includeMeals={['breakfast', 'lunch', 'dinner', 'snack']}
      onRegenerate={() => {}}
      onRemove={() => {}}
    />
  ),
}

export const Generating: Story = {
  render: () => (
    <WeeklyGrid
      isGenerating
      includeMeals={['breakfast', 'lunch', 'dinner']}
      onRegenerate={() => {}}
      onRemove={() => {}}
    />
  ),
}
