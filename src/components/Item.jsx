import { useDrag } from "react-dnd";

import {
  useChangeTodosMutation,
  useGetAllTodosQuery,
} from "../store/api/apiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "../styles/Item.scss";

function Item({ desc, id }) {
  const [changeTodos] = useChangeTodosMutation(); // API
  const { data } = useGetAllTodosQuery(); // API

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { desc },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult(); // Objeto contendo o local aonde foi dropado o item
      if (dropResult) {
        const { nomeColuna } = dropResult;

        const newItems = data.data[0].item.filter((i) => {
          if (i.desc === item.desc) {
            return (i.coluna = nomeColuna);
          } else {
            return i;
          }
        });

        changeTodos([...newItems]);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = (id) => {
    const newItems = data.data[0].item.filter((i) => i.id !== id);
    changeTodos([...newItems]);
  };

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="item" style={{ opacity }} data-cy="item">
      <div className="item-circle"></div>
      {desc}
      <span onClick={() => handleDelete(id)} data-cy="excluir-item">
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
}

export default Item;
