import { useEffect, useState } from 'react';
import '../styles/login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log("set body class");
        document.body.setAttribute('class', 'login-body');
    }, []);

    const handleLogin = async () => {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        localStorage.setItem('token', data.token);
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