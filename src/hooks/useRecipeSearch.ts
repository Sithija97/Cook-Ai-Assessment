import { useState, useCallback } from 'react'
import { streamRecipes, streamSmartSearch } from '../services/gemini'
import { useStreamingJSON } from './useStreamingJSON'
import { logger } from '../utils/logger'
import type { Recipe } from '../types'
import type { SortValue } from '../utils/constants'
import type { RecipeParams } from '../utils/promptTemplates'

interface SearchParams extends RecipeParams {
  query?: string
}

export function useRecipeSearch() {
  const [filters, setFilters] = useState<SearchParams>({
    ingredients: [],
    dietary:     [],
    cookingTime: 60,
    servings:    4,
    cravings:    '',
  })
  const [sortBy, setSortBy] = useState<SortValue>('relevance')

  const {
    streamedItems: recipes,
    isStreaming:   loading,
    error,
    start,
    cancel,
  } = useStreamingJSON<Recipe, [SearchParams]>({
    streamFn: async function* (params: SearchParams): AsyncGenerator<string> {
      if (params.query) {
        yield* streamSmartSearch(params.query)
      } else {
        yield* streamRecipes(params)
      }
    },
    parseStrategy: 'array-items',
    onError: (err) => logger.error('Recipe search stream error:', err),
  })

  const setFilter = useCallback(<K extends keyof SearchParams>(key: K, value: SearchParams[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const search = useCallback((overrides: Partial<SearchParams> = {}) => {
    const params: SearchParams = { ...filters, ...overrides }
    return start(params)
  }, [filters, start])

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'time-asc')     return (a.totalTime || 0) - (b.totalTime || 0)
    if (sortBy === 'calories-asc') return (a.calories  || 0) - (b.calories  || 0)
    if (sortBy === 'difficulty') {
      const order: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 }
      return (order[a.difficulty] ?? 0) - (order[b.difficulty] ?? 0)
    }
    return 0
  })

  return {
    recipes: sortedRecipes,
    loading,
    error,
    filters,
    setFilter,
    search,
    retry:    () => search(),
    sortBy,
    setSortBy,
    cancel,
  }
}
