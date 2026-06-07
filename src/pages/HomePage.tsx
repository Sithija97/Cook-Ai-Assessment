import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Search, Sparkles, ChefHat, MessageCircle, CalendarDays,
  TrendingUp, ListPlus, UtensilsCrossed, Leaf,
} from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { RecipeGrid } from '../components/recipe/RecipeGrid'
import { Button } from '../components/ui/Button'
import { useRecipeSearch } from '../hooks/useRecipeSearch'
import { QUICK_FILTER_CHIPS } from '../utils/constants'

interface FloatingIconProps {
  icon:          LucideIcon
  style:         React.CSSProperties
  delay?:        number
  reducedMotion: boolean | null
}

const FloatingIcon = ({ icon: Icon, style, delay = 0, reducedMotion }: FloatingIconProps) => (
  <motion.div
    className="absolute text-slate-200 pointer-events-none select-none"
    style={style}
    animate={reducedMotion ? {} : { y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
  >
    <Icon size={48} strokeWidth={1} />
  </motion.div>
)

interface AiFeature {
  icon:      LucideIcon
  iconColor: string
  bg:        string
  title:     string
  desc:      string
}

const AI_FEATURES: AiFeature[] = [
  {
    icon: Sparkles, iconColor: 'text-blue-500', bg: 'bg-blue-50',
    title: 'Smart Recommendations',
    desc:  'Tell us your ingredients and cravings — AI crafts perfect recipes',
  },
  {
    icon: MessageCircle, iconColor: 'text-coral-500', bg: 'bg-coral-50',
    title: 'Cooking Assistant',
    desc:  'Ask ChefAI anything — substitutions, techniques, dietary swaps',
  },
  {
    icon: CalendarDays, iconColor: 'text-blue-500', bg: 'bg-blue-50',
    title: 'Meal Planner',
    desc:  'Let AI plan your entire week with nutritionally balanced meals',
  },
]

interface HowItWorksStep {
  step:  number
  icon:  LucideIcon
  label: string
}

const HOW_IT_WORKS: HowItWorksStep[] = [
  { step: 1, icon: ListPlus, label: 'Enter your ingredients' },
  { step: 2, icon: Sparkles,  label: 'AI generates recipes'  },
  { step: 3, icon: ChefHat,   label: 'Cook with confidence'  },
]

export default function HomePage() {
  const navigate           = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const [query, setQuery]           = useState('')
  const [selectedChip, setSelectedChip] = useState<string | null>(null)
  const { recipes, loading, search } = useRecipeSearch()

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/recommendations?q=${encodeURIComponent(query.trim())}`)
  }, [query, navigate])

  const handleChip = useCallback((chip: string) => {
    setSelectedChip(chip)
    navigate(`/recommendations?q=${encodeURIComponent(chip)}`)
  }, [navigate])

  const handleLoadTrending = useCallback(() => {
    void search({ cravings: 'popular trending comfort food', cookingTime: 45 })
  }, [search])

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <FloatingIcon icon={ChefHat}        style={{ top: '10%',  right: '8%' }}  delay={0}   reducedMotion={shouldReduceMotion} />
          <FloatingIcon icon={Sparkles}       style={{ top: '30%',  right: '18%' }} delay={1.5} reducedMotion={shouldReduceMotion} />
          <FloatingIcon icon={UtensilsCrossed} style={{ bottom: '15%', right: '5%' }} delay={3} reducedMotion={shouldReduceMotion} />
          <FloatingIcon icon={Leaf}           style={{ top: '15%',  left: '3%' }}   delay={2}   reducedMotion={shouldReduceMotion} />

          <motion.div
            className="max-w-2xl relative z-10"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <Sparkles size={12} />
              Powered by Gemini AI
            </div>

            <h1 className="font-display text-5xl md:text-6xl text-slate-900 leading-tight mb-4">
              Cook{' '}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Smarter
              </span>
              ,<br />Not Harder
            </h1>

            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              AI-powered recipes tailored to your ingredients, preferences, and cravings.
              Let ChefAI handle the planning while you handle the cooking.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" onClick={() => navigate('/recommendations')} leftIcon={<Sparkles size={18} />}>
                Find Recipes
              </Button>
              <Button variant="coral" size="lg" onClick={() => navigate('/assistant')} leftIcon={<MessageCircle size={18} />}>
                Ask ChefAI
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PageWrapper>
        {/* AI Smart Search Bar */}
        <motion.section
          className="mb-10 -mt-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <form onSubmit={handleSearch}>
            <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all group">
              <div className="flex items-center px-5 py-4 gap-4">
                <Search size={20} className="text-blue-500 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Try: Healthy high-protein dinner under 500 calories..."
                  aria-label="Search recipes with AI"
                  className="flex-1 border-0 outline-none text-slate-800 text-base placeholder:text-slate-400 bg-transparent"
                />
                <motion.div
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <Sparkles size={20} className="text-coral-500" />
                </motion.div>
                <Button type="submit" variant="primary" size="md">Search</Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-coral-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
            </div>
          </form>
        </motion.section>

        {/* Quick Filter Chips */}
        <section className="mb-12" aria-label="Quick recipe filters">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {QUICK_FILTER_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                className={[
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                  selectedChip === chip
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-blue-700 border-blue-500 hover:bg-blue-50',
                ].join(' ')}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* Trending Recipes */}
        <section className="mb-14" aria-label="Trending recipes">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-coral-500" />
              <h2 className="font-display text-2xl text-slate-800">Trending Now</h2>
            </div>
            {!loading && recipes.length === 0 && (
              <Button variant="secondary" size="sm" onClick={handleLoadTrending} leftIcon={<Sparkles size={14} />}>
                Load trending
              </Button>
            )}
          </div>
          <RecipeGrid recipes={recipes} loading={loading} skeletonCount={6} />
        </section>

        {/* AI Features Strip */}
        <section className="mb-14" aria-label="AI features">
          <h2 className="font-display text-2xl text-slate-800 mb-6 text-center">
            Your AI-Powered Kitchen Partner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AI_FEATURES.map(({ icon: Icon, iconColor, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={24} className={iconColor} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm" aria-label="How ChefAI works">
          <h2 className="font-display text-2xl text-slate-800 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, icon: Icon, label }) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-coral-500 text-white text-xs font-bold flex items-center justify-center shadow">
                    {step}
                  </span>
                </div>
                <p className="font-medium text-slate-700">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </PageWrapper>
    </div>
  )
}
