import { Link } from 'react-router-dom';
import './styles/navbar.css'

function Navbar() {
    return (
        <nav>
            <div className="wrapper">
                <div className="logo"><Link to="/">PySect</Link></div>
                <input type="radio" name="slider" id="menu-btn" />
                <input type="radio" name="slider" id="close-btn" />
                <ul className="nav-links">
                    <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
                    <li><a href="#">Settings</a></li>
                    <li><Link to="Login">Login</Link></li>
                </ul>
                <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
            </div>
        </nav>
    )
}

export default Navbar;