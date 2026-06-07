import type { MealPlan, MealPlanConfig } from '../types'

const RECIPE_SCHEMA = `{
  "id": "unique-kebab-case-slug",
  "name": "Recipe Name",
  "description": "Two-sentence appetising description that makes the reader hungry.",
  "cuisine": "Italian",
  "cookingTime": 30,
  "prepTime": 10,
  "totalTime": 40,
  "servings": 4,
  "difficulty": "Easy",
  "calories": 450,
  "dietary": ["Vegetarian", "Gluten-Free"],
  "tags": ["quick", "healthy", "comfort"],
  "ingredients": [
    { "item": "chicken breast", "amount": "500g", "notes": "boneless, skinless" }
  ],
  "instructions": [
    { "step": 1, "instruction": "Heat oil in a large pan over medium-high heat.", "duration": "2 minutes" }
  ],
  "nutrition": { "protein": "38g", "carbs": "22g", "fat": "12g", "fiber": "4g" },
  "aiTips": [
    "Marinate overnight for deeper flavour.",
    "Swap chicken for tofu for a vegan version.",
    "Add a squeeze of lemon at the end to brighten the dish."
  ],
  "imageIcon": "chef-hat"
}`

export interface RecipeParams {
  ingredients: string[]
  dietary: string[]
  cookingTime: number
  servings: number
  cravings: string
}

export function buildRecipeRecommendationPrompt({ ingredients, dietary, cookingTime, servings, cravings }: RecipeParams): string {
  return `You are a world-class chef and nutritionist AI. A user wants personalised recipe suggestions.

User preferences:
- Ingredients available: ${ingredients?.length ? ingredients.join(', ') : 'any ingredients'}
- Dietary requirements: ${dietary?.length ? dietary.join(', ') : 'none'}
- Maximum cooking time: ${cookingTime || 60} minutes
- Number of servings: ${servings || 4}
- Craving / mood: ${cravings || 'anything delicious'}

Generate exactly 6 diverse recipes that best match these preferences. Vary cuisines and cooking methods.
Each recipe must use the schema below exactly — no extra fields, no missing fields.

${RECIPE_SCHEMA}

Return ONLY a valid JSON array of 6 recipe objects. No markdown. No explanation. No backticks.`
}

export function buildSmartSearchPrompt(query: string): string {
  return `You are a culinary search engine powered by AI.

User search query: "${query}"

Interpret this natural language query and return exactly 6 recipes that best match the intent.
Consider: cuisine type, dietary restrictions, calorie targets, meal timing, ingredients, or cooking style implied by the query.

Return ONLY a valid JSON array of 6 recipe objects using this exact schema:
${RECIPE_SCHEMA}

No markdown. No explanation. No backticks.`
}

export const CHAT_SYSTEM_PROMPT = `You are ChefAI, a friendly, expert culinary assistant built into a smart cooking app.

Your expertise covers:
- Ingredient substitutions (e.g. "what can I use instead of buttermilk?")
- Healthier alternatives (e.g. "how do I make this lower in calories?")
- Recipe explanations (e.g. "why does this recipe need resting time?")
- Cooking techniques (e.g. "what does 'fold' mean in baking?")
- Timing and temperature guidance
- Dietary adaptations (vegan, gluten-free, keto, etc.)
- Wine and food pairing
- Kitchen equipment advice

Tone: warm, encouraging, concise, and practical. Use bullet points for lists of steps or options.
Format: plain text only — no markdown headers, no bold, no code blocks.
Constraint: never discuss topics unrelated to food, cooking, nutrition, or kitchen equipment.
If asked about non-cooking topics, politely redirect: "I'm a cooking specialist — let me help you with something in the kitchen!"`

export function buildMealPlanPrompt({ days, servings, dietary, budget, includeMeals }: MealPlanConfig): string {
  return `You are a professional meal planning nutritionist AI.

Plan details:
- Duration: ${days} days
- Servings per meal: ${servings}
- Dietary requirements: ${dietary?.length ? dietary.join(', ') : 'none'}
- Budget level: ${budget} (Budget = cheap pantry staples, Moderate = mid-range, Premium = quality ingredients)
- Include: ${includeMeals?.join(', ') || 'breakfast, lunch, dinner'}

Create a complete ${days}-day meal plan. Ensure:
- Nutritional balance across the week
- No meal repeated more than twice
- Shopping efficiency (reuse ingredients across days)
- Realistic cooking times for each meal type (breakfast ≤ 20min, lunch ≤ 30min, dinner ≤ 60min)

Return ONLY a valid JSON object with this exact structure:
{
  "days": [
    {
      "day": "Monday",
      "dayIndex": 0,
      "meals": {
        "breakfast": { ...recipe object },
        "lunch":     { ...recipe object },
        "dinner":    { ...recipe object },
        "snack":     { ...recipe object }
      },
      "totalCalories": 1850,
      "estimatedCost": "$12-$15"
    }
  ],
  "weeklyNutritionSummary": {
    "avgDailyCalories": 1900,
    "avgProtein": "95g",
    "avgCarbs": "210g",
    "avgFat": "65g"
  },
  "shoppingList": {
    "produce": ["3 chicken breasts", "1 head broccoli"],
    "proteins": ["500g ground beef"],
    "dairy": ["1L whole milk", "200g cheddar"],
    "pantry": ["olive oil", "garlic powder"],
    "grains": ["500g pasta", "1 loaf sourdough"]
  }
}

No markdown. No explanation. No backticks.`
}

export function buildRecipeDetailPrompt(recipeSlug: string, recipeName: string): string {
  return `You are a world-class chef AI. Generate the complete, detailed recipe for "${recipeName}".

Use this exact schema — fully populate every field with realistic, accurate culinary data:
${RECIPE_SCHEMA}

The recipe id must be exactly: "${recipeSlug}"
Provide at least 8 ingredients and at least 6 detailed instruction steps.
The description must be 2 enticing sentences.
aiTips must have exactly 3 practical, chef-level tips.

Return ONLY a single valid JSON object (not an array). No markdown. No explanation. No backticks.`
}

export function buildRegenerateMealSlotPrompt(day: string, mealType: string, dietary: string[]): string {
  return `You are a professional meal planning AI. Generate a single replacement ${mealType} recipe for ${day}.

Requirements:
- Meal type: ${mealType} (breakfast ≤ 20min, lunch ≤ 30min, dinner ≤ 60min, snack ≤ 10min)
- Dietary: ${dietary?.length ? dietary.join(', ') : 'no restrictions'}
- Must be different from typical suggestions — be creative

Return ONLY a single valid JSON recipe object using this schema:
${RECIPE_SCHEMA}

No markdown. No explanation. No backticks.`
}

export function buildShoppingListPrompt(mealPlan: MealPlan): string {
  const daysSummary = mealPlan.days?.map(d =>
    `${d.day}: ${Object.entries(d.meals ?? {}).map(([type, r]) => `${type} - ${r?.name}`).join(', ')}`
  ).join('\n') || ''

  return `You are a professional meal planning AI. Generate a consolidated, categorised shopping list for this meal plan:

${daysSummary}

Return ONLY a valid JSON object with this exact structure:
{
  "produce": ["item with quantity"],
  "proteins": ["item with quantity"],
  "dairy": ["item with quantity"],
  "pantry": ["item with quantity"],
  "grains": ["item with quantity"]
}

Consolidate duplicate ingredients. Include realistic quantities.
No markdown. No explanation. No backticks.`
}
