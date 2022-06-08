import { useDrag } from "react-dnd";

import { NOME_COLUNAS } from "./constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "../styles/Item.scss";

function Item({ desc, setItens, colunaAtual, excluirItem, id, itens }) {
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

  function mudarColunaItem(item, nomeColuna) {
    const valorAlterar = itens.filter((i) => i.desc === item.desc);
    const novoArray = itens.filter((i) => i.desc !== item.desc);

    valorAlterar[0].coluna = nomeColuna;
    novoArray.push(...valorAlterar);

    setItens(novoArray);
  }

  return (
    <div ref={drag} className="item" style={{ opacity }} data-cy="item">
      <div className="item-circle"></div>
      {desc}
      <span onClick={() => excluirItem(id)} data-cy="excluir-item">
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
}

export default Item;
