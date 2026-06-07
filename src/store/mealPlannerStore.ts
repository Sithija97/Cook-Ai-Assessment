import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../utils/constants'
import type { MealPlan, MealPlanConfig, Recipe } from '../types'

interface MealPlannerState {
  mealPlan:         MealPlan | null
  isGenerating:     boolean
  error:            string | null
  config:           MealPlanConfig
  setMealPlan:      (plan: MealPlan | null) => void
  setConfig:        (partial: Partial<MealPlanConfig>) => void
  updateMealSlot:   (dayIndex: number, mealType: string, recipe: Recipe) => void
  removeMealSlot:   (dayIndex: number, mealType: string) => void
  clearPlan:        () => void
  setGenerating:    (bool: boolean) => void
  setError:         (msg: string | null) => void
}

export const useMealPlannerStore = create<MealPlannerState>()(
  persist(
    (set) => ({
      mealPlan:     null,
      isGenerating: false,
      error:        null,
      config: {
        days:         7,
        servings:     2,
        dietary:      [],
        budget:       'Moderate',
        includeMeals: ['breakfast', 'lunch', 'dinner'],
      },

      setMealPlan: (plan) => set({ mealPlan: plan, error: null }),

      setConfig: (partial) =>
        set((state) => ({ config: { ...state.config, ...partial } })),

      updateMealSlot: (dayIndex, mealType, recipe) =>
        set((state) => {
          if (!state.mealPlan) return state
          const days = state.mealPlan.days.map((day, i) => {
            if (i !== dayIndex) return day
            return {
              ...day,
              meals: { ...day.meals, [mealType]: recipe },
            }
          })
          return { mealPlan: { ...state.mealPlan, days } }
        }),

      removeMealSlot: (dayIndex, mealType) =>
        set((state) => {
          if (!state.mealPlan) return state
          const days = state.mealPlan.days.map((day, i) => {
            if (i !== dayIndex) return day
            const meals = { ...day.meals }
            delete meals[mealType as keyof typeof meals]
            return { ...day, meals }
          })
          return { mealPlan: { ...state.mealPlan, days } }
        }),

      clearPlan:    () => set({ mealPlan: null, error: null }),
      setGenerating: (bool) => set({ isGenerating: bool }),
      setError:      (msg) => set({ error: msg, isGenerating: false }),
    }),
    { name: STORAGE_KEYS.MEAL_PLAN },
  ),
)
