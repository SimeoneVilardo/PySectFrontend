import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './NavBar';
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const ChallengeDetails = lazy(() => import('./pages/ChallengeDetails'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { createContext } from 'react';
import AuthContextType from './contexts/AuthContextType';
import User from './models/User';
import PrivateRoutes from './pages/PrivateRoutes';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check login state here
    // This code will run only once after the initial render
    const checkLoginState = async () => {
      // Replace this with your actual login state checking code
      const userResponse = await fetch('/api/me/', { method: 'GET' });
      if (!userResponse.ok)
        return;
      const userJson = await userResponse.json();
      setUser(userJson);
    };

    checkLoginState();
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/challenge/:challengeId" element={<ChallengeDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthContext.Provider>

  )
}

export default App
