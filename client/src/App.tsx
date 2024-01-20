import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/NavBar';
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const ChallengeDetails = lazy(() => import('./pages/ChallengeDetails'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { createContext } from 'react';
import AuthContextType from './contexts/AuthContextType';
import User from './models/User';
import PrivateRoutes from './pages/PrivateRoutes';
import PublicRoutes from './pages/PublicRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginState = async () => {
      const userResponse = await fetch('/api/me/', { method: 'GET' });
      if (!userResponse.ok) {
        return;
      }
      const userJson = await userResponse.json();
      setUser(userJson);
    };

    checkLoginState();
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Suspense fallback={<Spinner className="text-primary size-24"></Spinner>}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/challenge/:challengeId" element={<ChallengeDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </AuthContext.Provider>

  )
}

export default App
