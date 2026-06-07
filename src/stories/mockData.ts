import type { Recipe, ChatMessage } from '../types'

export const mockRecipe: Recipe = {
  id: 'spaghetti-carbonara',
  name: 'Spaghetti Carbonara',
  description: 'A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper.',
  cuisine: 'Italian',
  cookingTime: 20,
  prepTime: 10,
  totalTime: 30,
  servings: 4,
  difficulty: 'Medium',
  calories: 580,
  dietary: ['Gluten-Free Option', 'High Protein'],
  tags: ['pasta', 'italian', 'quick'],
  imageIcon: '🍝',
  ingredients: [
    { item: 'Spaghetti', amount: '400g' },
    { item: 'Guanciale', amount: '150g' },
    { item: 'Eggs', amount: '4 large' },
    { item: 'Pecorino Romano', amount: '100g', notes: 'finely grated' },
  ],
  instructions: [
    { step: 1, instruction: 'Cook pasta in salted boiling water until al dente.', duration: '10 min' },
    { step: 2, instruction: 'Fry guanciale until crispy.', duration: '5 min' },
    { step: 3, instruction: 'Mix eggs and cheese in a bowl.', duration: '2 min' },
    { step: 4, instruction: 'Combine everything off heat, tossing quickly.', duration: '3 min' },
  ],
  nutrition: { protein: '28g', carbs: '62g', fat: '22g', fiber: '3g' },
  aiTips: ['Use pasta water to loosen the sauce', 'Never cook eggs on direct heat'],
}

export const mockEasyRecipe: Recipe = {
  ...mockRecipe,
  id: 'avocado-toast',
  name: 'Avocado Toast',
  description: 'Simple, nutritious, and delicious breakfast toast topped with creamy avocado.',
  cuisine: 'Modern',
  difficulty: 'Easy',
  totalTime: 10,
  calories: 320,
  dietary: ['Vegan', 'Vegetarian'],
  imageIcon: '🥑',
}

export const mockHardRecipe: Recipe = {
  ...mockRecipe,
  id: 'beef-wellington',
  name: 'Beef Wellington',
  description: 'A classic British dish of beef fillet wrapped in mushroom duxelles and puff pastry.',
  cuisine: 'British',
  difficulty: 'Hard',
  totalTime: 120,
  calories: 820,
  dietary: [],
  imageIcon: '🥩',
}

export const mockUserMessage: ChatMessage = {
  id: '1',
  role: 'user',
  content: 'What can I make with chicken and lemon?',
  timestamp: Date.now() - 60000,
}

export const mockAssistantMessage: ChatMessage = {
  id: '2',
  role: 'assistant',
  content: 'Great combination! Here are some ideas:\n\n• **Lemon Herb Roast Chicken** — classic and crowd-pleasing\n• **Chicken Piccata** — quick pan sauce with capers\n• **Greek Lemon Chicken Soup** — warming and nutritious',
  timestamp: Date.now() - 30000,
}

export const mockStreamingMessage: ChatMessage = {
  ...mockAssistantMessage,
  id: '3',
  content: 'Great choice! Let me think about the best recipes...',
  isStreaming: true,
}

export const mockErrorMessage: ChatMessage = {
  id: '4',
  role: 'assistant',
  content: 'Failed to connect. Please check your API key and try again.',
  timestamp: Date.now(),
  isError: true,
}
