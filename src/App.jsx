import { useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { tarefas } from "./components/tarefas";
import { NOME_COLUNAS } from "./components/constants";

import ItemMovivel from "./components/Item";
import Coluna from "./components/Coluna";

import "./styles/App.scss";

function App() {
  const [itens, setItens] = useState(tarefas);
  const isMobile = window.innerWidth < 600;
  const { FAZER, ANDAMENTO, CONCLUIDO } = NOME_COLUNAS;

  const returnItemsForColumn = (columnName) => {
    return itens
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <ItemMovivel
          key={item.id}
          name={item.name}
          setItens={setItens}
          currentColumnName={item.column}
        />
      ));
  };

  return (
    <div className="container">
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Coluna title={FAZER} className="coluna coluna-fazer">
          {returnItemsForColumn(FAZER)}
        </Coluna>
        <Coluna title={ANDAMENTO} className="coluna coluna-andamento">
          {returnItemsForColumn(ANDAMENTO)}
        </Coluna>
        <Coluna title={CONCLUIDO} className="coluna coluna-concluido">
          {returnItemsForColumn(CONCLUIDO)}
        </Coluna>
      </DndProvider>
    </div>
  );
}

export default App;
