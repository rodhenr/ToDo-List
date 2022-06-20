import { useEffect, useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { NOME_COLUNAS } from "./components/constants";

import axios from "axios";

import ItemMovivel from "./components/Item";
import Coluna from "./components/Coluna";

import "./styles/App.scss";

function App() {
  const [itens, setItens] = useState([]);
  const isMobile = window.innerWidth < 600;
  const { FAZER, ANDAMENTO, CONCLUIDO } = NOME_COLUNAS;

  useEffect(() => {
    const fetchDB = async () => {
      const response = await axios
        .get("http://localhost:8080/")
        .then((resp) => {
          if (resp.data.data[0]) {
            return resp.data.data[0].item;
          } else {
            return [];
          }
        });
      setItens(response);
    };

    fetchDB();
  }, []);

  async function salvarNovoItem(id, desc, coluna) {
    const repetido = itens.some((i) => i.desc === desc);

    if (!repetido) {
      const novoArray = [...itens, { id, desc, coluna }];

      await axios.patch("http://localhost:8080/", {
        item: JSON.stringify(novoArray),
      });

      setItens(novoArray);
    } else {
      alert("Item repetido! Digite outra descrição.");
    }
  }

  async function excluirItem(id) {
    const novoArray = itens.filter((i) => i.id !== id);

    await axios.patch("http://localhost:8080/", {
      item: JSON.stringify(novoArray),
    });

    setItens(novoArray);
  }

  async function mudarItens(array) {
    await axios.patch("http://localhost:8080/", {
      item: JSON.stringify(array),
    });

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
