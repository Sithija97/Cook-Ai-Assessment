import { GoogleGenerativeAI } from '@google/generative-ai'
import {
  buildRecipeRecommendationPrompt,
  buildSmartSearchPrompt,
  buildMealPlanPrompt,
  buildRecipeDetailPrompt,
  buildRegenerateMealSlotPrompt,
  buildShoppingListPrompt,
  CHAT_SYSTEM_PROMPT,
  type RecipeParams,
} from '../utils/promptTemplates'
import { parseGeminiJSON, assertArray } from '../utils/recipeParser'
import { logger } from '../utils/logger'
import { GEMINI_MODEL } from '../utils/constants'
import type { Recipe, MealPlan, MealPlanConfig, ShoppingList, ChatMessage } from '../types'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })

export class GeminiApiError extends Error {
  code: string
  retryable: boolean

  constructor(message: string, code = 'GEMINI_ERROR', retryable = true) {
    super(message)
    this.name = 'GeminiApiError'
    this.code = code
    this.retryable = retryable
  }
}

function extractApiMessage(err: unknown): string | null {
  try {
    const message = err instanceof Error ? err.message : String(err)
    const match = message?.match(/\{[\s\S]*"error"[\s\S]*\}/)
    if (match) {
      const body = JSON.parse(match[0]) as { error?: { message?: string } }
      return body?.error?.message ?? null
    }
  } catch {
    // ignore
  }
  return null
}

function handleApiError(err: unknown): GeminiApiError {
  logger.error('Gemini API error:', err)
  if (err instanceof GeminiApiError) return err

  const message = err instanceof Error ? err.message : String(err)
  const status = (err as { status?: number }).status

  if (message.includes('API key')) {
    return new GeminiApiError('Invalid API key. Check your VITE_GEMINI_API_KEY.', 'INVALID_API_KEY', false)
  }
  if (
    status === 429 ||
    message.includes('429') ||
    message.includes('quota') ||
    message.includes('rate') ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('exhausted')
  ) {
    return new GeminiApiError('Rate limit reached. Please wait a moment and try again.', 'RATE_LIMIT', true)
  }
  if (message.includes('503') || message.includes('UNAVAILABLE')) {
    const apiMsg = extractApiMessage(err)
    return new GeminiApiError(
      apiMsg || 'The AI service is temporarily unavailable. Please try again in a moment.',
      'SERVICE_UNAVAILABLE',
      true,
    )
  }
  if (message.includes('network') || message.includes('fetch')) {
    return new GeminiApiError('Network error — check your connection and try again.', 'NETWORK_ERROR', true)
  }
  const apiMsg = extractApiMessage(err)
  return new GeminiApiError(apiMsg || 'ChefAI is taking a break — please try again.', 'UNKNOWN', true)
}

export async function generateRecipes(params: RecipeParams): Promise<Recipe[]> {
  try {
    const prompt = buildRecipeRecommendationPrompt(params)
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const data = parseGeminiJSON(text)
    return assertArray(data, 'generateRecipes') as Recipe[]
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function* streamRecipes(params: RecipeParams): AsyncGenerator<string> {
  try {
    const prompt = buildRecipeRecommendationPrompt(params)
    const result = await model.generateContentStream(prompt)
    for await (const chunk of result.stream) {
      yield chunk.text()
    }
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function streamChatResponse(
  history: ChatMessage[],
  userMessage: string,
  onChunk: (text: string) => void,
): Promise<string> {
  try {
    const validHistory = history
      .filter(m =>
        (m.role === 'user' || m.role === 'assistant') &&
        !m.isError &&
        !m.isStreaming &&
        m.content?.trim().length > 0,
      )
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

    const systemHistory = [
      { role: 'user',  parts: [{ text: 'Who are you and what can you help me with?' }] },
      { role: 'model', parts: [{ text: CHAT_SYSTEM_PROMPT }] },
    ]

    const conversationHistory = validHistory[0]?.role === 'user' ? validHistory : validHistory.slice(1)

    const chat = model.startChat({
      history: [...systemHistory, ...conversationHistory],
    })

    const result = await chat.sendMessageStream(userMessage)
    let full = ''
    for await (const chunk of result.stream) {
      const text = chunk.text()
      full += text
      onChunk(text)
    }
    return full
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function smartSearch(query: string): Promise<Recipe[]> {
  try {
    const prompt = buildSmartSearchPrompt(query)
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const data = parseGeminiJSON(text)
    return assertArray(data, 'smartSearch') as Recipe[]
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function* streamSmartSearch(query: string): AsyncGenerator<string> {
  try {
    const prompt = buildSmartSearchPrompt(query)
    const result = await model.generateContentStream(prompt)
    for await (const chunk of result.stream) {
      yield chunk.text()
    }
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function generateMealPlan(params: MealPlanConfig): Promise<MealPlan> {
  try {
    const prompt = buildMealPlanPrompt(params)
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return parseGeminiJSON(text) as MealPlan
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function* streamMealPlan(params: MealPlanConfig): AsyncGenerator<string> {
  try {
    const prompt = buildMealPlanPrompt(params)
    const result = await model.generateContentStream(prompt)
    for await (const chunk of result.stream) {
      yield chunk.text()
    }
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function generateRecipeDetail(recipeSlug: string, recipeName: string): Promise<Recipe> {
  try {
    const prompt = buildRecipeDetailPrompt(recipeSlug, recipeName)
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return parseGeminiJSON(text) as Recipe
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function regenerateMealSlot(day: string, mealType: string, dietary: string[]): Promise<Recipe> {
  try {
    const prompt = buildRegenerateMealSlotPrompt(day, mealType, dietary)
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return parseGeminiJSON(text) as Recipe
  } catch (err) {
    throw handleApiError(err)
  }
}

export async function generateShoppingList(mealPlan: MealPlan): Promise<ShoppingList> {
  try {
    const prompt = buildShoppingListPrompt(mealPlan)
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return parseGeminiJSON(text) as ShoppingList
  } catch (err) {
    throw handleApiError(err)
  }
}
