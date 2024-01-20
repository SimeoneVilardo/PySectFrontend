import { useState, useContext, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';
import { toast } from 'react-toastify';
import LoadingButton from '../components/LoadingButton';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is undefined");
    }
    const { setUser } = authContext;

    const handleLogin = async (event: FormEvent) => {
        setLoading(true);
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
            toast.error("Invalid credentials", { theme: "colored", position: "bottom-center" });
            setLoading(false);
            return;
        }
        const userResponse = await fetch('/api/me/', { method: 'GET' });
        const userJson = await userResponse.json();
        setUser(userJson);
        setLoading(false);
        navigate("/");
    }

    return (
        <>
            <div className='flex justify-center m-6'>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
                    <form className="card-body" onSubmit={handleLogin}>
                        <h1 className='text-center text-lg font-semibold'>Enter PySect</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="username" className="input input-bordered input-primary" onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered input-primary" onChange={e => setPassword(e.target.value)} required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover" onClick={() => (document.getElementById('forgot_password_modal') as HTMLDialogElement)?.showModal()}>Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <LoadingButton isLoading={isLoading} className='btn-primary'>Login</LoadingButton>
                        </div>
                    </form>
                </div>
            </div>
            <dialog id="forgot_password_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tough life!</h3>
                    <p className="py-4">
                        This is a good incentive to improve your memory. Or use a password manager.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    )
}

export default Login