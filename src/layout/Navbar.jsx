import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import { login, selectLogin } from "../features/users/userSlice";
import { selectCurrentUser } from "../features/auth/authSlice";

import "../styles/Navbar.scss";

function Navbar() {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const user = useSelector(selectCurrentUser);

  return (
    <div className="navbar-container">
      {user ? (
        <p className="navbar-user">Olá {user}</p>
      ) : (
        <p className="navbar-user">Olá anônimo</p>
      )}

      <div className="navbar-login">
        {user ? (
          <Link to="/">
            <div className="navbar-log out">
              <p>Logout</p>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <div className="navbar-log in">
              <p>Login</p>
              <FontAwesomeIcon icon={faRightToBracket} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
