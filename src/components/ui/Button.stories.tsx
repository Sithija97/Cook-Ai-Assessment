import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChefHat, Search, Heart } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'coral', 'coral-outline', 'ghost'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Find Recipes', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'View All', variant: 'secondary' },
}

export const Coral: Story = {
  args: { children: 'Save Recipe', variant: 'coral' },
}

export const CoralOutline: Story = {
  args: { children: 'Add to Favourites', variant: 'coral-outline' },
}

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost' },
}

export const Small: Story = {
  args: { children: 'Filter', variant: 'primary', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Generate Meal Plan', variant: 'coral', size: 'lg' },
}

export const Loading: Story = {
  args: { children: 'Generating...', variant: 'primary', loading: true },
}

export const Disabled: Story = {
  args: { children: 'Submit', variant: 'primary', disabled: true },
}

export const WithLeftIcon: Story = {
  args: {
    children: 'Search Recipes',
    variant: 'primary',
    leftIcon: <Search size={16} />,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Open Assistant',
    variant: 'coral',
    rightIcon: <ChefHat size={16} />,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="coral">Coral</Button>
      <Button variant="coral-outline">Coral Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" leftIcon={<Search size={14} />} size="sm">Search</Button>
      <Button variant="coral" leftIcon={<Heart size={14} />}>Save</Button>
      <Button variant="secondary" rightIcon={<ChefHat size={14} />} size="lg">Open Chef</Button>
    </div>
  ),
}
