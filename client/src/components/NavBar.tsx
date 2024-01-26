import { Link, useNavigate } from "react-router-dom"
import { useContext, useRef } from 'react';
import { AuthContext } from '../App';

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
            detailsRef.current.removeAttribute('open');
        }
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = e.target.value;
        localStorage.setItem('theme', newTheme);
    }

    const handleLogout = async () => {
        const logoutResponse = await fetch('/api/logout/', { method: 'POST' });
        if (!logoutResponse.ok) {
            return;
        }
        setUser(null);
        navigate("/login");
    }

    const renderUserButton = () => {
        if (user) {
            return (<a href="#" onClick={handleLogout}>Logout {user.username}</a>)
        }
        else {
            return <></>
        }
    }

    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/rewards">Rewards</Link></li>
                        <li>
                            <a>Theme</a>
                            <ul className="p-2">
                                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Pink" value="valentine" onChange={handleThemeChange} /></li>
                                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="business" onChange={handleThemeChange} /></li>
                                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="corporate" onChange={handleThemeChange} /></li>
                            </ul>
                        </li>
                        <li>{renderUserButton()}</li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl" to="/">PySect</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 z-[1]">
                    <li><Link to="/rewards">Rewards</Link></li>
                    <li>
                        <details ref={detailsRef}>
                            <summary>Theme</summary>
                            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box">
                                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Pink" value="valentine" onClick={closeThemeDropdown} onChange={handleThemeChange} /></li>
                                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="business" onClick={closeThemeDropdown} onChange={handleThemeChange} /></li>
                                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="corporate" onClick={closeThemeDropdown} onChange={handleThemeChange} /></li>
                            </ul>
                        </details>
                    </li>
                    <li>{renderUserButton()}</li>
                </ul>
            </div>

        </div>
    )
}

export default NavBar