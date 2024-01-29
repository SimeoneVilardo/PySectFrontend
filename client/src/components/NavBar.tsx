import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../App";
import { fetchApi } from "../utils/fetchApi";
import User from "../models/User";

const UserButton = ({ user, handleLogout }: { user: User | null; handleLogout: () => void }) => {
  if (!user) return null;
  return (
    <a href="#" onClick={handleLogout}>
      Logout {user.username}
    </a>
  );
};

const themes = [
  { theme: "valentine", label: "Pink" },
  { theme: "business", label: "Dark" },
  { theme: "corporate", label: "Light" },
];

const ThemeItems = ({
  handleThemeChange,
  closeThemeDropdown,
}: {
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeThemeDropdown?: () => void;
}) => {
  return themes.map(({ theme, label }) => (
    <li key={theme}>
      <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label={label}
        value={theme}
        onClick={closeThemeDropdown}
        onChange={handleThemeChange}
      />
    </li>
  ));
};

const NavBar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { user, setUser } = authContext;
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeThemeDropdown = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    await fetchApi({ url: "/api/logout/", method: "POST" });
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/rewards">Rewards</Link>
            </li>
            <li>
              <Link to="/info">Info</Link>
            </li>
            <li>
              <a>Theme</a>
              <ul className="p-2">
                <ThemeItems handleThemeChange={handleThemeChange} />
              </ul>
            </li>
            <li>
              <UserButton user={user} handleLogout={handleLogout} />
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">
          PySect
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-[1]">
          <li>
            <Link to="/rewards">Rewards</Link>
          </li>
          <li>
            <Link to="/info">Info</Link>
          </li>
          <li>
            <details ref={detailsRef}>
              <summary>Theme</summary>
              <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box">
                <ThemeItems handleThemeChange={handleThemeChange} closeThemeDropdown={closeThemeDropdown} />
              </ul>
            </details>
          </li>
          <li>
            <UserButton user={user} handleLogout={handleLogout} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
