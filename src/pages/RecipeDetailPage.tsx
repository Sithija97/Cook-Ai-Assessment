import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Clock, Flame, Users, Globe, ShoppingCart, ListOrdered, Activity,
  Sparkles, Heart, MessageCircle, CalendarPlus, Copy, CheckSquare, Square,
} from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { RecipeImagePlaceholder } from '../components/recipe/RecipeImagePlaceholder'
import { DifficultyBadge } from '../components/recipe/DifficultyBadge'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ErrorState } from '../components/ui/ErrorState'
import { Modal } from '../components/ui/Modal'
import { useFavorites } from '../hooks/useFavorites'
import { useGemini } from '../hooks/useGemini'
import { generateRecipeDetail } from '../services/gemini'
import { useMealPlannerStore } from '../store/mealPlannerStore'
import { MEAL_TYPES } from '../utils/constants'
import type { Recipe } from '../types'

interface SkProps {
  className?: string
  style?:     React.CSSProperties
}

const Sk = ({ className = '', style }: SkProps) => (
  <div className={['bg-slate-200 rounded', className].join(' ')} style={style} aria-hidden="true" />
)

function DetailSkeleton() {
  const badgeWidths   = [80, 80, 72, 76, 72, 64]
  const ingredientRows: [number, number][] = [
    [40, 160], [56, 120], [48, 148],
    [64, 130], [40, 160], [52, 110],
  ]
  const instructionRows: [string, string, boolean][] = [
    ['w-full', 'w-4/5', true],
    ['w-full', 'w-3/4', false],
    ['w-full', 'w-full', true],
    ['w-full', 'w-2/3', false],
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
      <div className="flex-1 min-w-0 space-y-6">
        <Sk className="h-52 rounded-xl" />
        <div className="space-y-3">
          <Sk className="h-10 w-3/4 rounded-lg" />
          <Sk className="h-4 w-full" />
          <Sk className="h-4 w-4/5" />
          <div className="flex flex-wrap gap-2 pt-1">
            {badgeWidths.map((w, i) => (
              <Sk key={i} className="h-6 rounded-full" style={{ width: w }} />
            ))}
          </div>
          <div className="flex gap-2">
            <Sk className="h-6 w-20 rounded-full" />
            <Sk className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sk className="h-5 w-5" /><Sk className="h-6 w-28 rounded" />
            </div>
            <div className="flex gap-3">
              <Sk className="h-4 w-16 rounded" /><Sk className="h-4 w-16 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            {ingredientRows.map(([amtW, nameW], i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white">
                <Sk className="h-4 w-4 flex-shrink-0" />
                <Sk className="h-4 rounded" style={{ width: amtW }} />
                <Sk className="h-4 rounded" style={{ width: nameW }} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sk className="h-5 w-5" /><Sk className="h-6 w-28 rounded" />
          </div>
          <Sk className="h-1.5 w-full rounded-full" />
          <div className="space-y-3">
            {instructionRows.map(([l1, l2, hasDuration], i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white">
                <Sk className="h-8 w-8 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Sk className={`h-4 rounded ${l1}`} />
                  <Sk className={`h-4 rounded ${l2}`} />
                  {hasDuration && <Sk className="h-5 w-16 rounded-full mt-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-80 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sk className="h-5 w-5" /><Sk className="h-5 w-36 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-slate-50 rounded-lg p-3 space-y-1.5 flex flex-col items-center">
                <Sk className="h-6 w-12 rounded" />
                <Sk className="h-3 w-10 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl border border-slate-100 border-l-4 border-l-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Sk className="h-5 w-5" /><Sk className="h-5 w-24 rounded" />
          </div>
          <div className="space-y-2.5">
            {['w-full', 'w-11/12', 'w-3/4'].map((w, i) => (
              <div key={i} className="flex gap-2 items-start">
                <Sk className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0" />
                <Sk className={`h-4 rounded ${w}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Sk className="h-11 w-full rounded-lg" />
          <Sk className="h-11 w-full rounded-lg" />
          <Sk className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default function RecipeDetailPage() {
  const { id }           = useParams<{ id: string }>()
  const location         = useLocation()
  const navigate         = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()
  const mealPlannerStore = useMealPlannerStore()

  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())
  const [completedSteps, setCompletedSteps]         = useState<Set<number>>(new Set())
  const [addToPlanOpen, setAddToPlanOpen]           = useState(false)
  const [planDay, setPlanDay]   = useState(0)
  const [planMeal, setPlanMeal] = useState('dinner')
  const [copied, setCopied]     = useState(false)

  const genFn = useCallback((...args: unknown[]): Promise<Recipe> => {
    const [slug, name] = args as [string, string]
    return generateRecipeDetail(slug, name)
  }, [])

  const { data: recipe, error, execute, retry } = useGemini<Recipe>(genFn)

  const stateRecipe     = (location.state as { recipe?: Recipe } | null)?.recipe
  const effectiveRecipe = recipe || stateRecipe

  useEffect(() => {
    const name = stateRecipe?.name || (id ?? '').replace(/-/g, ' ')
    void execute(id ?? '', name)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const toggleIngredient = useCallback((idx: number) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }, [])

  const toggleStep = useCallback((idx: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }, [])

  const selectAll = useCallback(() => {
    if (!effectiveRecipe?.ingredients) return
    setCheckedIngredients(new Set(effectiveRecipe.ingredients.map((_, i) => i)))
  }, [effectiveRecipe])

  const copyAll = useCallback(() => {
    if (!effectiveRecipe?.ingredients) return
    const text = effectiveRecipe.ingredients
      .map(i => `${i.amount} ${i.item}${i.notes ? ` (${i.notes})` : ''}`)
      .join('\n')
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [effectiveRecipe])

  const stepProgress = useMemo(() => {
    if (!effectiveRecipe?.instructions?.length) return 0
    return completedSteps.size / effectiveRecipe.instructions.length
  }, [completedSteps, effectiveRecipe])

  const addToMealPlan = useCallback(() => {
    if (effectiveRecipe && mealPlannerStore.mealPlan) {
      mealPlannerStore.updateMealSlot(planDay, planMeal, effectiveRecipe)
    }
    setAddToPlanOpen(false)
  }, [effectiveRecipe, mealPlannerStore, planDay, planMeal])

  const favorited = effectiveRecipe ? isFavorite(effectiveRecipe.id) : false

  if (error && !effectiveRecipe) {
    return (
      <PageWrapper>
        <ErrorState message={error} onRetry={retry} />
      </PageWrapper>
    )
  }

  if (!recipe) {
    return <PageWrapper><DetailSkeleton /></PageWrapper>
  }

  if (!effectiveRecipe) return null

  return (
    <PageWrapper>
      <motion.div
        className="flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Left Column */}
        <div className="flex-1 min-w-0 space-y-6">
          <RecipeImagePlaceholder
            iconName={effectiveRecipe.imageIcon}
            cuisine={effectiveRecipe.cuisine}
            name={effectiveRecipe.name}
            size="lg"
          />

          <div>
            <h1 className="font-display text-4xl text-slate-900 leading-tight mb-3">
              {effectiveRecipe.name}
            </h1>
            <p className="text-slate-500 leading-relaxed mb-4">{effectiveRecipe.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="blue"><Clock size={11} /> Prep {effectiveRecipe.prepTime}m</Badge>
              <Badge variant="blue"><Clock size={11} /> Cook {effectiveRecipe.cookingTime}m</Badge>
              <Badge variant="coral"><Flame size={11} /> {effectiveRecipe.calories} cal</Badge>
              <Badge variant="gray"><Users size={11} /> {effectiveRecipe.servings} servings</Badge>
              <Badge variant="gray"><Globe size={11} /> {effectiveRecipe.cuisine}</Badge>
              <DifficultyBadge difficulty={effectiveRecipe.difficulty} />
            </div>

            {effectiveRecipe.dietary?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {effectiveRecipe.dietary.map(d => <Badge key={d} variant="green">{d}</Badge>)}
              </div>
            )}
          </div>

          {/* Ingredients */}
          <section aria-label="Ingredients">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-slate-800 flex items-center gap-2">
                <ShoppingCart size={20} className="text-blue-500" />
                Ingredients
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                >
                  Select All
                </button>
                <button
                  onClick={copyAll}
                  aria-label="Copy all ingredients"
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                >
                  <Copy size={12} />
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {effectiveRecipe.ingredients?.map((ing, i) => (
                <button
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  aria-label={`${checkedIngredients.has(i) ? 'Uncheck' : 'Check'} ${ing.item}`}
                  className={[
                    'w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                    checkedIngredients.has(i)
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 hover:border-blue-200',
                  ].join(' ')}
                >
                  {checkedIngredients.has(i)
                    ? <CheckSquare size={16} className="text-blue-500 flex-shrink-0" />
                    : <Square size={16} className="text-slate-300 flex-shrink-0" />
                  }
                  <span className={`text-sm flex-1 ${checkedIngredients.has(i) ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    <span className="font-medium">{ing.amount}</span> {ing.item}
                    {ing.notes && <span className="text-slate-400"> — {ing.notes}</span>}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section aria-label="Cooking instructions">
            <div className="flex items-center gap-2 mb-2">
              <ListOrdered size={20} className="text-blue-500" />
              <h2 className="font-display text-xl text-slate-800">Instructions</h2>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full mb-5 overflow-hidden" aria-label={`${Math.round(stepProgress * 100)}% complete`}>
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${stepProgress * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              />
            </div>
            <div className="space-y-3">
              {effectiveRecipe.instructions?.map((step, i) => (
                <button
                  key={i}
                  onClick={() => toggleStep(i)}
                  aria-label={`${completedSteps.has(i) ? 'Mark incomplete' : 'Mark complete'} step ${step.step}`}
                  className={[
                    'w-full flex gap-4 p-4 rounded-xl border text-left transition-all focus-visible:ring-2 focus-visible:ring-blue-500',
                    completedSteps.has(i)
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-slate-200 hover:border-blue-200',
                  ].join(' ')}
                >
                  <div className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors',
                    completedSteps.has(i) ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600',
                  ].join(' ')}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm leading-relaxed ${completedSteps.has(i) ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {step.instruction}
                    </p>
                    {step.duration && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 bg-blue-50 rounded-full px-2 py-0.5 mt-1.5">
                        <Clock size={10} /> {step.duration}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:w-80 flex-shrink-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
            <h3 className="font-display text-lg text-slate-800 flex items-center gap-2 mb-4">
              <Activity size={18} className="text-blue-500" />
              Nutrition per serving
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {effectiveRecipe.nutrition && Object.entries(effectiveRecipe.nutrition).map(([key, val]) => (
                <div key={key} className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-semibold text-slate-800">{val}</p>
                  <p className="text-xs text-slate-500 capitalize">{key}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-coral-50 rounded-xl border border-coral-100 border-l-4 border-l-coral-500 p-5">
            <h3 className="font-display text-lg text-slate-800 flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-coral-500" />
              ChefAI Tips
            </h3>
            <ul className="space-y-2">
              {effectiveRecipe.aiTips?.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500 mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
              <Sparkles size={10} /> Generated by Gemini AI
            </p>
          </div>

          <div className="space-y-3">
            <motion.button
              onClick={() => effectiveRecipe && toggleFavorite(effectiveRecipe)}
              aria-label={favorited ? 'Remove from favorites' : 'Save recipe to favorites'}
              className={[
                'w-full flex items-center justify-center gap-2 h-11 rounded-lg border font-medium text-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-500',
                favorited
                  ? 'bg-coral-50 border-coral-200 text-coral-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-coral-300 hover:text-coral-500',
              ].join(' ')}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Heart size={18} className={favorited ? 'fill-coral-500 text-coral-500' : ''} />
              {favorited ? 'Saved' : 'Save Recipe'}
            </motion.button>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              leftIcon={<MessageCircle size={16} />}
              onClick={() => navigate(`/assistant?recipe=${encodeURIComponent(effectiveRecipe.name)}`)}
            >
              Ask ChefAI about this recipe
            </Button>

            <Button
              variant="coral-outline"
              size="md"
              className="w-full"
              leftIcon={<CalendarPlus size={16} />}
              onClick={() => setAddToPlanOpen(true)}
            >
              Add to Meal Plan
            </Button>
          </div>
        </div>
      </motion.div>

      <Modal
        open={addToPlanOpen}
        onClose={() => setAddToPlanOpen(false)}
        title="Add to Meal Plan"
        size="sm"
      >
        {!mealPlannerStore.mealPlan ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-500">No meal plan yet. Generate one first!</p>
            <Button variant="primary" onClick={() => { setAddToPlanOpen(false); navigate('/meal-planner') }}>
              Go to Meal Planner
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="plan-day" className="block text-sm font-medium text-slate-700 mb-1.5">Day</label>
              <select
                id="plan-day"
                value={planDay}
                onChange={e => setPlanDay(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
              >
                {mealPlannerStore.mealPlan.days?.map((d, i) => (
                  <option key={i} value={i}>{d.day}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="plan-meal" className="block text-sm font-medium text-slate-700 mb-1.5">Meal</label>
              <select
                id="plan-meal"
                value={planMeal}
                onChange={e => setPlanMeal(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
              >
                {MEAL_TYPES.map(m => <option key={m} value={m} className="capitalize">{m}</option>)}
              </select>
            </div>
            <Button variant="primary" className="w-full" onClick={addToMealPlan}>
              Add to Plan
            </Button>
          </div>
        )}
      </Modal>
    </PageWrapper>
  )
}
