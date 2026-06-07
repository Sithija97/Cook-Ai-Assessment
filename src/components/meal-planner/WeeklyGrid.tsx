import { memo } from 'react'
import { DayColumn } from './DayColumn'
import { Skeleton } from '../ui/Skeleton'
import type { MealPlan, MealType } from '../../types'

interface Props {
  mealPlan?:          MealPlan | null
  isGenerating?:      boolean
  includeMeals:       MealType[]
  onRegenerate:       (dayIndex: number, mealType: string) => void
  onRemove:           (dayIndex: number, mealType: string) => void
  regeneratingSlots?: Record<string, boolean>
}

export const WeeklyGrid = memo(function WeeklyGrid({
  mealPlan,
  isGenerating = false,
  includeMeals = ['breakfast', 'lunch', 'dinner'],
  onRegenerate,
  onRemove,
  regeneratingSlots = {},
}: Props) {
  if (isGenerating && !mealPlan) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4" role="grid" aria-label="Meal plan grid loading">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="min-w-[170px] flex-1">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-3 py-2.5 border-b border-slate-100">
                <Skeleton className="h-3.5 w-20 mb-1" />
                <Skeleton className="h-2.5 w-14" />
              </div>
              <div className="p-2 space-y-2">
                {includeMeals.map(m => (
                  <div key={m} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                    <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <Skeleton className="h-2.5 w-16" />
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
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!mealPlan?.days?.length) return null

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-4"
      role="grid"
      aria-label="Weekly meal plan grid"
    >
      {mealPlan.days.map((day, idx) => (
        <DayColumn
          key={day.day}
          day={day}
          dayIndex={idx}
          includeMeals={includeMeals}
          onRegenerate={onRegenerate}
          onRemove={onRemove}
          regeneratingSlots={regeneratingSlots}
        />
      ))}
    </div>
  )
})
