import {
  useGetTodosQuery,
  useAddTodoMutation,
} from "../features/users/userApiSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import Item from "../features/users/Item";
import Coluna from "../features/users/Coluna";
import "../styles/App.scss";

function HomeAuth() {
  const { data = [], isSuccess } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const isMobile = window.innerWidth < 600;

  const options = [
    { coluna: "Para Fazer", short: "fazer" },
    { coluna: "Em Andamento", short: "andamento" },
    { coluna: "Concluído", short: "concluido" },
  ];

  //Filtra os itens de cada coluna e os exibe
  const exibirItens = (nomeColuna) => {
    return data.data
      .filter((i) => i.task_desc.coluna === nomeColuna)
      .map((item) => (
        <Item
          key={item.task_uuid}
          task_id={item.task_uuid}
          desc={item.task_desc.task}
          coluna={item.task_desc.coluna}
        />
      ));
  };

  const handleAddTodo = (task, coluna) => {
    if (task === "" || data.data.some((i) => i.task_desc.task === task)) {
      alert("Item repetido! Digite outra descrição.");
    } else {
      addTodo({ item: { task, coluna } });
    }
  };

  return (
    <>
      {isSuccess ? (
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
                    {exibirItens(coluna.coluna).length > 0 ? (
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
      ) : null}
    </>
  );
}

export default HomeAuth;

/*
        <div className="main-container">
          <div className="todos-container">
            <div className="container-colunas">
              <DndProvider
                backend={isMobile ? TouchBackend : HTML5Backend}
                options={{ enableMouseEvents: true }}
              >
                <Coluna
                  titulo={FAZER}
                  handleAddTodo={handleAddTodo}
                  className="coluna coluna-fazer"
                >
                  {exibirItens(FAZER).length > 0 ? (
                    <div className="gap-coluna" data-cy="itens-fazer">
                      {exibirItens(FAZER)}
                    </div>
                  ) : (
                    <div className="coluna-sem-item" data-cy="fazer-sem-item">
                      <p>Sem itens para exibir</p>
                    </div>
                  )}
                </Coluna>
                <Coluna
                  titulo={ANDAMENTO}
                  handleAddTodo={handleAddTodo}
                  className="coluna coluna-andamento"
                >
                  {exibirItens(ANDAMENTO).length > 0 ? (
                    <div className="gap-coluna" data-cy="itens-andamento">
                      {exibirItens(ANDAMENTO)}
                    </div>
                  ) : (
                    <div
                      className="coluna-sem-item"
                      data-cy="andamento-sem-item"
                    >
                      <p>Sem itens para exibir</p>
                    </div>
                  )}
                </Coluna>
                <Coluna
                  titulo={CONCLUIDO}
                  handleAddTodo={handleAddTodo}
                  className="coluna coluna-concluido"
                >
                  {exibirItens(CONCLUIDO).length > 0 ? (
                    <div className="gap-coluna" data-cy="itens-concluido">
                      {exibirItens(CONCLUIDO)}
                    </div>
                  ) : (
                    <div
                      className="coluna-sem-item"
                      data-cy="concluido-sem-item"
                    >
                      <p>Sem itens para exibir</p>
                    </div>
                  )}
                </Coluna>
              </DndProvider>
            </div>
          </div>
        </div>
*/
