import Andamento from "./components/Andamento";
import Concluido from "./components/Concluido";
import ToDo from "./components/ToDo";
import "./styles/App.scss";

function App() {
  return (
    <div className="container">
      <div className="container-add">
        <p>Adicione:</p>
        <div>
          <input type="text" placeholder="Nova tarefa" />
          <button>Enviar</button>
        </div>
      </div>
      <div className="container-main">
        <ToDo />
        <Andamento />
        <Concluido />
      </div>
    </div>
  );
}

export default App;
