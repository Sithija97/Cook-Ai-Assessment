import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatInput } from './ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Molecules/ChatInput',
  component: ChatInput,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl border border-slate-200 rounded-xl overflow-hidden">
      <ChatInput onSend={(msg) => console.log('sent:', msg)} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-2xl border border-slate-200 rounded-xl overflow-hidden">
      <ChatInput onSend={() => {}} disabled />
    </div>
  ),
}

export const InChatContext: Story = {
  render: () => (
    <div className="max-w-2xl border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="p-4 space-y-3 bg-slate-50 border-b border-slate-100">
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white text-sm px-4 py-2 rounded-[18px_18px_4px_18px] max-w-xs">
            What can I cook with chicken?
          </div>
        </div>
        <div className="flex">
          <div className="bg-white border border-blue-100 border-l-[3px] border-l-blue-500 text-sm px-4 py-2 rounded-[18px_18px_18px_4px] max-w-sm text-slate-700">
            Great choice! Here are some quick chicken recipes...
          </div>
        </div>
      </div>
      <ChatInput onSend={(msg) => console.log('sent:', msg)} />
    </div>
  ),
}
