import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'coral', 'green', 'amber', 'red', 'gray'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Blue: Story = {
  args: { children: 'Vegetarian', variant: 'blue' },
}

export const Coral: Story = {
  args: { children: 'Spicy', variant: 'coral' },
}

export const Green: Story = {
  args: { children: 'Vegan', variant: 'green' },
}

export const Amber: Story = {
  args: { children: 'Gluten-Free', variant: 'amber' },
}

export const Red: Story = {
  args: { children: 'Contains Nuts', variant: 'red' },
}

export const Gray: Story = {
  args: { children: 'Quick Meal', variant: 'gray' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue">Vegetarian</Badge>
      <Badge variant="coral">Spicy</Badge>
      <Badge variant="green">Vegan</Badge>
      <Badge variant="amber">Gluten-Free</Badge>
      <Badge variant="red">Contains Nuts</Badge>
      <Badge variant="gray">Quick Meal</Badge>
    </div>
  ),
}

export const DietaryTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['Vegan', 'Gluten-Free', 'High Protein', 'Low Carb', 'Dairy-Free', 'Keto'].map((tag, i) => (
        <Badge key={tag} variant={(['blue', 'green', 'coral', 'amber', 'gray', 'blue'] as const)[i]}>
          {tag}
        </Badge>
      ))}
    </div>
  ),
}
