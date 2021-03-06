import { useState } from "react";

import { useDrop } from "react-dnd";

import "../../styles/Coluna.scss";

function Coluna({ children, className, titulo, handleAddTodo }) {
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "item",
    drop: () => ({ nomeColuna: titulo }), // Quando o item é dropado no alvo, esse objeto vira o resultado do getDropResult no end do useDrag
    collect: (monitor) => ({
      // Usado para mudar a cor do background da coluna caso ela esteja sendo o alvo do drag
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "#ebebeb";
      }
    } else {
      return "";
    }
  };

  function handleOpen() {
    setOpen(!open);
  }

  function handleChange(e) {
    const value = e.target.value;
    setTask(value);
  }

  function handleNovoItem() {
    handleAddTodo(task, titulo);
    setTask("");
    setOpen(false);
  }

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
      data-cy="coluna"
    >
      <div className="coluna-header">
        <div className="coluna-header_container">
          <div className="coluna-header_info">
            <span>{titulo}</span>
            <span>|</span>
            <span>
              {children.props.children.length > 0
                ? children.props.children.length
                : 0}
            </span>
          </div>
          <div className="coluna-header_novo">
            <span onClick={handleOpen} data-cy="novo-item">
              {open ? "-" : "+"}
            </span>
          </div>
        </div>
        <div className={open ? "novo-item ativo" : "novo-item"}>
          {open && (
            <>
              <input
                type="text"
                placeholder="Digite aqui"
                value={task}
                onChange={handleChange}
                data-cy="input-add"
              />
              <button onClick={() => handleNovoItem()} data-cy="button-add">
                Add
              </button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Coluna;
