import Item from "./Item";
import "../styles/Concluido.scss";

function Concluido() {
  const itens = ["Tirar o lixo", "Terminar o segunda projeto", "Limpar a casa", "Guardar as roupas"];

  return (
    <div className="container-concluido">
      <h1>Concluído</h1>
      <div className="container-item-concluido">
        {itens.map((i, key) => {
          return (
            <div className="item-concluido">
              <Item dados={i} key={key} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Concluido;
