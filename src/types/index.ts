export interface Ingredient {
  item: string
  amount: string
  notes?: string
}

export interface InstructionStep {
  step: number
  instruction: string
  duration?: string
}

export interface Nutrition {
  protein: string
  carbs: string
  fat: string
  fiber: string
}

export interface Recipe {
  readonly id: string
  name: string
  description: string
  cuisine: string
  cookingTime: number
  prepTime: number
  totalTime: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  calories: number
  dietary: string[]
  tags: string[]
  ingredients: Ingredient[]
  instructions: InstructionStep[]
  nutrition: Nutrition
  aiTips: string[]
  imageIcon: string
}

export interface MealPlanDay {
  day: string
  dayIndex: number
  meals: Partial<Record<MealType, Recipe>>
  totalCalories: number
  estimatedCost: string
}

export interface WeeklyNutritionSummary {
  avgDailyCalories: number
  avgProtein: string
  avgCarbs: string
  avgFat: string
}

export interface ShoppingList {
  produce: string[]
  proteins: string[]
  dairy: string[]
  pantry: string[]
  grains: string[]
}

export interface MealPlan {
  days: MealPlanDay[]
  weeklyNutritionSummary: WeeklyNutritionSummary
  shoppingList: ShoppingList
}

export interface MealPlanConfig {
  days: number
  servings: number
  dietary: string[]
  budget: string
  includeMeals: MealType[]
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export type ToastType = 'error' | 'success' | 'info'

export interface ToastNotification {
  id: number
  type: ToastType
  message: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  isStreaming?: boolean
  isError?: boolean
}

export interface GeminiError {
  message: string
  code: string
  retryable: boolean
}
