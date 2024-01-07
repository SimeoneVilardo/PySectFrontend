import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import { AuthContext } from '../App';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is undefined");
    }
    const { setUser } = authContext;

    useEffect(() => {
        console.log("set body class");
        document.body.setAttribute('class', 'login-body');
    }, []);

    const handleLogin = async () => {
        const loginResponse = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!loginResponse.ok) {
            console.log("Invalid credentials");
            return;
        }
        const userResponse = await fetch('/api/me/', { method: 'GET' });
        const userJson = await userResponse.json();
        setUser(userJson);
        navigate("/");
    }

    return (
        <div className="login-page">
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h3>LOGIN</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <div className="login-form">
                    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>login</button>
                </div>
            </div>
        </div>
    )
}

export default Login