import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import Navbar from './NavBar';
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const ChallengeDetails = lazy(() => import('./pages/ChallengeDetails'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/challenge/:challengeId" element={<ChallengeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
