import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChefHat, Heart, Search, Calendar } from 'lucide-react'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    iconColor: { control: 'select', options: ['blue', 'coral'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const NoRecipes: Story = {
  args: {
    icon: <ChefHat size={36} />,
    iconColor: 'blue',
    title: 'No recipes found',
    description: 'Try adjusting your filters or search with different keywords.',
    actionLabel: 'Clear Filters',
    onAction: () => alert('Cleared!'),
  },
}

export const NoFavorites: Story = {
  args: {
    icon: <Heart size={36} />,
    iconColor: 'coral',
    title: 'No favourites yet',
    description: 'Save recipes you love and they will appear here for quick access.',
    actionLabel: 'Browse Recipes',
    onAction: () => {},
  },
}

export const NoResults: Story = {
  args: {
    icon: <Search size={36} />,
    iconColor: 'blue',
    title: 'No results',
    description: 'We couldn\'t find anything matching your search. Try a different term.',
  },
}

export const NoMealPlan: Story = {
  args: {
    icon: <Calendar size={36} />,
    iconColor: 'coral',
    title: 'No meal plan yet',
    description: 'Generate a personalised 7-day meal plan tailored to your dietary needs.',
    actionLabel: 'Generate Plan',
    onAction: () => {},
  },
}
