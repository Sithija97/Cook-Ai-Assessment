import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: { type: 'range', min: 2, max: 10, step: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Textarea placeholder="Write something..." rows={4} />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <Textarea label="Recipe Notes" placeholder="Add any cooking notes here..." rows={4} />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <Textarea
        label="Description"
        placeholder="Describe the recipe..."
        error="Description is required"
        rows={4}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Textarea label="Notes" placeholder="Not editable" disabled rows={4} />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea label="Default" placeholder="Empty state..." rows={3} />
      <Textarea label="With value" defaultValue="Spaghetti carbonara is best served immediately after cooking." rows={3} />
      <Textarea label="Error state" defaultValue="Too short" error="Must be at least 20 characters" rows={3} />
      <Textarea label="Disabled" placeholder="Read only" disabled rows={3} />
    </div>
  ),
}
