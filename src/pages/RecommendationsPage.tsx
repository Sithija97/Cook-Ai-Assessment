import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, SlidersHorizontal, ChefHat } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageWrapper } from '../components/layout/PageWrapper'
import { RecipeGrid } from '../components/recipe/RecipeGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { Button } from '../components/ui/Button'
import { TagInput } from '../components/ui/TagInput'
import { Modal } from '../components/ui/Modal'
import { useRecipeSearch } from '../hooks/useRecipeSearch'
import { DIETARY_OPTIONS, SORT_OPTIONS } from '../utils/constants'

export default function RecommendationsPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const { recipes, loading, error, filters, setFilter, search, retry, sortBy, setSortBy } = useRecipeSearch()

  useEffect(() => {
    if (initialQuery) {
      setFilter('cravings', initialQuery)
      void search({ query: initialQuery })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  useEffect(() => {
    if (!loading && recipes.length > 0) {
      setMobileFilterOpen(false)
    }
  }, [loading, recipes.length])

  const handleGenerate = useCallback(() => {
    void search()
  }, [search])

  const toggleDietary = useCallback((item: string) => {
    const next = filters.dietary.includes(item)
      ? filters.dietary.filter(d => d !== item)
      : [...filters.dietary, item]
    setFilter('dietary', next)
  }, [filters.dietary, setFilter])

  const FilterPanel = (
    <aside className="space-y-6" aria-label="Recipe filters">
      <div>
        <TagInput
          label="Ingredients Available"
          tags={filters.ingredients}
          onChange={v => setFilter('ingredients', v)}
          placeholder="e.g. chicken, broccoli, garlic"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Dietary Preferences</p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map(item => (
            <button
              key={item}
              onClick={() => toggleDietary(item)}
              aria-pressed={filters.dietary.includes(item)}
              className={[
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                filters.dietary.includes(item)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300',
              ].join(' ')}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="cook-time" className="text-sm font-medium text-slate-700 block mb-2">
          Max Cooking Time: <span className="text-blue-600">{filters.cookingTime} min</span>
        </label>
        <input
          id="cook-time"
          type="range"
          min={10}
          max={120}
          step={5}
          value={filters.cookingTime}
          onChange={e => setFilter('cookingTime', Number(e.target.value))}
          className="w-full accent-blue-500"
          aria-valuemin={10}
          aria-valuemax={120}
          aria-valuenow={filters.cookingTime}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>10m</span><span>120m</span>
        </div>
      </div>

      <div>
        <label htmlFor="cravings" className="text-sm font-medium text-slate-700 block mb-1.5">
          Craving / Mood
        </label>
        <input
          id="cravings"
          type="text"
          value={filters.cravings}
          onChange={e => setFilter('cravings', e.target.value)}
          placeholder="e.g. something spicy and comforting"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="servings" className="text-sm font-medium text-slate-700 block mb-1.5">
          Servings
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilter('servings', Math.max(1, filters.servings - 1))}
            aria-label="Decrease servings"
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500 font-semibold"
          >-</button>
          <span id="servings" className="text-sm font-medium w-4 text-center">{filters.servings}</span>
          <button
            onClick={() => setFilter('servings', Math.min(8, filters.servings + 1))}
            aria-label="Increase servings"
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500 font-semibold"
          >+</button>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleGenerate}
        loading={loading}
        leftIcon={<Sparkles size={16} />}
      >
        Generate Recipes
      </Button>
    </aside>
  )

  return (
    <PageWrapper>
      <div className="flex gap-8">
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-24">
            {FilterPanel}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="font-display text-2xl text-slate-800 flex items-center gap-2">
                AI-Generated Recipes
                {recipes.length > 0 && (
                  <span className="inline-flex items-center rounded-full bg-coral-500 text-white text-xs font-semibold px-2.5 py-0.5">
                    {recipes.length}
                  </span>
                )}
              </h1>
              {recipes.length > 0 && (
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Sparkles size={11} className="text-blue-500" />
                  Powered by Gemini
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {recipes.length > 0 && (
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="Sort recipes"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              )}

              <button
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() => setMobileFilterOpen(true)}
                aria-label="Open filters"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>
          </div>

          {loading && (
            <motion.div
              className="flex items-center gap-2 mb-4 text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <Sparkles size={14} />
              </motion.div>
              ChefAI is generating your recipes...
            </motion.div>
          )}

          {error && !loading ? (
            <ErrorState message={error} onRetry={retry} />
          ) : recipes.length === 0 && !loading ? (
            <EmptyState
              icon={<ChefHat size={36} />}
              iconColor="blue"
              title="What are you craving today?"
              description="Set your preferences and let ChefAI craft the perfect recipes for you."
              actionLabel="Set Your Preferences"
              onAction={() => setMobileFilterOpen(true)}
            />
          ) : (
            <RecipeGrid recipes={recipes} loading={loading} skeletonCount={6} />
          )}
        </div>
      </div>

      <Modal
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Recipes"
        size="md"
      >
        {FilterPanel}
      </Modal>
    </PageWrapper>
  )
}
