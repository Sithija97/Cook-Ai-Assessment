import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageWrapper } from './PageWrapper'

const meta: Meta<typeof PageWrapper> = {
  title: 'Templates/PageWrapper',
  component: PageWrapper,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'surface' } },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PageWrapper>
      <h1 className="font-display text-3xl text-slate-800 mb-4">Page Title</h1>
      <p className="text-slate-500 text-sm max-w-prose">
        PageWrapper constrains content to max-w-7xl, adds horizontal padding, and applies the
        page-transition animation (fade + slide up) on mount. Every page in ChefAI is wrapped
        with this component.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 h-32 flex items-center justify-center text-slate-400 text-sm">
            Content block {i}
          </div>
        ))}
      </div>
    </PageWrapper>
  ),
}

export const WithCustomClass: Story = {
  render: () => (
    <PageWrapper className="max-w-2xl">
      <h1 className="font-display text-2xl text-slate-800 mb-3">Narrow Layout</h1>
      <p className="text-slate-500 text-sm">
        Pass className to override the default width — useful for content-focused pages like
        the AI Assistant chat interface.
      </p>
    </PageWrapper>
  ),
}
