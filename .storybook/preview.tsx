import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#F8FAFC' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#1E293B' },
      ],
    },
    a11y: { test: 'todo' },
  },
}

export default preview
