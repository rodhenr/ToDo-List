import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "../features/users/userApiSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import Item from "../features/users/Item";
import Coluna from "../features/users/Coluna";

import "../styles/Home.scss";

function HomeAuth() {
  const { data = [], isSuccess } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const isMobile = window.innerWidth < 600;

  const options = [
    { coluna: "Para Fazer", short: "fazer" },
    { coluna: "Em Andamento", short: "andamento" },
    { coluna: "Concluído", short: "concluido" },
  ];

  const exibirItens = (nomeColuna) => {
    return data.data
      .filter((i) => i.task_desc.coluna === nomeColuna)
      .map((item) => (
        <Item
          coluna={item.task_desc.coluna}
          desc={item.task_desc.task}
          handleEditTodo={handleEditTodo}
          key={item.task_uuid}
          task_id={item.task_uuid}
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

  const handleEditTodo = (id, task, coluna) => {
    if (task === "" || data.data.some((i) => i.task_desc.task === task)) {
      alert("Item repetido! Digite outra descrição.");
    } else {
      updateTodo({ task_uuid: id, task_desc: { task, coluna } });
    }
  };

  return (
    isSuccess && (
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
                  {exibirItens(coluna.coluna).length > 0 ? (
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
    )
  );
}

export default HomeAuth;
