import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import LoadingButton from "../components/LoadingButton";
import { fetchApi } from "../utils/fetchApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { setUser } = authContext;

  const loginUser = async (username: string, password: string) => {
    const loginBody = { username, password };
    await fetchApi({ url: "/api/login/", method: "POST", body: loginBody });
  };

  const fetchUser = async () => {
    const user = await fetchApi({ url: "/api/me", method: "GET" });
    setUser(user);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await loginUser(username, password);
      await fetchUser();
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center m-6">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
          <form className="card-body" onSubmit={handleLogin}>
            <h1 className="text-center text-lg font-semibold">Enter PySect</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered input-primary"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered input-primary"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={() => (document.getElementById("forgot_password_modal") as HTMLDialogElement)?.showModal()}
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <LoadingButton isLoading={isLoading} className="btn-primary">
                Login
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
      <dialog id="forgot_password_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tough life!</h3>
          <p className="py-4">This is a good incentive to improve your memory. Or use a password manager.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Login;
