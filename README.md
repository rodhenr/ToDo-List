Essa é uma aplicação de lista de tarefas, onde você pode arrastar os itens entre 3 categorias diferentes.

Ela funciona de **duas formas**:

- A primeira delas é no modo anônimo **(off-line)** onde não requer um cadastro e as informações são salvas pelo redux e persistidas caso acontece um refresh na página.

- A segunda forma funciona juntamente com um **banco de dados**(nesse caso utilizei o MySQL) e um servidor **back-end**(utilizei Node), onde é possível realizar cadastros de usuários e fazer login para que cada usuário salve as informações não mais no redux mas sim na database.

## Funcionamento

Para este projeto foram utilizadas as seguintes tecnologias:

**FRONT-END**

- [React](https://pt-br.reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [SASS](https://sass-lang.com/)
- [Cypress](https://www.cypress.io/)
- [FontAwesome](https://fontawesome.com/)
- [React DnD](https://react-dnd.github.io/react-dnd/about)

**BACK-END**

- [Express](https://expressjs.com/pt-br/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [UUID](https://www.uuidgenerator.net/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## Tutorial

Para replicar esse projeto no seu computador siga os passos abaixo:

1 - Faça o download deste arquivo clicando em **"Code"** (em verde) e depois em **"Download ZIP"**. Após o download descompacte o arquivo e abra a pasta no seu IDE.

2 - Execute o comando **"npm i"** para instalar as dependências do projeto.

3 - Execute o comando **"npm start"** para rodar localmente na porta 3000.

Caso queira também rodar a parte de servidor e banco de dados, siga os passos adicionais abaixo:

4 - Vá até o link [Backend-ToDo-List](https://github.com/rodhenr/Backend-ToDo-List) e faça o download clicando em **"Code"** (em verde) e depois em **"Download ZIP"**. Após o download descompacte o arquivo e abra a pasta em uma **nova janela** no seu IDE.

5 - Execute o comando **"npm i"** para instalar as dependências do projeto.

6 - No arquivo **".env"** altere as informações de acordo com sua necessidade **(é aconselhável que você adicione o arquivo .env no seu gitignore caso você coloque informações sensíveis e suba o projeto para o github)**.

7 - Execute o comando **"npm start"** para rodar localmente na porta especificada no **".env"** ou na porta **8080** por padrão.

## Live Demo

Para visualização de uma versão demo do site clique [aqui](https://rodhenr.github.io/ToDo-List/).
