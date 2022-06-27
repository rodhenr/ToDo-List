import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../features/auth/authSlice";

import { useLocation, Navigate } from "react-router-dom";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

import "../styles/Login.scss";

function Login() {
  const [login] = useLoginMutation();
  const [errMsg, setErrMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

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

  const content = (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      <div className={errMsg ? "login-error err-visible" : "login-error"}>
        {errMsg !== "" && <p>{errMsg}</p>}
      </div>
      <form onSubmit={handleLoginSubmit} className="form-container">
        <div className="form-data">
          <div className="form-square">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            id="username"
            onChange={handleUsernameInput}
            placeholder="Usuário"
            required
            type="text"
            value={username}
          />
        </div>

        <div className="form-data">
          <div className="form-square">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <input
            id="password"
            onChange={handlePasswordInput}
            placeholder="Senha"
            required
            type="password"
            value={password}
          />
        </div>

        <button>ENTRAR</button>
      </form>

      <p className="login-register">
        Não tem uma conta? <span onClick={() => navigate("/register")}>Registre-se!</span>
      </p>
    </div>
  );

  return token ? (
    <Navigate to="/user" state={{ from: location }} replace />
  ) : (
    content
  );
}

export default Login;
