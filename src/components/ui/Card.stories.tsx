import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="font-display text-lg text-slate-800 mb-2">Spaghetti Carbonara</h3>
        <p className="text-slate-500 text-sm">Classic Roman pasta with eggs, cheese, and guanciale.</p>
      </div>
    ),
  },
}

export const WithContent: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <h3 className="font-display text-xl text-slate-800 mb-1">Recipe Title</h3>
      <p className="text-slate-500 text-sm mb-4">A short description of this delicious recipe goes here.</p>
      <div className="flex gap-2 text-xs text-slate-500">
        <span>30 min</span>
        <span>•</span>
        <span>4 servings</span>
        <span>•</span>
        <span>Easy</span>
      </div>
    </Card>
  ),
}

export const Nested: Story = {
  render: () => (
    <Card className="w-96 p-6">
      <h3 className="font-display text-lg text-slate-800 mb-4">Nutrition Info</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Protein', value: '28g' },
          { label: 'Carbs', value: '62g' },
          { label: 'Fat', value: '22g' },
          { label: 'Fiber', value: '3g' },
        ].map(({ label, value }) => (
          <Card key={label} className="p-3 text-center">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="font-display text-lg text-slate-800">{value}</p>
          </Card>
        ))}
      </div>
    </Card>
  ),
}
