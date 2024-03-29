import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/NavBar";
const NewChallenges = lazy(() => import("./pages/NewChallenges"));
const CompletedChallenges = lazy(() => import("./pages/CompletedChallenges"));
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
import { fetchApi } from "./utils/fetchApi";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [isThemeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const user = await fetchApi({ url: "/api/me", method: "GET", hasShowErrorToast: false });
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setUserLoaded(true);
      }
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
            <Route path="/" element={<NewChallenges />} />
            <Route path="/completed-challenges" element={<CompletedChallenges />} />
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
