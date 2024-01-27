import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/NavBar";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Submissions = lazy(() => import("./pages/Submissions"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { createContext } from "react";
import AuthContextType from "./contexts/AuthContextType";
import User from "./models/User";
import PrivateRoutes from "./pages/PrivateRoutes";
import PublicRoutes from "./pages/PublicRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";
import Rewards from "./pages/Rewards";
import Info from "./pages/Info";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [isThemeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    const checkLoginState = async () => {
      const userResponse = await fetch("/api/me/", { method: "GET" });
      if (userResponse.ok) {
        const userJson = await userResponse.json();
        setUser(userJson);
      }
      setUserLoaded(true);
    };

    checkLoginState();
  }, []);

  const renderApp = () => {
    if (!isThemeLoaded) {
      return <></>;
    }

    if (!isUserLoaded) {
      return <Spinner className="text-primary size-24"></Spinner>;
    }

    return (
      <Suspense fallback={<Spinner className="text-primary size-24"></Spinner>}>
        <Routes>
        <Route path="/info" element={<Info />} />
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/challenge/:challengeId" element={<Submissions />} />
            <Route path="/rewards" element={<Rewards />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    );
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar />
      {renderApp()}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
