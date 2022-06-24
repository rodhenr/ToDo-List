import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import "../styles/Navbar.scss";

function Navbar() {
  const user = "Rodrigo";

  return (
    <div className="navbar-container">
      <p className="navbar-user">Olá {user}</p>
      <div className="navbar-log">
        <p>Logout</p>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </div>
  );
}

export default Navbar;
