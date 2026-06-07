import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { AppRoutes } from './router'
import { ErrorBoundary } from './components/error/ErrorBoundary'
import { Toaster } from './components/ui/Toaster'

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
          <Navbar />
          <div className="flex-1">
            <AppRoutes />
          </div>
        </div>
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  )
}
