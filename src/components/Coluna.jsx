import { useState } from "react";
import { useDrop } from "react-dnd";
const { v4: uuidv4 } = require("uuid");

function Coluna({ children, className, titulo, salvarNovoItem }) {
  const [novoItem, setNovoItem] = useState("");
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
        return "#75d17bc8";
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
    setNovoItem(value);
  }

  function handleNovoItem() {
    if (novoItem !== "") {
      salvarNovoItem(uuidv4(), novoItem, titulo);
      setNovoItem("");
      setOpen(false);
      alert("Novo Item Adicionado!");
    } else {
      return;
    }
  }

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className="coluna-desc">
        <div className="desc">
          <div className="desc-info">
            <span>{titulo}</span>
            <span>|</span>
            <span>{children.length}</span>
          </div>
          <div className="desc-novo">
            <span onClick={handleOpen}>{open ? "-" : "+"}</span>
          </div>
        </div>
        <div className="novo-item">
          {open && (
            <>
              <input
                type="text"
                placeholder="Digite aqui"
                value={novoItem}
                onChange={handleChange}
              />
              <button onClick={handleNovoItem}>Add</button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Coluna;
