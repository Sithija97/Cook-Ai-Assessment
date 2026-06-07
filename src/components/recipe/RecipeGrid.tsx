import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { RecipeCard } from './RecipeCard'
import { RecipeCardSkeleton } from './RecipeCardSkeleton'
import type { Recipe } from '../../types'

const containerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.05 } },
}
const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

interface Props {
  recipes?:       Recipe[]
  loading?:       boolean
  skeletonCount?: number
}

export const RecipeGrid = memo(function RecipeGrid({ recipes = [], loading = false, skeletonCount = 6 }: Props) {
  const shouldReduceMotion = useReducedMotion()

  if (loading && recipes.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-busy="true" aria-live="polite">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      variants={shouldReduceMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      aria-live="polite"
    >
      {recipes.map(recipe => (
        <motion.div key={recipe.id} variants={shouldReduceMotion ? {} : itemVariants} className="flex flex-col">
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
      {loading && recipes.length > 0 && Array.from({ length: Math.max(0, skeletonCount - recipes.length) }).map((_, i) => (
        <RecipeCardSkeleton key={`skel-${i}`} />
      ))}
    </motion.div>
  )
})
