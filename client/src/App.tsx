import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'))
const ChallengeDetails = lazy(() => import('./pages/ChallengeDetails'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Suspense fallback={<div className="container">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge/:challengeId" element={<ChallengeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
