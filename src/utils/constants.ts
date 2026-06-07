import type { MealType } from '../types'

export const GEMINI_MODEL = 'gemini-3.1-flash-lite'

export const DIETARY_OPTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
  'Keto', 'Paleo', 'Halal', 'Nut-Free', 'Low-Sodium',
] as const

export const QUICK_FILTER_CHIPS = [
  'Quick & Easy', 'Vegetarian', 'Under 30 min', 'High Protein',
  'Keto', 'Vegan', 'Comfort Food', 'Breakfast', 'Low Carb', 'Mediterranean',
] as const

export const MEAL_TYPES: readonly MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']

export const MEAL_TYPE_ICONS: Record<MealType, string> = {
  breakfast: 'Coffee',
  lunch: 'Sun',
  dinner: 'Moon',
  snack: 'Apple',
}

export const BUDGET_LEVELS = ['Budget', 'Moderate', 'Premium'] as const
export type BudgetLevel = typeof BUDGET_LEVELS[number]

export const DURATION_OPTIONS = [3, 5, 7] as const

export const SORT_OPTIONS = [
  { value: 'relevance',    label: 'Relevance'       },
  { value: 'time-asc',    label: 'Cooking Time ↑'  },
  { value: 'calories-asc', label: 'Calories ↑'     },
  { value: 'difficulty',  label: 'Difficulty'       },
] as const
export type SortValue = typeof SORT_OPTIONS[number]['value']

export const IMAGE_ICON_MAP = {
  'chef-hat': 'ChefHat',
  'utensils': 'Utensils',
  'salad':    'Salad',
  'soup':     'Soup',
  'sandwich': 'Sandwich',
  'pizza':    'Pizza',
  'fish':     'Fish',
  'egg':      'Egg',
  'coffee':   'Coffee',
} as const

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; text: string; border: string }> = {
  Easy:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Medium: { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200'   },
  Hard:   { bg: 'bg-coral-50',   text: 'text-coral-700',   border: 'border-coral-100'   },
}

export const CHAT_MAX_MESSAGES = 50
export const CHAT_MAX_CHARS    = 500
export const DEBOUNCE_DELAY_MS = 300
export const AUTO_RETRY_DELAY_MS = 1000

export const STORAGE_KEYS = {
  FAVORITES: 'chefai_favorites',
  MEAL_PLAN: 'chefai_mealplan',
  CHAT:      'chefai_chat',
} as const

export const SUGGESTED_PROMPTS = [
  'What can I substitute for eggs in baking?',
  'How do I know when oil is hot enough to fry?',
  "What's the healthiest way to cook vegetables?",
  'Give me a quick 15-minute dinner idea',
] as const
