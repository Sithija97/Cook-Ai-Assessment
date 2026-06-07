import { useState, useCallback } from 'react'
import { useMealPlannerStore } from '../store/mealPlannerStore'
import { streamMealPlan, regenerateMealSlot, generateShoppingList } from '../services/gemini'
import { parseGeminiJSON } from '../utils/recipeParser'
import { logger } from '../utils/logger'
import { toast } from '../utils/toast'
import type { MealPlan, ShoppingList } from '../types'

export function useMealPlanner() {
  const store = useMealPlannerStore()
  const [shoppingList, setShoppingList]         = useState<ShoppingList | null>(null)
  const [shoppingListLoading, setShoppingListLoading] = useState(false)
  const [regeneratingSlots, setRegeneratingSlots]     = useState<Record<string, boolean>>({})

  const generatePlan = useCallback(async () => {
    store.setGenerating(true)
    store.setError(null)
    store.setMealPlan(null)

    let buffer = ''
    try {
      const gen = streamMealPlan(store.config)
      for await (const chunk of gen) {
        buffer += chunk
      }
      const plan = parseGeminiJSON(buffer) as MealPlan
      store.setMealPlan(plan)
      store.setGenerating(false)
    } catch (err) {
      logger.error('Meal plan generation error:', err)
      const msg = err instanceof Error ? err.message : "ChefAI couldn't build your meal plan — please try again."
      store.setError(msg)
      toast.error(msg)
    }
  }, [store])

  const regenerateSlot = useCallback(async (dayIndex: number, mealType: string) => {
    const key = `${dayIndex}-${mealType}`
    setRegeneratingSlots(prev => ({ ...prev, [key]: true }))
    try {
      const day    = store.mealPlan?.days?.[dayIndex]
      const recipe = await regenerateMealSlot(day?.day || 'Monday', mealType, store.config.dietary)
      store.updateMealSlot(dayIndex, mealType, recipe)
    } catch (err) {
      logger.error('Regenerate slot error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to regenerate meal — please try again.')
    } finally {
      setRegeneratingSlots(prev => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }, [store])

  const fetchShoppingList = useCallback(async () => {
    if (!store.mealPlan) return
    setShoppingListLoading(true)
    try {
      const list = await generateShoppingList(store.mealPlan)
      setShoppingList(list)
    } catch (err) {
      logger.error('Shopping list error:', err)
      toast.error(err instanceof Error ? err.message : "Couldn't generate shopping list — please try again.")
    } finally {
      setShoppingListLoading(false)
    }
  }, [store.mealPlan])

  return {
    mealPlan:            store.mealPlan,
    isGenerating:        store.isGenerating,
    error:               store.error,
    config:              store.config,
    setConfig:           store.setConfig,
    generatePlan,
    regenerateSlot,
    regeneratingSlots,
    generateShoppingList: fetchShoppingList,
    shoppingList,
    shoppingListLoading,
    updateSlot:          store.updateMealSlot,
    removeSlot:          store.removeMealSlot,
    clearPlan:           store.clearPlan,
  }
}
