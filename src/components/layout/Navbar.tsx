import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ChefHat, Menu, X, Heart } from 'lucide-react'
import { MobileNav } from './MobileNav'
import { useFavoritesStore } from '../../store/favoritesStore'

const navLinks = [
  { to: '/',               label: 'Home'        },
  { to: '/recommendations', label: 'Recipes'    },
  { to: '/assistant',      label: 'Assistant'   },
  { to: '/meal-planner',   label: 'Meal Planner'},
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const favCount = useFavoritesStore(s => s.favorites.length)
  const toggle   = useCallback(() => setMobileOpen(v => !v), [])
  const close    = useCallback(() => setMobileOpen(false), [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 bg-blue-500 text-white px-3 py-1.5 rounded text-sm font-medium"
      >
        Skip to content
      </a>

      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="ChefAI home"
        >
          <span className="w-9 h-9 rounded-xl bg-coral-50 flex items-center justify-center group-hover:bg-coral-100 transition-colors">
            <ChefHat size={20} className="text-coral-500" />
          </span>
          <span className="font-display text-xl text-blue-700 tracking-tight">ChefAI</span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => [
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors relative',
                isActive
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-blue-500 after:rounded-full'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50',
              ].join(' ')}
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/favorites"
            className={({ isActive }) => [
              'relative ml-1 px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors',
              isActive ? 'text-coral-600' : 'text-slate-600 hover:text-coral-500 hover:bg-coral-50',
            ].join(' ')}
            aria-label={`Favorites${favCount > 0 ? `, ${favCount} saved` : ''}`}
          >
            <Heart size={16} className={favCount > 0 ? 'fill-coral-500 text-coral-500' : ''} />
            Favorites
            {favCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-coral-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {favCount > 9 ? '9+' : favCount}
              </span>
            )}
          </NavLink>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={toggle}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={close} />}
      </AnimatePresence>
    </header>
  )
}
