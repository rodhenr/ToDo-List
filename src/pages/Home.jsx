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

import "../styles/App.scss";

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
          key={item.task_id}
          task_id={item.task_id}
          task={item.task_desc.task}
          coluna={item.task_desc.coluna}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ));
  };

  const handleAddTodo = (newTask, titulo) => {
    if (newTask !== "" && data.some((i) => i.task_desc.task === newTask)) {
      alert("Item repetido! Digite outra descrição.");
    } else {
      const task_id = uuidv4();
      const newItem = { task_id, task_desc: { task: newTask, coluna: titulo } };
      dispatch(addTodo(newItem));
    }
  };

  const handleUpdateTodo = (task_id, task_desc) => {
    dispatch(updateTodo({ task_id, task_desc }));
  };

  const handleDeleteTodo = (task_id) => {
    dispatch(deleteTodo(task_id));
  };

  return (
    <div className="main-container">
      <div className="todos-container">
        <div className="container-colunas">
          <DndProvider
            backend={isMobile ? TouchBackend : HTML5Backend}
            options={{ enableMouseEvents: true }}
          >
            {options.map((coluna, index) => (
              <div key={index}>
                <Coluna
                  titulo={coluna.coluna}
                  handleAddTodo={handleAddTodo}
                  className={`coluna coluna-${coluna.short}`}
                >
                  {coluna.itens.length > 0 ? (
                    <div
                      className="gap-coluna"
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
              </div>
            ))}
          </DndProvider>
        </div>
      </div>
    </div>
  );
}

export default Home;
