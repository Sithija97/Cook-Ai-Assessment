import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search, Mail, Lock } from 'lucide-react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Search recipes...' },
}

export const WithLabel: Story = {
  args: { label: 'Recipe Name', placeholder: 'e.g. Spaghetti Carbonara' },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Find a recipe...',
    leftIcon: <Search size={16} />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    leftIcon: <Mail size={16} />,
    error: 'Please enter a valid email address.',
    value: 'not-an-email',
    readOnly: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'API Key',
    placeholder: 'Enter your Gemini API key',
    leftIcon: <Lock size={16} />,
    disabled: true,
    value: '••••••••••••••••',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input label="Default" placeholder="Default input" />
      <Input label="With Icon" placeholder="Search..." leftIcon={<Search size={16} />} />
      <Input label="With Error" placeholder="Email" error="Required field" value="bad-value" readOnly />
      <Input label="Disabled" placeholder="Disabled" disabled value="Can't edit this" readOnly />
    </div>
  ),
}
