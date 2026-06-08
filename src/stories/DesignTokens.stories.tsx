import type { Meta, StoryObj } from '@storybook/react-vite'

// ─── Colour swatch ───────────────────────────────────────────────────────────

function Swatch({ name, hex }: { name: string; hex: string; textWhite?: boolean }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 80, height: 80, borderRadius: 12,
          background: hex, border: '1px solid #E2E8F0',
          marginBottom: 6,
        }}
      />
      <div style={{ fontSize: 11, fontWeight: 600, color: '#1E293B' }}>{name}</div>
      <div style={{ fontSize: 10, color: '#64748B', fontFamily: 'monospace' }}>{hex}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: 'system-ui', fontSize: 18, fontWeight: 600, color: '#1E293B', marginBottom: 20, borderBottom: '2px solid #F1F5F9', paddingBottom: 10 }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: 'system-ui', fontSize: 13, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
      {children}
    </h3>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function DesignTokensPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
          🍳 ChefAI Design Tokens
        </h1>
        <p style={{ color: '#64748B', fontSize: 15 }}>
          Single source of truth for all visual decisions.
          All values live in <code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: 4 }}>src/design-system/tokens.ts</code> and
          are consumed via Tailwind utility classes.
        </p>
      </div>

      {/* COLOURS */}
      <Section title="Colour Palette">
        <Label>Primary — Blue</Label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          <Swatch name="blue-50"  hex="#EFF6FF" />
          <Swatch name="blue-100" hex="#DBEAFE" />
          <Swatch name="blue-500" hex="#2563EB" textWhite />
          <Swatch name="blue-600" hex="#1D4ED8" textWhite />
          <Swatch name="blue-700" hex="#1E40AF" textWhite />
          <Swatch name="blue-900" hex="#1E3A8A" textWhite />
        </div>

        <Label>Accent — Coral</Label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          <Swatch name="coral-50"  hex="#FFF1EE" />
          <Swatch name="coral-100" hex="#FCA99A" />
          <Swatch name="coral-500" hex="#F26B4E" textWhite />
          <Swatch name="coral-600" hex="#E05535" textWhite />
          <Swatch name="coral-700" hex="#C2400C" textWhite />
        </div>

        <Label>Semantic</Label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          <Swatch name="Success" hex="#10B981" textWhite />
          <Swatch name="Warning" hex="#F59E0B" />
          <Swatch name="Error"   hex="#EF4444" textWhite />
        </div>

        <Label>Neutral</Label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Swatch name="Surface"         hex="#F8FAFC" />
          <Swatch name="Border"          hex="#E2E8F0" />
          <Swatch name="Text/Primary"    hex="#1E293B" textWhite />
          <Swatch name="Text/Secondary"  hex="#64748B" textWhite />
          <Swatch name="Text/Tertiary"   hex="#94A3B8" />
        </div>
      </Section>

      {/* TYPOGRAPHY */}
      <Section title="Typography">
        <Label>Font Families</Label>
        <div style={{ display: 'flex', gap: 24, marginBottom: 28 }}>
          <div style={{ flex: 1, background: '#F8FAFC', borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>font-display · DM Serif Display</p>
            <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: '#1E293B' }}>
              Spaghetti Carbonara
            </p>
          </div>
          <div style={{ flex: 1, background: '#F8FAFC', borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>font-body · Plus Jakarta Sans</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 15, color: '#1E293B', lineHeight: 1.6 }}>
              A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and freshly cracked black pepper.
            </p>
          </div>
        </div>

        <Label>Type Scale</Label>
        <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20 }}>
          {[
            { token: 'text-xs',   size: '12px', sample: 'Metadata · timestamps · tooltips' },
            { token: 'text-sm',   size: '14px', sample: 'Body copy · labels · descriptions' },
            { token: 'text-base', size: '16px', sample: 'Default paragraph text' },
            { token: 'text-lg',   size: '18px', sample: 'Sub-headings · card titles' },
            { token: 'text-xl',   size: '24px', sample: 'Page section headings' },
            { token: 'text-2xl',  size: '32px', sample: 'Page titles' },
            { token: 'text-3xl',  size: '48px', sample: 'Hero display' },
          ].map(({ token, size, sample }) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
              <code style={{ width: 100, fontSize: 12, color: '#2563EB', flexShrink: 0 }}>{token}</code>
              <code style={{ width: 44, fontSize: 12, color: '#94A3B8', flexShrink: 0 }}>{size}</code>
              <span style={{ fontSize: size, fontFamily: 'Plus Jakarta Sans, system-ui', color: '#1E293B', lineHeight: 1.2 }}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* SPACING */}
      <Section title="Spacing">
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap', background: '#F8FAFC', borderRadius: 12, padding: 20 }}>
          {[
            { token: 'xs',  px: 4  },
            { token: 'sm',  px: 8  },
            { token: 'md',  px: 16 },
            { token: 'lg',  px: 24 },
            { token: 'xl',  px: 32 },
            { token: '2xl', px: 48 },
            { token: '3xl', px: 64 },
          ].map(({ token, px }) => (
            <div key={token} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <div style={{ width: px, height: px, background: '#2563EB', opacity: 0.25, borderRadius: 4, minWidth: 4 }} />
              </div>
              <code style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#1E293B' }}>{token}</code>
              <span style={{ fontSize: 10, color: '#64748B' }}>{px}px</span>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPONENTS */}
      <Section title="Component Tokens">
        <Label>Border Radius</Label>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
          {[
            { name: 'Button / Input', radius: 8 },
            { name: 'Card', radius: 12 },
            { name: 'Badge', radius: 9999 },
          ].map(({ name, radius }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: '#DBEAFE', border: '2px solid #2563EB', borderRadius: Math.min(radius, 32), marginBottom: 8 }} />
              <p style={{ fontSize: 11, fontWeight: 600, color: '#1E293B' }}>{name}</p>
              <code style={{ fontSize: 10, color: '#64748B' }}>{radius === 9999 ? 'full' : `${radius}px`}</code>
            </div>
          ))}
        </div>

        <Label>Chat Bubble Styles</Label>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
          <div>
            <div style={{ background: '#2563EB', color: '#fff', borderRadius: '18px 18px 4px 18px', padding: '12px 16px', fontSize: 14, marginBottom: 8 }}>
              What can I make tonight?
            </div>
            <code style={{ fontSize: 11, color: '#64748B' }}>User · bg-blue-500 · radius 18/18/4/18</code>
          </div>
          <div>
            <div style={{ background: '#fff', border: '1px solid #DBEAFE', borderLeft: '3px solid #2563EB', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', fontSize: 14, color: '#334155', marginBottom: 8 }}>
              Here are some great options for you...
            </div>
            <code style={{ fontSize: 11, color: '#64748B' }}>Assistant · bg-white · border-l-blue-500 · radius 18/18/18/4</code>
          </div>
        </div>

        <Label>Button Sizes</Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'sm', h: 32, px: 12 },
            { label: 'md', h: 40, px: 16 },
            { label: 'lg', h: 48, px: 20 },
          ].map(({ label, h, px }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ height: h, paddingLeft: px, paddingRight: px, background: '#2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                {label}
              </div>
              <code style={{ fontSize: 10, color: '#64748B' }}>h={h}px</code>
            </div>
          ))}
        </div>
      </Section>

      {/* ACCESSIBILITY */}
      <Section title="Accessibility">
        <Label>Contrast Ratios (WCAG AA requires 4.5:1 for normal text)</Label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          {[
            { fg: '#2563EB', label: 'blue-500 on white',  ratio: '4.54:1', pass: true },
            { fg: '#E05535', label: 'coral-600 on white', ratio: '4.61:1', pass: true },
            { fg: '#F26B4E', label: 'coral-500 on white', ratio: '3.24:1', pass: false },
          ].map(({ fg, label, ratio, pass }) => (
            <div key={label} style={{ background: '#F8FAFC', borderRadius: 10, padding: 16, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: fg }} />
                <span style={{ fontSize: 13, color: '#1E293B' }}>{label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <code style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{ratio}</code>
                <span style={{ fontSize: 12, color: pass ? '#10B981' : '#F59E0B', fontWeight: 600 }}>
                  {pass ? '✓ AA Pass' : '⚠ Large text only'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#EFF6FF', border: '2px solid #2563EB', borderRadius: 8, padding: 12, fontSize: 13, color: '#1E293B' }}>
          <strong>Focus ring:</strong>{' '}
          <code>focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2</code>
          {' '}— applied to all interactive elements.
        </div>
      </Section>

      {/* ANIMATION */}
      <Section title="Animation">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { name: 'Page transition',   value: '0.2s easeOut',   usage: 'Route changes' },
            { name: 'Card hover',        value: 'y: −4px',        usage: 'RecipeCard lift on hover' },
            { name: 'Heart toggle',      value: 'scale 0.85 spring', usage: 'Favourite button tap' },
            { name: 'Stagger children',  value: '0.04s delay each', usage: 'Recipe grid appearance' },
          ].map(({ name, value, usage }) => (
            <div key={name} style={{ background: '#F8FAFC', borderRadius: 10, padding: 14, border: '1px solid #E2E8F0' }}>
              <p style={{ fontWeight: 600, fontSize: 13, color: '#1E293B', marginBottom: 4 }}>{name}</p>
              <code style={{ fontSize: 12, color: '#2563EB', display: 'block', marginBottom: 4 }}>{value}</code>
              <p style={{ fontSize: 12, color: '#64748B' }}>{usage}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ─── Story export ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundation/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Tokens: Story = {
  render: () => <DesignTokensPage />,
}
