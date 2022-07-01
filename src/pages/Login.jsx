import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

import "../styles/Auth.scss";

function Login() {
  const [login] = useLoginMutation();
  const [errMsg, setErrMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData, user: username }));
      setUsername("");
      setPassword("");
      navigate("/user");
    } catch (err) {
      if (!err.status) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.status === 400) {
        setErrMsg("Falha no login!");
      } else if (err.status === 401) {
        setErrMsg("Usuário ou senha inválido!");
      } else {
        setErrMsg("Falha no login!");
      }
    }
  };

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">LOGIN</h2>
      <div className="auth-main">
        <div
          className={errMsg ? "auth-error err-visible" : "auth-error"}
          role="alert"
        >
          {errMsg !== "" && <p>{errMsg}</p>}
        </div>
        <form onSubmit={handleLoginSubmit} className="form-container">
          <div className="form-data">
            <label htmlFor="username">
              <div className="form-square">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </label>
            <input
              aria-label="username"
              aria-required="true"
              id="username"
              onChange={handleUsernameInput}
              placeholder="Usuário"
              required
              type="text"
              value={username}
            />
          </div>

          <div className="form-data">
            <label htmlFor="password">
              <div className="form-square">
                <FontAwesomeIcon icon={faKey} />
              </div>
            </label>
            <input
              aria-label="password"
              aria-required="true"
              id="password"
              minLength="6"
              onChange={handlePasswordInput}
              placeholder="Senha"
              required
              type="password"
              value={password}
            />
          </div>

          <button>ENTRAR</button>
        </form>

        <p className="auth-register">
          Não tem uma conta?{" "}
          <span onClick={() => navigate("/register")}>Registre-se!</span>
        </p>
      </div>
      <p className="auth-remote">
        Lista local sem login? Clique{" "}
        <span onClick={() => navigate("/")}>aqui!</span>
      </p>
    </div>
  );
}

export default Login;
