import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../features/auth/authSlice";

import { useLocation, Navigate } from "react-router-dom";

import { useRegisterMutation } from "../features/auth/authApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "../styles/Login.scss";

function Login() {
  const [register] = useRegisterMutation();
  const [errMsg, setErrMsg] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
      }).unwrap();
      setRegisterInfo({
        username: "",
        password: "",
        email: "",
      });
      navigate("/login");
    } catch (err) {
      if (!err.status) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.status === 400) {
        setErrMsg("Falha no registro!");
      } else if (err.status === 401) {
        setErrMsg("Dados incorretos!");
      } else {
        setErrMsg("Falha no login!");
      }
    }
  };

  const handleRegisterInfo = (e) => {
    const name = e.target.name;
    const target = e.target.value;
    setRegisterInfo((prev) => ({
      ...prev,
      [name]: target,
    }));
  };

  const content = (
    <div className="login-container">
      <h2 className="login-title">REGISTRE-SE</h2>
      <div className={errMsg ? "login-error err-visible" : "login-error"}>
        {errMsg !== "" && <p>{errMsg}</p>}
      </div>
      <form onSubmit={handleRegisterSubmit} className="form-container">
        <div className="form-data">
          <div className="form-square">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            id="email"
            name="email"
            onChange={handleRegisterInfo}
            placeholder="E-mail"
            required
            type="email"
            value={registerInfo.email}
          />
        </div>

        <div className="form-data">
          <div className="form-square">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            id="username"
            name="username"
            onChange={handleRegisterInfo}
            placeholder="Usuário"
            required
            type="text"
            value={registerInfo.username}
          />
        </div>

        <div className="form-data">
          <div className="form-square">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <input
            id="password"
            name="password"
            onChange={handleRegisterInfo}
            placeholder="Senha"
            required
            type="password"
            value={registerInfo.password}
          />
        </div>

        <button>REGISTRAR</button>
      </form>

      <p className="login-register">
        Já tem uma conta?{" "}
        <span onClick={() => navigate("/login")}>Faça login!</span>
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
