import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ChallengeDetails from './pages/ChallengeDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge/:challengeId" element={<ChallengeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
