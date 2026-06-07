import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

function ModalDemo({ title, size, children }: { title?: string; size?: 'sm' | 'md' | 'lg'; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} size={size}>
        {children ?? (
          <p className="text-slate-600 text-sm">
            This is the modal content area. You can place any content here.
          </p>
        )}
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: () => <ModalDemo title="Recipe Details" />,
}

export const Small: Story = {
  render: () => (
    <ModalDemo title="Confirm Action" size="sm">
      <p className="text-slate-600 text-sm mb-4">Are you sure you want to remove this recipe from your meal plan?</p>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="coral" size="sm">Remove</Button>
      </div>
    </ModalDemo>
  ),
}

export const Large: Story = {
  render: () => (
    <ModalDemo title="Generate Meal Plan" size="lg">
      <div className="space-y-4">
        <p className="text-slate-500 text-sm">Configure your personalised meal plan settings below.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">Days: 7</div>
          <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">Servings: 2</div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="coral" size="sm">Generate</Button>
        </div>
      </div>
    </ModalDemo>
  ),
}

export const NoTitle: Story = {
  render: () => <ModalDemo />,
}
