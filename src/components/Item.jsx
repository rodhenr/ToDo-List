import { useDrag } from "react-dnd";

import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../store/api/apiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "../styles/Item.scss";

function Item({ desc, task_id }) {
  const [updateTodo] = useUpdateTodoMutation(); // API
  const [deleteTodo] = useDeleteTodoMutation(); // API

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { task_id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult(); // Objeto contendo o local aonde foi dropado o item
      if (dropResult) {
        const { nomeColuna } = dropResult;
        console.log(nomeColuna);
        updateTodo({ id: task_id, item: { task: desc, coluna: nomeColuna } });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="item" style={{ opacity }} data-cy="item">
      <div className="item-circle"></div>
      {desc}
      <span onClick={() => handleDelete(task_id)} data-cy="excluir-item">
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
}

export default Item;
