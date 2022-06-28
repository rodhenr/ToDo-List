import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiSlice } from "../app/api/apiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  selectCurrentUser,
  selectCurrentToken,
  logOut,
} from "../features/auth/authSlice";

import "../styles/Navbar.scss";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const handleLogout = async () => {
    dispatch(logOut());
    dispatch(apiSlice.util.resetApiState());
  };

  return (
    <header className="navbar-container">
      {user ? (
        <p className="navbar-user">Olá {user.toUpperCase()}</p>
      ) : (
        <div></div>
      )}

      <nav className="navbar-login">
        {token ? (
          <div onClick={handleLogout}>
            <div className="navbar-log out">
              <p>Logout</p>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="navbar-log in">
              <p>Login</p>
              <FontAwesomeIcon icon={faRightToBracket} />
            </div>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
