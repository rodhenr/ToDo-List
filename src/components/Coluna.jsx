import { useDrop } from "react-dnd";
import "../styles/App.scss";

function Coluna({ children, className, title }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "item",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
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

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  );
}

export default Coluna;
