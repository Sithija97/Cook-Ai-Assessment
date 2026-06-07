import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Home, Utensils, MessageCircle, CalendarDays, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useFavoritesStore } from '../../store/favoritesStore'

interface NavLinkItem {
  to:    string
  icon:  LucideIcon
  label: string
}

const links: NavLinkItem[] = [
  { to: '/',               icon: Home,          label: 'Home'      },
  { to: '/recommendations', icon: Utensils,     label: 'Recipes'   },
  { to: '/assistant',      icon: MessageCircle, label: 'Assistant' },
  { to: '/meal-planner',   icon: CalendarDays,  label: 'Planner'   },
  { to: '/favorites',      icon: Heart,         label: 'Favorites' },
]

interface Props {
  onClose: () => void
}

export const MobileNav = memo(function MobileNav({ onClose }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const favCount = useFavoritesStore(s => s.favorites.length)

  return (
    <motion.nav
      initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg z-40"
      aria-label="Mobile navigation"
    >
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClose}
          className={({ isActive }) => [
            'flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors',
            isActive
              ? 'text-blue-600 bg-blue-50'
              : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50',
          ].join(' ')}
        >
          <Icon size={18} />
          {label}
          {label === 'Favorites' && favCount > 0 && (
            <span className="ml-auto bg-coral-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              {favCount}
            </span>
          )}
        </NavLink>
      ))}
    </motion.nav>
  )
})
