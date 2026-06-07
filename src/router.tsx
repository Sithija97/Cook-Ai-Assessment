import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Skeleton } from './components/ui/Skeleton'
import { ErrorBoundary } from './components/error/ErrorBoundary'

const HomePage             = lazy(() => import('./pages/HomePage'))
const RecommendationsPage  = lazy(() => import('./pages/RecommendationsPage'))
const RecipeDetailPage     = lazy(() => import('./pages/RecipeDetailPage'))
const FavoritesPage        = lazy(() => import('./pages/FavoritesPage'))
const CookingAssistantPage = lazy(() => import('./pages/CookingAssistantPage'))
const MealPlannerPage      = lazy(() => import('./pages/MealPlannerPage'))

function PageLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-5">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense key={location.pathname} fallback={<PageLoadingSkeleton />}>
        <Routes location={location}>
          <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
          <Route path="/recommendations" element={<ErrorBoundary><RecommendationsPage /></ErrorBoundary>} />
          <Route path="/recipe/:id" element={<ErrorBoundary><RecipeDetailPage /></ErrorBoundary>} />
          <Route path="/favorites" element={<ErrorBoundary><FavoritesPage /></ErrorBoundary>} />
          <Route path="/assistant" element={<ErrorBoundary><CookingAssistantPage /></ErrorBoundary>} />
          <Route path="/meal-planner" element={<ErrorBoundary><MealPlannerPage /></ErrorBoundary>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}
