import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatBubble } from './ChatBubble'
import {
  mockUserMessage,
  mockAssistantMessage,
  mockStreamingMessage,
  mockErrorMessage,
} from '../../stories/mockData'

const meta: Meta<typeof ChatBubble> = {
  title: 'Organisms/ChatBubble',
  component: ChatBubble,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: { message: mockUserMessage },
}

export const AssistantMessage: Story = {
  args: { message: mockAssistantMessage },
}

export const StreamingMessage: Story = {
  args: { message: mockStreamingMessage },
}

export const ErrorMessage: Story = {
  args: {
    message: mockErrorMessage,
    onRetry: () => alert('Retrying...'),
  },
}

export const Conversation: Story = {
  render: () => (
    <div className="max-w-lg space-y-1 bg-white rounded-xl p-4">
      <ChatBubble message={mockUserMessage} />
      <ChatBubble message={mockAssistantMessage} />
      <ChatBubble message={{ ...mockUserMessage, id: '5', content: 'Can you give me the carbonara recipe?' }} />
      <ChatBubble message={mockStreamingMessage} />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="max-w-lg space-y-1 bg-white rounded-xl p-4">
      <ChatBubble message={mockUserMessage} />
      <ChatBubble message={mockErrorMessage} onRetry={() => {}} />
    </div>
  ),
}
