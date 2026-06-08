import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { RecipeGrid } from './RecipeGrid'
import { mockRecipe, mockEasyRecipe, mockHardRecipe } from '../../stories/mockData'

const meta: Meta<typeof RecipeGrid> = {
  title: 'Organisms/RecipeGrid',
  component: RecipeGrid,
  parameters: { layout: 'padded' },
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

export const Loaded: Story = {
  render: () => (
    <RecipeGrid recipes={[mockEasyRecipe, mockRecipe, mockHardRecipe, mockEasyRecipe, mockRecipe, mockHardRecipe]} />
  ),
}

export const Loading: Story = {
  render: () => <RecipeGrid loading skeletonCount={6} />,
}

export const LoadingWithPartialResults: Story = {
  render: () => (
    <RecipeGrid recipes={[mockEasyRecipe, mockRecipe]} loading skeletonCount={6} />
  ),
}

export const SingleResult: Story = {
  render: () => <RecipeGrid recipes={[mockRecipe]} />,
}
