import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { MobileNav } from './MobileNav'

const meta: Meta<typeof MobileNav> = {
  title: 'Templates/MobileNav',
  component: MobileNav,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="relative">
          <div className="h-16 bg-white border-b border-slate-100 flex items-center px-4">
            <span className="font-display text-xl text-blue-700">ChefAI</span>
          </div>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <MobileNav onClose={() => {}} />,
}

export const OnRecipesPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/recommendations']}>
        <div className="relative">
          <div className="h-16 bg-white border-b border-slate-100 flex items-center px-4">
            <span className="font-display text-xl text-blue-700">ChefAI</span>
          </div>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  render: () => <MobileNav onClose={() => {}} />,
}
