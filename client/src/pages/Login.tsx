import { useState, useContext, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is undefined");
    }
    const { setUser } = authContext;

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault(); // Prevent form from causing a page refresh
        //setLoading(true);
        const loginResponse = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!loginResponse.ok) {
            //setLoading(false);
            toast.error("Invalid credentials", { theme: "colored", position: "bottom-center" });
            return;
        }
        const userResponse = await fetch('/api/me/', { method: 'GET' });
        const userJson = await userResponse.json();
        setUser(userJson);
        navigate("/");
    }

    return (
        <div className='flex justify-center my-4'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleLogin}>
                    <h1 className='text-center text-lg font-semibold'>Enter PySect</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="username" className="input input-bordered" onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" onChange={e => setPassword(e.target.value)} required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login