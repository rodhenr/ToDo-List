import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/Item.scss";

function Item({ dados }) {
  return (
    <div className="container-item">
      <p>{dados}</p>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
}

export default Item;
