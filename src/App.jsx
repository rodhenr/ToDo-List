import { useEffect, useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { NOME_COLUNAS } from "./components/constants";

import ItemMovivel from "./components/Item";
import Coluna from "./components/Coluna";

import "./styles/App.scss";

function App() {
  const [itens, setItens] = useState(
    localStorage.getItem("itensSalvos") !== null
      ? JSON.parse(localStorage.getItem("itensSalvos"))
      : []
  );
  const isMobile = window.innerWidth < 600;

  const { FAZER, ANDAMENTO, CONCLUIDO } = NOME_COLUNAS;

  useEffect(() => {
    localStorage.setItem("itensSalvos", JSON.stringify(itens));
  }, [itens]);

  function salvarNovoItem(id, desc, coluna) {
    const repetido = itens.some((i) => i.desc === desc);

    if (!repetido) {
      setItens((prevState) => {
        return [...prevState, { id, desc, coluna }];
      });
    } else {
      alert("Item repetido! Digite outra descrição.");
    }
  }

  function excluirItem(id) {
    const novoArray = itens.filter((i) => i.id !== id);
    setItens(novoArray);
  }

  function mudarItens(array) {
    setItens(array);
  }

  //Filtra os itens de cada coluna e os exibe
  const exibirItens = (nomeColuna) => {
    return itens
      .filter((i) => i.coluna === nomeColuna)
      .map((item) => (
        <ItemMovivel
          id={item.id}
          key={item.id}
          desc={item.desc}
          itens={itens}
          setItens={mudarItens}
          colunaAtual={item.coluna}
          excluirItem={excluirItem}
        />
      ));
  };

  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <div className="container-colunas">
        <DndProvider
          backend={isMobile ? TouchBackend : HTML5Backend}
          options={{ enableMouseEvents: true }}
        >
          <Coluna
            titulo={FAZER}
            className="coluna coluna-fazer"
            salvarNovoItem={salvarNovoItem}
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
            className="coluna coluna-andamento"
            salvarNovoItem={salvarNovoItem}
          >
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
          <Coluna
            titulo={CONCLUIDO}
            className="coluna coluna-concluido"
            salvarNovoItem={salvarNovoItem}
          >
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
  );
}

export default App;
