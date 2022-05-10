import Item from "./Item";
import "../styles/Andamento.scss";

function Andamento() {
  const itens = ["Terminar esse projeto"];

  return (
    <div className="container-andamento">
      <h1>Em Andamento</h1>
      <div className="container-item-andamento">
        {itens.map((i, key) => {
          return (
            <div className="item-andamento">
              <Item dados={i} key={key} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Andamento;
