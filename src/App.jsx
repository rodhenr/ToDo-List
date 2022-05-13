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
    setItens((prevState) => {
      return [...prevState, { id, desc, coluna }];
    });
  }

  function excluirItem(id) {
    const novoArray = itens.filter((i) => i.id !== id);
    setItens(novoArray);
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
          setItens={setItens}
          colunaAtual={item.coluna}
          excluirItem={excluirItem}
        />
      ));
  };

  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <div className="container-colunas">
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <Coluna
            titulo={FAZER}
            className="coluna coluna-fazer"
            salvarNovoItem={salvarNovoItem}
          >
            {exibirItens(FAZER)}
          </Coluna>
          <Coluna
            titulo={ANDAMENTO}
            className="coluna coluna-andamento"
            salvarNovoItem={salvarNovoItem}
          >
            {exibirItens(ANDAMENTO)}
          </Coluna>
          <Coluna
            titulo={CONCLUIDO}
            className="coluna coluna-concluido"
            salvarNovoItem={salvarNovoItem}
          >
            {exibirItens(CONCLUIDO)}
          </Coluna>
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
