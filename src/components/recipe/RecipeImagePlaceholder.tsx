import { memo } from 'react'
import {
  ChefHat, Utensils, Salad, Soup, Sandwich, Pizza, Fish, Egg, Coffee,
  Wheat, Apple, Leaf, Cookie, Cherry,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'chef-hat': ChefHat,
  'utensils': Utensils,
  'salad':    Salad,
  'soup':     Soup,
  'sandwich': Sandwich,
  'pizza':    Pizza,
  'fish':     Fish,
  'egg':      Egg,
  'coffee':   Coffee,
  'wheat':    Wheat,
  'apple':    Apple,
  'leaf':     Leaf,
  'cookie':   Cookie,
  'cherry':   Cherry,
}

const cuisineIconMap: Record<string, string> = {
  italian:       'pizza',
  japanese:      'fish',
  mexican:       'utensils',
  american:      'sandwich',
  indian:        'soup',
  mediterranean: 'salad',
  chinese:       'utensils',
  french:        'chef-hat',
  thai:          'soup',
  breakfast:     'egg',
  cafe:          'coffee',
}

const nameKeywords: { words: string[]; icon: string }[] = [
  { words: ['oatmeal', 'granola', 'porridge', 'cereal'],                          icon: 'wheat' },
  { words: ['rice', 'quinoa', 'grain', 'brown rice'],                              icon: 'wheat' },
  { words: ['pasta', 'shell', 'lasagna', 'spaghetti', 'noodle', 'stuffed shell'], icon: 'pizza' },
  { words: ['pizza', 'flatbread', 'calzone'],                                      icon: 'pizza' },
  { words: ['egg', 'omelet', 'omelette', 'frittata', 'scrambled', 'poached'],     icon: 'egg'   },
  { words: ['yogurt', 'parfait', 'cinnamon', 'honey', 'banana', 'dairy'],         icon: 'egg'   },
  { words: ['coffee', 'espresso', 'smoothie', 'juice', 'latte'],                   icon: 'coffee'},
  { words: ['salad', 'coleslaw', 'slaw', 'greens'],                                icon: 'salad' },
  { words: ['soup', 'stew', 'broth', 'bisque', 'chowder'],                         icon: 'soup'  },
  { words: ['curry', 'dal', 'masala'],                                             icon: 'soup'  },
  { words: ['sandwich', 'burger', 'wrap', 'toast', 'sub', 'bun'],                  icon: 'sandwich'},
  { words: ['taco', 'burrito', 'quesadilla', 'fajita'],                            icon: 'sandwich'},
  { words: ['fish', 'salmon', 'tuna', 'shrimp', 'prawn', 'seafood', 'cod'],        icon: 'fish'  },
  { words: ['bean', 'lentil', 'chickpea', 'tofu', 'legume', 'hummus'],             icon: 'leaf'  },
  { words: ['avocado', 'vegetable', 'veggie', 'sweet potato', 'kale', 'spinach'],  icon: 'leaf'  },
  { words: ['apple', 'berry', 'fruit', 'mango', 'peach', 'orange', 'melon'],       icon: 'apple' },
  { words: ['nut', 'walnut', 'almond', 'peanut', 'cashew', 'dried', 'apricot'],    icon: 'apple' },
  { words: ['cookie', 'brownie', 'cake', 'muffin', 'biscuit', 'dessert'],          icon: 'cookie'},
  { words: ['cherry', 'grape', 'plum', 'pomegranate'],                             icon: 'cherry'},
]

function resolveFromName(name: string): string | null {
  const lower = (name || '').toLowerCase()
  for (const { words, icon } of nameKeywords) {
    if (words.some(w => lower.includes(w))) return icon
  }
  return null
}

function resolveIcon(iconName: string | undefined, cuisine: string | undefined, name: string | undefined): string {
  if (iconName && iconMap[iconName]) return iconName
  const fromName = resolveFromName(name ?? '')
  if (fromName) return fromName
  const cuisineKey = (cuisine || '').toLowerCase()
  const mapped = Object.entries(cuisineIconMap).find(([k]) => cuisineKey.includes(k))
  return mapped ? mapped[1] : 'chef-hat'
}

const gradients: Record<string, string> = {
  'chef-hat': 'from-blue-50 to-slate-100',
  'utensils': 'from-coral-50 to-orange-50',
  'salad':    'from-emerald-50 to-green-100',
  'soup':     'from-amber-50 to-yellow-100',
  'sandwich': 'from-orange-50 to-amber-50',
  'pizza':    'from-red-50 to-orange-50',
  'fish':     'from-blue-50 to-cyan-100',
  'egg':      'from-yellow-50 to-amber-50',
  'coffee':   'from-stone-100 to-amber-50',
  'wheat':    'from-amber-50 to-orange-50',
  'apple':    'from-green-50 to-emerald-100',
  'leaf':     'from-emerald-50 to-teal-100',
  'cookie':   'from-amber-50 to-yellow-100',
  'cherry':   'from-rose-50 to-pink-100',
}

const sizeConfig = {
  xs: { wrapper: 'h-full w-full rounded',  icon: 18, text: 'hidden'   },
  sm: { wrapper: 'h-40 rounded-t-xl',      icon: 40, text: 'text-xs'  },
  lg: { wrapper: 'h-52 rounded-xl',        icon: 64, text: 'text-sm'  },
}

interface Props {
  iconName?:  string
  cuisine?:   string
  name?:      string
  difficulty?: string
  size?:      'xs' | 'sm' | 'lg'
}

export const RecipeImagePlaceholder = memo(function RecipeImagePlaceholder({
  iconName,
  cuisine,
  name,
  size = 'sm',
}: Props) {
  const resolved = resolveIcon(iconName, cuisine, name)
  const Icon     = iconMap[resolved] ?? ChefHat
  const gradient = gradients[resolved] ?? gradients['chef-hat']
  const cfg      = sizeConfig[size]

  return (
    <div className={`bg-gradient-to-br ${gradient} ${cfg.wrapper} flex flex-col items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-4 w-16 h-16 rounded-full bg-current" />
        <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full bg-current" />
      </div>
      <Icon size={cfg.icon} className="text-slate-400 mb-2" strokeWidth={1.5} />
      {cuisine && (
        <span className={`${cfg.text} font-medium text-slate-500 tracking-wide uppercase`}>
          {cuisine}
        </span>
      )}
    </div>
  )
})
