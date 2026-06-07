import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../utils/constants'
import type { Recipe } from '../types'

interface FavoritesState {
  favorites:      Recipe[]
  addFavorite:    (recipe: Recipe) => void
  removeFavorite: (id: string) => void
  toggleFavorite: (recipe: Recipe) => void
  isFavorite:     (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (recipe) =>
        set((state) => ({
          favorites: state.favorites.some(f => f.id === recipe.id)
            ? state.favorites
            : [recipe, ...state.favorites],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(f => f.id !== id),
        })),

      toggleFavorite: (recipe) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(recipe.id)) {
          removeFavorite(recipe.id)
        } else {
          addFavorite(recipe)
        }
      },

      isFavorite: (id) => get().favorites.some(f => f.id === id),
    }),
    { name: STORAGE_KEYS.FAVORITES },
  ),
)
