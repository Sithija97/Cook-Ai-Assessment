import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TagInput } from './TagInput'

const meta: Meta<typeof TagInput> = {
  title: 'Atoms/TagInput',
  component: TagInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

function TagDemo({ initial = [] }: { initial?: string[] }) {
  const [tags, setTags] = useState<string[]>(initial)
  return (
    <div className="w-80">
      <TagInput tags={tags} onChange={setTags} label="Dietary restrictions" placeholder="Type and press Enter" />
      {tags.length > 0 && (
        <p className="mt-2 text-xs text-slate-400">Tags: {tags.join(', ')}</p>
      )}
    </div>
  )
}

export const Empty: Story = {
  render: () => <TagDemo />,
}

export const WithTags: Story = {
  render: () => <TagDemo initial={['vegan', 'gluten-free', 'high-protein']} />,
}

export const ManyTags: Story = {
  render: () => (
    <TagDemo initial={['vegan', 'gluten-free', 'high-protein', 'low-carb', 'dairy-free', 'nut-free']} />
  ),
}
