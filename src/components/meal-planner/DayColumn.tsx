import { memo, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MealSlot } from './MealSlot'
import type { MealPlanDay, MealType } from '../../types'

interface Props {
  day:                MealPlanDay
  dayIndex:           number
  includeMeals:       MealType[]
  onRegenerate:       (dayIndex: number, mealType: string) => void
  onRemove:           (dayIndex: number, mealType: string) => void
  regeneratingSlots?: Record<string, boolean>
}

export const DayColumn = memo(function DayColumn({
  day,
  dayIndex,
  includeMeals,
  onRegenerate,
  onRemove,
  regeneratingSlots = {},
}: Props) {
  const shouldReduceMotion = useReducedMotion()

  const handleRegenerate = useCallback((mealType: string) => {
    onRegenerate(dayIndex, mealType)
  }, [dayIndex, onRegenerate])

  const handleRemove = useCallback((mealType: string) => {
    onRemove(dayIndex, mealType)
  }, [dayIndex, onRemove])

  const hasAllMeals = includeMeals.every(m => day.meals?.[m])

  return (
    <motion.div
      className="min-w-[170px] flex-1"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: dayIndex * 0.04 }}
    >
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm text-slate-800">{day.day}</p>
            {day.totalCalories > 0 && (
              <p className="text-[10px] text-slate-400">{day.totalCalories} cal</p>
            )}
          </div>
          {hasAllMeals && (
            <span className="w-2 h-2 rounded-full bg-coral-500 block" aria-label="Day complete" />
          )}
        </div>

        <div className="p-2 space-y-2">
          {includeMeals.map(mealType => (
            <MealSlot
              key={mealType}
              mealType={mealType}
              recipe={day.meals?.[mealType] ?? null}
              onRegenerate={() => handleRegenerate(mealType)}
              onRemove={() => handleRemove(mealType)}
              isRegenerating={!!regeneratingSlots[`${dayIndex}-${mealType}`]}
            />
          ))}
        </div>

        {day.estimatedCost && (
          <div className="px-3 pb-2.5 text-[10px] text-slate-400">
            Est. {day.estimatedCost}
          </div>
        )}
      </div>
    </motion.div>
  )
})
