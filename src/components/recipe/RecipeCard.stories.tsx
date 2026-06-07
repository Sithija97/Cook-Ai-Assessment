import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { RecipeCard } from './RecipeCard'
import { mockRecipe, mockEasyRecipe, mockHardRecipe } from '../../stories/mockData'

const meta: Meta<typeof RecipeCard> = {
  title: 'Recipe/RecipeCard',
  component: RecipeCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-72">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = {
  args: { recipe: mockRecipe },
}

export const Easy: Story = {
  args: { recipe: mockEasyRecipe },
}

export const Hard: Story = {
  args: { recipe: mockHardRecipe },
}

export const Grid: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="grid grid-cols-3 gap-4 w-[900px]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  render: () => (
    <>
      <RecipeCard recipe={mockEasyRecipe} />
      <RecipeCard recipe={mockRecipe} />
      <RecipeCard recipe={mockHardRecipe} />
    </>
  ),
}
