import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Flame, Users, Heart, ArrowRight } from 'lucide-react'
import { RecipeImagePlaceholder } from './RecipeImagePlaceholder'
import { DifficultyBadge } from './DifficultyBadge'
import { Badge } from '../ui/Badge'
import { useFavorites } from '../../hooks/useFavorites'
import type { Recipe } from '../../types'

interface Props {
  recipe:     Recipe
  className?: string
}

export const RecipeCard = memo(function RecipeCard({ recipe, className = '' }: Props) {
  const navigate           = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()
  const shouldReduceMotion = useReducedMotion()
  const favorited          = isFavorite(recipe.id)

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(recipe)
  }, [recipe, toggleFavorite])

  const handleView = useCallback(() => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } })
  }, [navigate, recipe])

  return (
    <motion.article
      className={[
        'bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer',
        'border-l-4 border-l-coral-500 h-full flex flex-col',
        favorited ? 'bg-coral-50 border-coral-100' : '',
        className,
      ].join(' ')}
      whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onClick={handleView}
      role="article"
      aria-label={`Recipe: ${recipe.name}`}
    >
      <RecipeImagePlaceholder
        iconName={recipe.imageIcon}
        cuisine={recipe.cuisine}
        difficulty={recipe.difficulty}
        size="sm"
      />

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-lg text-slate-800 mb-1 leading-tight line-clamp-2">
          {recipe.name}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
          {recipe.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-blue-500" />
            {recipe.totalTime ?? recipe.cookingTime}m
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} className="text-coral-500" />
            {recipe.calories} cal
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-blue-500" />
            {recipe.servings}
          </span>
          <DifficultyBadge difficulty={recipe.difficulty} />
        </div>

        {recipe.dietary?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {recipe.dietary.slice(0, 3).map(tag => (
              <Badge key={tag} variant="blue">{tag}</Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-1 mt-auto">
          <motion.button
            onClick={handleFavorite}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="p-2 rounded-lg hover:bg-coral-50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
            whileTap={shouldReduceMotion ? {} : { scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Heart
              size={18}
              className={favorited ? 'text-coral-500 fill-coral-500' : 'text-slate-400'}
            />
          </motion.button>

          <button
            onClick={handleView}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            View Recipe
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.article>
  )
})
