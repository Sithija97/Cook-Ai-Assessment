import { useCallback } from 'react'
import { useFavoritesStore } from '../store/favoritesStore'
import type { Recipe } from '../types'

export function useFavorites() {
  const favorites      = useFavoritesStore(s => s.favorites)
  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite)
  const isFavorite     = useFavoritesStore(s => s.isFavorite)

  const toggle = useCallback((recipe: Recipe) => {
    toggleFavorite(recipe)
  }, [toggleFavorite])

  return { favorites, toggleFavorite: toggle, isFavorite }
}
