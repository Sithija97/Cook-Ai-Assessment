import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, HeartOff, Search, Sparkles } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { RecipeGrid } from '../components/recipe/RecipeGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'
import { useFavorites } from '../hooks/useFavorites'

export default function FavoritesPage() {
  const navigate    = useNavigate()
  const { favorites } = useFavorites()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return favorites
    const q = query.toLowerCase()
    return favorites.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine?.toLowerCase().includes(q) ||
      r.dietary?.some(d => d.toLowerCase().includes(q)),
    )
  }, [favorites, query])

  const inferredPrefs = useMemo(() => {
    if (favorites.length < 3) return null
    const dietaryCounts: Record<string, number> = {}
    favorites.forEach(r => r.dietary?.forEach(d => { dietaryCounts[d] = (dietaryCounts[d] || 0) + 1 }))
    const top = Object.entries(dietaryCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([d]) => d)
    return top
  }, [favorites])

  const handleAISuggestions = useCallback(() => {
    const pref = inferredPrefs?.join(', ') || ''
    navigate(`/recommendations?q=${encodeURIComponent(`Based on my tastes: ${pref || 'delicious and varied'}`)}`)
  }, [navigate, inferredPrefs])

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Heart size={28} className="text-coral-500 fill-coral-500" />
          <h1 className="font-display text-3xl text-slate-800">Your Saved Recipes</h1>
        </div>
        {favorites.length > 0 && (
          <span className="bg-coral-500 text-white text-sm font-semibold rounded-full px-3 py-1">
            {favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved
          </span>
        )}
      </div>

      {inferredPrefs && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Sparkles size={16} className="text-blue-500 flex-shrink-0" />
            <span>Based on your saved recipes, ChefAI thinks you'd love these →</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Sparkles size={13} />}
            onClick={handleAISuggestions}
          >
            Get AI Suggestions
          </Button>
        </div>
      )}

      {favorites.length === 0 ? (
        <EmptyState
          icon={<HeartOff size={36} />}
          iconColor="coral"
          title="No favourites yet"
          description="Start exploring recipes and save the ones you love — they'll appear here."
          actionLabel="Explore Recipes"
          onAction={() => navigate('/recommendations')}
        />
      ) : (
        <>
          <div className="relative mb-6">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, cuisine, or dietary tag..."
              aria-label="Filter saved recipes"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 outline-none transition-all"
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={<Search size={32} />}
              iconColor="blue"
              title="No results found"
              description={`No saved recipes match "${query}".`}
            />
          ) : (
            <RecipeGrid recipes={filtered} />
          )}
        </>
      )}
    </PageWrapper>
  )
}
