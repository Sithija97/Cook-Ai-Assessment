import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecipeImagePlaceholder } from './RecipeImagePlaceholder'

const meta: Meta<typeof RecipeImagePlaceholder> = {
  title: 'Molecules/RecipeImagePlaceholder',
  component: RecipeImagePlaceholder,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Italian: Story = {
  render: () => (
    <div className="w-72 rounded-xl overflow-hidden">
      <RecipeImagePlaceholder iconName="pizza" cuisine="Italian" size="sm" />
    </div>
  ),
}

export const Japanese: Story = {
  render: () => (
    <div className="w-72 rounded-xl overflow-hidden">
      <RecipeImagePlaceholder iconName="fish" cuisine="Japanese" size="sm" />
    </div>
  ),
}

export const AllCuisines: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-3 w-[700px]">
      {[
        { icon: 'pizza',    cuisine: 'Italian'       },
        { icon: 'fish',     cuisine: 'Japanese'      },
        { icon: 'soup',     cuisine: 'Indian'        },
        { icon: 'salad',    cuisine: 'Mediterranean' },
        { icon: 'sandwich', cuisine: 'American'      },
        { icon: 'egg',      cuisine: 'Breakfast'     },
        { icon: 'coffee',   cuisine: 'Café'          },
        { icon: 'leaf',     cuisine: 'Vegan'         },
      ].map(({ icon, cuisine }) => (
        <div key={cuisine} className="rounded-xl overflow-hidden">
          <RecipeImagePlaceholder iconName={icon} cuisine={cuisine} size="sm" />
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <div className="w-10 h-10 rounded overflow-hidden">
        <RecipeImagePlaceholder iconName="pizza" cuisine="Italian" size="xs" />
      </div>
      <div className="w-48 rounded-xl overflow-hidden">
        <RecipeImagePlaceholder iconName="pizza" cuisine="Italian" size="sm" />
      </div>
      <div className="w-64 rounded-xl overflow-hidden">
        <RecipeImagePlaceholder iconName="pizza" cuisine="Italian" size="lg" />
      </div>
    </div>
  ),
}
