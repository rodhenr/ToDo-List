import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { login as log, selectLogin } from "../features/users/userSlice";

import "../styles/Login.scss";

function Login() {
  const [login, { error, isLoading }] = useLoginMutation();
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, user: email }));
      setEmail("");
      setPassword("");
      navigate("/user");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  return isLoading ? (
    <h1>Carregando...</h1>
  ) : (
    <div className="login-container">
      <div className="login_modal_title">
        <p>Login</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          onChange={handleEmailInput}
          placeholder="Digite seu email"
          required
          type="email"
          value={email}
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          onChange={handlePasswordInput}
          placeholder="Digite sua senha"
          required
          type="password"
          value={password}
        />

        <button>Login</button>
      </form>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
    </div>
  );
}

export default Login;
