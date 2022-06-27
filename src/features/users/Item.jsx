import { useDrag } from "react-dnd";

import { useUpdateTodoMutation, useDeleteTodoMutation } from "./userApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import "../../styles/Item.scss";
import { useState } from "react";

function Item({ desc, task_id, coluna, handleEditTodo }) {
  const [updateTodo] = useUpdateTodoMutation();
  const [task, setTask] = useState(desc);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { task_id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult(); // Objeto contendo o local aonde foi dropado o item
      if (dropResult) {
        const { nomeColuna } = dropResult;
        updateTodo({
          task_uuid: task_id,
          task_desc: { task: desc, coluna: nomeColuna },
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = (id) => {
    if (isEditing) {
      return;
    } else {
      deleteTodo(id);
    }
  };

  const handleEdit = (id) => {
    handleEditTodo(id, task, coluna);
    setIsEditing(false);
  };

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="item" style={{ opacity }} data-cy="item">
      <div className="item-circle"></div>

      <div className="item-desc">
        {isEditing ? (
          <div className="item-desc_input">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              onClick={() => {
                handleEdit(task_id);
              }}
            >
              OK
            </button>
          </div>
        ) : (
          desc
        )}
      </div>

      <div className="item-change">
        <span onClick={() => setIsEditing(!isEditing)}>
          <FontAwesomeIcon icon={faPencil} />
        </span>
        <span onClick={() => handleDelete(task_id)} data-cy="excluir-item">
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>
  );
}

export default Item;
