import { Link, useNavigate } from 'react-router-dom';
import './styles/navbar.css'
import { useContext } from 'react';
import { AuthContext } from './App';

function Navbar() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is undefined");
    }
    const { user, setUser } = authContext;

    const handleLogout = async () => {
        const logoutResponse = await fetch('/api/logout/', { method: 'POST' });
        if (!logoutResponse.ok) {
            console.log("Logout failed");
            return;
        }
        setUser(null);
        navigate("/login");
    }
    return (
        <nav>
            <div className="wrapper">
                <div className="logo"><Link to="/">PySect</Link></div>
                <input type="radio" name="slider" id="menu-btn" />
                <input type="radio" name="slider" id="close-btn" />
                <ul className="nav-links">
                    <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                    <li><a href="#">Settings</a></li>
                    {!user
                        ? <li><Link to="Login">Login</Link></li>
                        : <li><a href="#" onClick={handleLogout}>Logout {user.username}</a></li>
                    }
                </ul>
                <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
            </div>
        </nav>
    )
}

export default Navbar;