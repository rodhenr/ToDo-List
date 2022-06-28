import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../features/anom/anomSlice";

import { v4 as uuidv4 } from "uuid";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import Item from "../features/anom/Item";
import Coluna from "../features/anom/Coluna";

import "../styles/Home.scss";

function Home() {
  const data = useSelector(getTodos);
  const dispatch = useDispatch();
  const isMobile = window.innerWidth < 600;
  const itensFazer = data.filter((i) => i.task_desc.coluna === "Para Fazer");
  const itensAndamento = data.filter(
    (i) => i.task_desc.coluna === "Em Andamento"
  );
  const itensConcluido = data.filter((i) => i.task_desc.coluna === "Concluído");

  const options = [
    { coluna: "Para Fazer", short: "fazer", itens: itensFazer },
    { coluna: "Em Andamento", short: "andamento", itens: itensAndamento },
    { coluna: "Concluído", short: "concluido", itens: itensConcluido },
  ];

  const exibirItens = (nomeColuna) => {
    return data
      .filter((i) => i.task_desc.coluna === nomeColuna)
      .map((item) => (
        <Item
          coluna={item.task_desc.coluna}
          desc={item.task_desc.task}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          key={item.task_id}
          task_id={item.task_id}
        />
      ));
  };

  const handleAddTodo = (task, titulo) => {
    if (task !== "" && data.some((i) => i.task_desc.task === task)) {
      alert("Item repetido! Digite outra descrição.");
    } else {
      const task_id = uuidv4();
      const newItem = { task_id, task_desc: { task, coluna: titulo } };
      dispatch(addTodo(newItem));
    }
  };

  const handleUpdateTodo = (task_id, task_desc) => {
    if (task !== "" && data.some((i) => i.task_desc.task === task)) {
      alert("Item repetido! Digite outra descrição.");
    } else {
      dispatch(updateTodo({ task_id, task_desc }));
    }
  };

  const handleDeleteTodo = (task_id) => {
    dispatch(deleteTodo(task_id));
  };

  return (
    <main className="home">
      <div className="home-colunas">
        <DndProvider
          backend={isMobile ? TouchBackend : HTML5Backend}
          options={{ enableMouseEvents: true }}
        >
          {options.map((coluna, index) => (
            <section key={index}>
              <Coluna
                titulo={coluna.coluna}
                handleAddTodo={handleAddTodo}
                className={`coluna coluna-${coluna.short}`}
              >
                {coluna.itens.length > 0 ? (
                  <div
                    className="coluna-itens"
                    data-cy={`itens-${coluna.short}`}
                  >
                    {exibirItens(coluna.coluna)}
                  </div>
                ) : (
                  <div
                    className="coluna-sem-item"
                    data-cy={`${coluna.short}-sem-item`}
                  >
                    <p>Sem itens para exibir</p>
                  </div>
                )}
              </Coluna>
            </section>
          ))}
        </DndProvider>
      </div>
    </main>
  );
}

export default Home;
