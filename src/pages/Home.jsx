import {
  useGetTodosQuery,
  useAddTodoMutation,
} from "../features/users/userApiSlice";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { NOME_COLUNAS } from "../components/constants";

import { selectLogin } from "../features/users/userSlice";
import { useSelector } from "react-redux";

import ItemMovivel from "../components/Item";
import Coluna from "../components/Coluna";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Login from "../components/Login";

import "../styles/App.scss";

function Home() {
  const isMobile = window.innerWidth < 600;
  const { FAZER, ANDAMENTO, CONCLUIDO } = NOME_COLUNAS;
  const login = useSelector(selectLogin);
  const { data = [], isSuccess } = useGetTodosQuery();

  //Filtra os itens de cada coluna e os exibe
  const exibirItens = (nomeColuna) => {
    return data
      .filter((i) => i.task_desc.coluna === nomeColuna)
      .map((item) => (
        <ItemMovivel
          key={item.task_id}
          task_id={item.task_id}
          desc={item.task_desc.task}
          coluna={item.task_desc.coluna}
        />
      ));
  };

  const handleAddTodo = (newDesc, titulo) => {
    if (newDesc !== "") {
      const itemRepetido = data.data.some((i) => i.task_desc.task === newDesc);
      if (itemRepetido) {
        alert("Item repetido! Digite outra descrição.");
      } else {
      }
    } else {
      return;
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className="main-container">
          {login && <Login />}
          <Navbar />
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
          <Footer />
        </div>
      ) : null}
    </>
  );
}

export default Home;