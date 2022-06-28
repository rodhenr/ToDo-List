import { useState } from "react";

import { useRegisterMutation } from "../features/auth/authApiSlice";

import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "../styles/Auth.scss";

function Login() {
  const [register] = useRegisterMutation();
  const [errMsg, setErrMsg] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

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
      } else if (err.status === 409) {
        setErrMsg("Usuário já cadastrado!");
      } else {
        setErrMsg("Falha no registro!");
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

  return (
    <div className="auth-container">
      <h2 className="auth-title">REGISTRE-SE</h2>
      <div>
        <div
          className={errMsg ? "auth-error err-visible" : "auth-error"}
          role="alert"
        >
          {errMsg !== "" && <p>{errMsg}</p>}
        </div>
        <form onSubmit={handleRegisterSubmit} className="form-container">
          <div className="form-data">
            <label htmlFor="email">
              <div className="form-square">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </label>
            <input
              aria-label="email"
              aria-required="true"
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
            <label htmlFor="username">
              <div className="form-square">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </label>
            <input
              aria-label="username"
              aria-required="true"
              id="username"
              minLength="5"
              name="username"
              onChange={handleRegisterInfo}
              placeholder="Usuário"
              required
              type="text"
              value={registerInfo.username}
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

        <p className="auth-login">
          Já tem uma conta?{" "}
          <span onClick={() => navigate("/login")}>Faça login!</span>
        </p>
        <p className="auth-remote">
          Lista local sem login? Clique{" "}
          <span onClick={() => navigate("/")}>aqui!</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
