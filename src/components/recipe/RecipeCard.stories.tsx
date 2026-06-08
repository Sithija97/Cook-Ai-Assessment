import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { RecipeCard } from './RecipeCard'
import { mockRecipe, mockEasyRecipe, mockHardRecipe } from '../../stories/mockData'

const meta: Meta<typeof RecipeCard> = {
  title: 'Organisms/RecipeCard',
  component: RecipeCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = {
  render: () => <div className="w-72"><RecipeCard recipe={mockRecipe} /></div>,
}

export const Easy: Story = {
  render: () => <div className="w-72"><RecipeCard recipe={mockEasyRecipe} /></div>,
}

export const Hard: Story = {
  render: () => <div className="w-72"><RecipeCard recipe={mockHardRecipe} /></div>,
}

export const Grid: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[900px]">
      <RecipeCard recipe={mockEasyRecipe} />
      <RecipeCard recipe={mockRecipe} />
      <RecipeCard recipe={mockHardRecipe} />
    </div>
  ),
}
