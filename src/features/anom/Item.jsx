import { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "./anomSlice";

import { useDrag } from "react-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import "../../styles/Item.scss";

function Item({ desc, task_id, coluna, handleUpdateTodo, handleDeleteTodo }) {
  const [task, setTask] = useState(desc);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { task_id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult(); // Objeto contendo o local aonde foi dropado o item
      if (dropResult) {
        const { nomeColuna } = dropResult;
        dispatch(
          updateTodo({ task_id, task_desc: { task, coluna: nomeColuna } })
        );
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = (task_id) => {
    if (isEditing) {
      return;
    } else {
      handleDeleteTodo(task_id);
    }
  };

  const handleEdit = (task_id) => {
    handleUpdateTodo(task_id, { task: task, coluna });
    setIsEditing(false);
  };

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="item-container" style={{ opacity }} data-cy="item">
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
          task
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
