import { useDrag } from "react-dnd";
import { NOME_COLUNAS } from "./constants";
import "../styles/Item.scss";

function Item({ name, setItens, currentColumnName }) {
  const changeItemColumn = (currentItem, columnName) => {
    setItens((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column,
        };
      });
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { FAZER, ANDAMENTO, CONCLUIDO } = NOME_COLUNAS;
        switch (name) {
          case ANDAMENTO:
            changeItemColumn(item, ANDAMENTO);
            break;
          case CONCLUIDO:
            changeItemColumn(item, CONCLUIDO);
            break;
          case FAZER:
            changeItemColumn(item, FAZER);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="item" style={{ opacity }}>
      {name}
    </div>
  );
}

export default Item;
