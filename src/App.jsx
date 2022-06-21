import { useSelector } from "react-redux";
import { useGetAllTodosQuery } from "./store/api/apiSlice";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { NOME_COLUNAS } from "./components/constants";

import ItemMovivel from "./components/Item";
import Coluna from "./components/Coluna";

import "./styles/App.scss";

function App() {
  const { data = [], isSuccess } = useGetAllTodosQuery(); // API
  const isMobile = window.innerWidth < 600;
  const { FAZER, ANDAMENTO, CONCLUIDO } = NOME_COLUNAS;

  //Filtra os itens de cada coluna e os exibe
  const exibirItens = (nomeColuna) => {
    return data.data[0].item
      .filter((i) => i.coluna === nomeColuna)
      .map((item) => (
        <ItemMovivel key={item.id} id={item.id} desc={item.desc} />
      ));
  };

  return (
    <>
      {isSuccess ? (
        <div className="container">
          <h1>TODO LIST</h1>
          <div className="container-colunas">
            <DndProvider
              backend={isMobile ? TouchBackend : HTML5Backend}
              options={{ enableMouseEvents: true }}
            >
              <Coluna titulo={FAZER} className="coluna coluna-fazer">
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
              <Coluna titulo={ANDAMENTO} className="coluna coluna-andamento">
                {exibirItens(ANDAMENTO).length > 0 ? (
                  <div className="gap-coluna" data-cy="itens-andamento">
                    {exibirItens(ANDAMENTO)}
                  </div>
                ) : (
                  <div className="coluna-sem-item" data-cy="andamento-sem-item">
                    <p>Sem itens para exibir</p>
                  </div>
                )}
              </Coluna>
              <Coluna titulo={CONCLUIDO} className="coluna coluna-concluido">
                {exibirItens(CONCLUIDO).length > 0 ? (
                  <div className="gap-coluna" data-cy="itens-concluido">
                    {exibirItens(CONCLUIDO)}
                  </div>
                ) : (
                  <div className="coluna-sem-item" data-cy="concluido-sem-item">
                    <p>Sem itens para exibir</p>
                  </div>
                )}
              </Coluna>
            </DndProvider>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
