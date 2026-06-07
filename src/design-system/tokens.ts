export const tokens = {
  colors: {
    primary: {
      blue50:  '#EFF6FF',
      blue100: '#DBEAFE',
      blue500: '#2563EB',
      blue600: '#1D4ED8',
      blue700: '#1E40AF',
      blue900: '#1E3A8A',
    },
    accent: {
      coral50:  '#FFF1EE',
      coral100: '#FCA99A',
      coral500: '#F26B4E',
      coral600: '#E05535',
      coral700: '#C2400C',
    },
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error:   '#EF4444',
    },
    neutral: {
      surface: '#F8FAFC',
      border:  '#E2E8F0',
      text: {
        primary:   '#1E293B',
        secondary: '#64748B',
        tertiary:  '#94A3B8',
      },
    },
  },
  typography: {
    display: "'DM Serif Display', Georgia, serif",
    body:    "'Plus Jakarta Sans', system-ui, sans-serif",
    scale: {
      xs:   '12px',
      sm:   '14px',
      base: '16px',
      lg:   '18px',
      xl:   '24px',
      '2xl': '32px',
      '3xl': '48px',
    },
  },
  spacing: {
    xs:  '4px',
    sm:  '8px',
    md:  '16px',
    lg:  '24px',
    xl:  '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  components: {
    button: {
      borderRadius: '8px',
      variants: ['primary', 'secondary', 'coral', 'coral-outline', 'ghost'],
      sizes: { sm: '32px', md: '40px', lg: '48px' },
    },
    input: {
      borderRadius: '8px',
      focusRing: '2px solid #2563EB',
      borderColor: '#E2E8F0',
    },
    card: {
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      bg: '#FFFFFF',
      shadow: '0 1px 3px rgba(0,0,0,0.07)',
    },
    badge: {
      borderRadius: '9999px',
      variants: ['blue', 'coral', 'green', 'amber', 'red', 'gray'],
    },
    chat: {
      userBubble: {
        bg: '#2563EB',
        color: '#FFFFFF',
        borderRadius: '18px 18px 4px 18px',
      },
      aiBubble: {
        bg: '#FFFFFF',
        border: '1px solid #DBEAFE',
        borderLeft: '3px solid #2563EB',
        borderRadius: '18px 18px 18px 4px',
      },
    },
  },
  animation: {
    pageTransition: { duration: '0.2s', easing: 'easeOut' },
    cardHover: { y: -4, shadow: 'md' },
    heartToggle: { scale: 0.85, spring: true },
    staggerChildren: '0.04s',
    reducedMotion: 'prefers-reduced-motion: reduce → duration: 0',
  },
  accessibility: {
    contrastRatios: {
      blue500OnWhite:  '4.54:1 (AA ✓)',
      coral600OnWhite: '4.61:1 (AA ✓)',
      coral500OnWhite: '3.24:1 (large text only)',
    },
    focusRing: 'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  },
} as const
