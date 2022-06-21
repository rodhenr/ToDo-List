import { useDrag } from "react-dnd";

import { useDispatch } from "react-redux";
import { deleteTodo, mudarColuna } from "../store/slices/ItensSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "../styles/Item.scss";

function Item({ desc, id }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { desc },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult(); // Objeto contendo o local aonde foi dropado o item
      if (dropResult) {
        const { nomeColuna } = dropResult;
        dispatch(mudarColuna({ item, nomeColuna }));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="item" style={{ opacity }} data-cy="item">
      <div className="item-circle"></div>
      {desc}
      <span onClick={() => dispatch(deleteTodo(id))} data-cy="excluir-item">
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
}

export default Item;
