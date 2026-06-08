import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

const withRouter = (route: string) => (Story: React.ComponentType) => (
  <MemoryRouter initialEntries={[route]}>
    <Story />
    <div className="p-8 text-slate-400 text-sm">Page content below the navbar</div>
  </MemoryRouter>
)

const meta: Meta<typeof Navbar> = {
  title: 'Templates/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [withRouter('/')],
}

export const OnHomePage: Story = {
  decorators: [withRouter('/')],
}

export const OnRecipesPage: Story = {
  decorators: [withRouter('/recommendations')],
}

export const OnAssistantPage: Story = {
  decorators: [withRouter('/assistant')],
}

export const OnMealPlannerPage: Story = {
  decorators: [withRouter('/meal-planner')],
}
