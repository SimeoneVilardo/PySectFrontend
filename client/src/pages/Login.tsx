import { useEffect, useState, useContext, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import { AuthContext } from '../App';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
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

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault(); // Prevent form from causing a page refresh
        setLoading(true);
        const loginResponse = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!loginResponse.ok) {
            setLoading(false);
            toast.error("Invalid credentials", { theme: "colored", position: "bottom-center" });
            return;
        }
        const userResponse = await fetch('/api/me/', { method: 'GET' });
        const userJson = await userResponse.json();
        setUser(userJson);
        navigate("/");
    }

    if (loading) {
        return (<Spinner />)
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
                <form className="login-form" onSubmit={handleLogin}>
                    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                    <button type="submit">login</button>
                </form>
            </div>
        </div>
    )
}

export default Login