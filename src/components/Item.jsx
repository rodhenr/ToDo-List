import { useDrag } from "react-dnd";

import { NOME_COLUNAS } from "./constants";

import "../styles/Item.scss";

function Item({ desc, setItens, colunaAtual }) {
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { desc, colunaAtual },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult(); // Objeto contendo o local aonde foi dropado o item
      if (dropResult) {
        const { nomeColuna } = dropResult;
        const { FAZER, ANDAMENTO, CONCLUIDO } = NOME_COLUNAS;
        switch (nomeColuna) {
          case ANDAMENTO:
            mudarColunaItem(item, ANDAMENTO);
            break;
          case CONCLUIDO:
            mudarColunaItem(item, CONCLUIDO);
            break;
          case FAZER:
            mudarColunaItem(item, FAZER);
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

  // Percorre o state em busca do item e altera o nome de sua coluna
  function mudarColunaItem(item, nomeColuna) {
    setItens((prevState) => {
      return prevState.map((i) => {
        return {
          ...i,
          coluna: i.desc === item.desc ? nomeColuna : i.coluna,
        };
      });
    });
  }

  return (
    <div ref={drag} className="item" style={{ opacity }}>
      {desc}
    </div>
  );
}

export default Item;
