import type { Meta, StoryObj } from '@storybook/react-vite'
import { TypingIndicator } from './TypingIndicator'

const meta: Meta<typeof TypingIndicator> = {
  title: 'Chat/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-lg bg-white rounded-xl p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InChatContext: Story = {
  render: () => (
    <div className="max-w-lg bg-white rounded-xl p-4 space-y-1">
      <div
        className="flex justify-end mb-4"
      >
        <div
          className="max-w-[75%] bg-blue-500 text-white text-sm leading-relaxed px-4 py-3"
          style={{ borderRadius: '18px 18px 4px 18px' }}
        >
          What recipes can I make with chicken?
        </div>
      </div>
      <TypingIndicator />
    </div>
  ),
}
