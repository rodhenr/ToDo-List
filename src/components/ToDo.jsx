import Item from "./Item";
import "../styles/ToDo.scss";

function ToDo() {
  const itens = ["Primeira Tarefinha", "Segunda Tarefinha"];

  return (
    <div className="container-fazer">
      <h1>Para Fazer</h1>
      <div className="container-item-fazer">
        {itens.map((i, key) => {
          return (
            <div className="item-fazer">
              <Item dados={i} key={key} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ToDo;
