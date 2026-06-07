import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, RefreshCw, X, PlusCircle, Clock, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { RecipeImagePlaceholder } from '../recipe/RecipeImagePlaceholder'
import { Skeleton } from '../ui/Skeleton'
import type { Recipe } from '../../types'

type MealTypeKey = 'breakfast' | 'lunch' | 'dinner' | 'snack'

const mealTypeLabel: Record<MealTypeKey, string> = {
  breakfast: 'Breakfast',
  lunch:     'Lunch',
  dinner:    'Dinner',
  snack:     'Snack',
}

interface Props {
  mealType:       string
  recipe:         Recipe | null
  onRegenerate:   () => void
  onRemove:       () => void
  isRegenerating?: boolean
}

export const MealSlot = memo(function MealSlot({
  mealType,
  recipe,
  onRegenerate,
  onRemove,
  isRegenerating = false,
}: Props) {
  const navigate = useNavigate()
  const label    = mealTypeLabel[mealType as MealTypeKey] ?? mealType

  const handleView = useCallback(() => {
    if (recipe) navigate(`/recipe/${recipe.id}`, { state: { recipe } })
  }, [navigate, recipe])

  if (isRegenerating) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">{label}</span>
          <div className="flex gap-1">
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-3 w-3 rounded" />
          </div>
        </div>
        <div className="p-2">
          <div className="flex gap-2 mb-1.5">
            <Skeleton className="w-10 h-10 rounded flex-shrink-0" />
            <div className="flex-1 space-y-1.5 pt-0.5">
              <Skeleton className="h-2.5 w-full" />
              <Skeleton className="h-2.5 w-3/4" />
            </div>
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-3.5 w-12 rounded-full" />
            <Skeleton className="h-3.5 w-10 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-blue-50/40 overflow-hidden">
        <div className="p-2 border-b border-slate-100 bg-white/50">
          <span className="text-xs font-medium text-slate-400">{label}</span>
        </div>
        <button
          onClick={onRegenerate}
          className="w-full flex flex-col items-center justify-center gap-1 py-4 text-slate-400 hover:text-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded-b-lg"
          aria-label={`Add ${mealType} for this day`}
        >
          <PlusCircle size={20} />
          <span className="text-xs">Add meal</span>
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden hover:border-blue-200 transition-colors">
      <div className="p-2 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <div className="flex gap-1">
          <button
            onClick={handleView}
            aria-label={`View recipe: ${recipe.name}`}
            className="p-1 text-slate-400 hover:text-blue-500 transition-colors rounded focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            <ExternalLink size={11} />
          </button>
          <button
            onClick={onRegenerate}
            aria-label={`Regenerate ${mealType}`}
            className="p-1 text-slate-400 hover:text-blue-500 transition-colors rounded focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            <RefreshCw size={11} />
          </button>
          <button
            onClick={onRemove}
            aria-label={`Remove ${mealType}`}
            className="p-1 text-slate-400 hover:text-red-400 transition-colors rounded focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            <X size={11} />
          </button>
        </div>
      </div>

      <div className="p-2">
        <div className="flex gap-2 mb-1.5">
          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
            <RecipeImagePlaceholder iconName={recipe.imageIcon} cuisine={recipe.cuisine} name={recipe.name} size="xs" />
          </div>
          <p className="font-display text-xs leading-tight text-slate-800 line-clamp-2 flex-1">
            {recipe.name}
          </p>
        </div>
        <div className="flex gap-1.5">
          {recipe.calories && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-coral-50 text-coral-700 text-[10px] px-2 py-0.5">
              <Flame size={8} /> {recipe.calories}
            </span>
          )}
          {recipe.totalTime && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5">
              <Clock size={8} /> {recipe.totalTime}m
            </span>
          )}
        </div>
      </div>
    </div>
  )
})

// Re-export for motion usage
export { motion }
