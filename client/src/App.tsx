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
import PublicRoutes from './pages/PublicRoutes';
import { Oval } from 'react-loader-spinner';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check login state here
    // This code will run only once after the initial render
    const checkLoginState = async () => {
      // Replace this with your actual login state checking code
      const userResponse = await fetch('/api/me/', { method: 'GET' });
      if (!userResponse.ok) {
        setLoading(false);
        return;
      }
      const userJson = await userResponse.json();
      setUser(userJson);
      setLoading(false);
    };

    checkLoginState();
  }, [])

  if (loading) {
    return (<Oval
      visible={true}
      height="80"
      width="80"
      color="#cd3e94"
      secondaryColor='#e17fad'
      ariaLabel="oval-loading"
      wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      wrapperClass=""
    />)
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Suspense fallback={<div className="container">Loading...</div>}>
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
    </AuthContext.Provider>

  )
}

export default App
