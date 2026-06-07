import { useState, useCallback } from 'react'
import { CalendarDays, Sparkles, ShoppingCart, Download, Copy, X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WeeklyGrid } from '../components/meal-planner/WeeklyGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useMealPlanner } from '../hooks/useMealPlanner'
import { DIETARY_OPTIONS, DURATION_OPTIONS, BUDGET_LEVELS, MEAL_TYPES } from '../utils/constants'
import type { MealType } from '../types'

const MEAL_ICONS: Record<MealType, string> = {
  breakfast: '☕',
  lunch:     '☀️',
  dinner:    '🌙',
  snack:     '🍎',
}

export default function MealPlannerPage() {
  const shouldReduceMotion = useReducedMotion()
  const [shoppingOpen, setShoppingOpen] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const {
    mealPlan, isGenerating, error, config, setConfig,
    generatePlan, regenerateSlot, regeneratingSlots,
    generateShoppingList, shoppingList, shoppingListLoading,
    removeSlot, clearPlan,
  } = useMealPlanner()

  const toggleDietary = useCallback((item: string) => {
    const next = config.dietary.includes(item)
      ? config.dietary.filter(d => d !== item)
      : [...config.dietary, item]
    setConfig({ dietary: next })
  }, [config.dietary, setConfig])

  const toggleMeal = useCallback((meal: MealType) => {
    const next = config.includeMeals.includes(meal)
      ? config.includeMeals.filter(m => m !== meal)
      : [...config.includeMeals, meal]
    setConfig({ includeMeals: next })
  }, [config.includeMeals, setConfig])

  const handleOpenShopping = useCallback(async () => {
    setShoppingOpen(true)
    if (!shoppingList) await generateShoppingList()
  }, [shoppingList, generateShoppingList])

  const handleCopyList = useCallback(() => {
    if (!shoppingList) return
    const text = Object.entries(shoppingList)
      .map(([cat, items]) => `${cat.toUpperCase()}\n${items.join('\n')}`)
      .join('\n\n')
    void navigator.clipboard.writeText(text)
  }, [shoppingList])

  const handleDownload = useCallback(() => {
    if (!shoppingList) return
    const text = Object.entries(shoppingList)
      .map(([cat, items]) => `${cat.toUpperCase()}\n${items.join('\n')}`)
      .join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'chefai-shopping-list.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [shoppingList])

  const allItemCount = shoppingList
    ? Object.values(shoppingList).flat().length
    : 0

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <PageWrapper>
        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl text-slate-800 flex items-center gap-3">
              <CalendarDays size={32} className="text-blue-500" />
              AI Meal Planner
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Let ChefAI plan your entire week of perfectly balanced meals
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <Sparkles size={12} className="text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">Powered by Gemini</span>
            </div>
          </div>
          {mealPlan && (
            <Button variant="ghost" size="sm" onClick={clearPlan}>Clear Plan</Button>
          )}
        </div>

        {/* Config Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {/* Duration */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Duration</p>
              <div className="flex gap-2">
                {DURATION_OPTIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setConfig({ days: d })}
                    aria-pressed={config.days === d}
                    className={[
                      'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                      config.days === d
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300',
                    ].join(' ')}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>

            {/* Servings */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Servings</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConfig({ servings: Math.max(1, config.servings - 1) })}
                  aria-label="Decrease servings"
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center font-semibold text-slate-600 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500"
                >-</button>
                <span className="text-sm font-medium w-4 text-center">{config.servings}</span>
                <button
                  onClick={() => setConfig({ servings: Math.min(8, config.servings + 1) })}
                  aria-label="Increase servings"
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center font-semibold text-slate-600 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500"
                >+</button>
              </div>
            </div>

            {/* Budget */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Budget</p>
              <div className="flex gap-2 flex-wrap">
                {BUDGET_LEVELS.map((b, i) => (
                  <button
                    key={b}
                    onClick={() => setConfig({ budget: b })}
                    aria-pressed={config.budget === b}
                    className={[
                      'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                      config.budget === b
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300',
                    ].join(' ')}
                  >
                    {['🪙', '⚖️', '✨'][i]} {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Include Meals */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Include Meals</p>
              <div className="flex flex-wrap gap-2">
                {MEAL_TYPES.map(m => (
                  <button
                    key={m}
                    onClick={() => toggleMeal(m)}
                    aria-pressed={config.includeMeals.includes(m)}
                    className={[
                      'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                      config.includeMeals.includes(m)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300',
                    ].join(' ')}
                  >
                    <span>{MEAL_ICONS[m]}</span>
                    <span className="capitalize">{m}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dietary */}
          <div className="mb-5">
            <p className="text-sm font-medium text-slate-700 mb-2">Dietary Requirements</p>
            <div className="flex flex-wrap gap-2">
              {DIETARY_OPTIONS.map(item => (
                <button
                  key={item}
                  onClick={() => toggleDietary(item)}
                  aria-pressed={config.dietary.includes(item)}
                  className={[
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                    config.dietary.includes(item)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300',
                  ].join(' ')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            loading={isGenerating}
            disabled={config.includeMeals.length === 0}
            leftIcon={<Sparkles size={18} />}
            onClick={() => void generatePlan()}
          >
            {isGenerating ? 'Generating…' : 'Generate Meal Plan'}
          </Button>
        </div>

        {/* Loading overlay */}
        {isGenerating && (
          <div className="text-center py-8">
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-4"
            >
              <Sparkles size={36} className="text-coral-500" />
            </motion.div>
            <p className="text-slate-600 font-medium mb-3">ChefAI is crafting your personalised meal plan…</p>
            <div className="max-w-xs mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}

        {error && !isGenerating && (
          <ErrorState message={error} onRetry={() => void generatePlan()} retryLabel="Try Again" />
        )}

        {!mealPlan && !isGenerating && !error && (
          <EmptyState
            icon={<CalendarDays size={36} />}
            iconColor="blue"
            title="Your week is wide open"
            description="Configure your preferences above and let ChefAI fill your week with balanced meals."
            actionLabel="Generate My Meal Plan"
            onAction={() => void generatePlan()}
          />
        )}

        {(mealPlan || isGenerating) && (
          <>
            <WeeklyGrid
              mealPlan={mealPlan}
              isGenerating={isGenerating}
              includeMeals={config.includeMeals}
              onRegenerate={regenerateSlot}
              onRemove={removeSlot}
              regeneratingSlots={regeneratingSlots}
            />

            {mealPlan && (
              <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                {mealPlan.weeklyNutritionSummary && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 mb-3">Weekly Nutrition Summary</p>
                    <div className="space-y-2">
                      {Object.entries(mealPlan.weeklyNutritionSummary).map(([key, val]) => {
                        const label = key.replace('avg', 'Avg. ').replace(/([A-Z])/g, ' $1')
                        return (
                          <div key={key} className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 w-32 flex-shrink-0">{label}</span>
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                            </div>
                            <span className="text-xs font-medium text-slate-700 w-12 text-right">{val}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<ShoppingCart size={18} />}
                  onClick={() => void handleOpenShopping()}
                  loading={shoppingListLoading}
                >
                  Generate Shopping List
                </Button>
              </div>
            )}
          </>
        )}
      </PageWrapper>

      {/* Shopping List Drawer */}
      <AnimatePresence>
        {shoppingOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShoppingOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={20} className="text-blue-500" />
                  <h2 className="font-display text-lg text-slate-800">Shopping List</h2>
                  {allItemCount > 0 && (
                    <Badge variant="blue">{allItemCount} items</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleCopyList}   aria-label="Copy shopping list"            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"><Copy size={16} /></button>
                  <button onClick={handleDownload}    aria-label="Download shopping list as text" className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"><Download size={16} /></button>
                  <button onClick={() => setShoppingOpen(false)} aria-label="Close shopping list" className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"><X size={16} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {shoppingListLoading && (
                  <div className="text-center py-8">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                      <Sparkles size={28} className="text-blue-500 mx-auto mb-3" />
                    </motion.div>
                    <p className="text-sm text-slate-500">Generating your list…</p>
                  </div>
                )}

                {shoppingList && (Object.entries(shoppingList) as [string, string[]][]).map(([category, items]) => (
                  items?.length > 0 && (
                    <div key={category}>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        {category}
                      </p>
                      <div className="space-y-1">
                        {items.map((item, i) => {
                          const key     = `${category}-${i}`
                          const checked = checkedItems.has(key)
                          return (
                            <button
                              key={i}
                              onClick={() => setCheckedItems(prev => {
                                const next = new Set(prev)
                                next.has(key) ? next.delete(key) : next.add(key)
                                return next
                              })}
                              className={[
                                'w-full flex items-center gap-2.5 text-left text-sm py-1.5 px-2 rounded-lg transition-colors',
                                checked ? 'text-slate-400 line-through' : 'text-slate-700 hover:bg-slate-50',
                              ].join(' ')}
                            >
                              <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                {checked && <span className="text-white text-[10px]">✓</span>}
                              </span>
                              {item}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
