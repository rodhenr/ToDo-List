import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { login, selectLogin } from "../features/users/userSlice";

import "../styles/Login.scss";

function Login() {
  const [log, { error, isLoading }] = useLoginMutation();
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //unwrap para conseguir usar o try/catch

    const userData = await log({ email, password }).unwrap();

    if (error !== undefined) {
      setErrMsg("Nome de usuário ou senha inválido");
    } else {
      dispatch(setCredentials({ user: email, ...userData }));
      setEmail("");
      setPassword("");
      dispatch(login({ login: false }));
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
    <div className="navbar-login_modal">
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
      {errMsg !== "" && <p>{errMsg}</p>}
    </div>
  );
}

export default Login;
