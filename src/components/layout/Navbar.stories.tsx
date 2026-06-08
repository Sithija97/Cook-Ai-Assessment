import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Templates/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
        <div className="p-8 text-slate-400 text-sm">Page content below the navbar</div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnHomePage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export const OnRecipesPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/recommendations']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export const OnAssistantPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/assistant']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export const OnMealPlannerPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/meal-planner']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}
