## Descrição do Projeto

Essa é uma aplicação de lista de tarefas, onde você pode arrastar os itens entre 3 categorias diferentes.

Ela funciona de **duas formas**:

- A primeira delas é no modo anônimo **(off-line)** onde não requer um cadastro e as informações são salvas pelo redux e persistidas caso aconteça um refresh na página.

- A segunda forma funciona utilizando **MySQL** e o **Node.js** juntamente com o front-end. Com este método é possível realizar cadastros de usuários e fazer login para que cada usuário salve suas informações na database.

## Tecnologias

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

## Como replicar este projeto

Para replicar esse projeto no seu computador siga os passos abaixo:

1. Faça o download/clone deste repositório para seu computador e abra-o na sua IDE.
2. Execute o comando *npm i* para instalar as dependências do projeto.
3. Execute o comando *npm start* para rodar localmente na porta 3000.

Seguindo estes 3 passos você será capaz de rodar este projeto de forma local na sua máquina.

Caso você queira também rodar a parte do servidor e banco de dados na sua máquina, siga os passos adicionais abaixo:

1. Você deve possuir o MySQL instalado na sua máquina (neste projeto utilizei a versão 8.0).
2. Faça o download/clone do repositório **[Backend-ToDo-List](https://github.com/rodhenr/Backend-ToDo-List)** e abra-o em uma nova janela no seu IDE.
3. Execute o comando *npm i* para instalar as dependências do projeto.
4. No arquivo *.env* altere as informações de acordo com sua necessidade **(lembrando que arquivos .env podem possuir informações sensíveis e caso você queira subir seu projeto para o github é aconselhável que o .env seja acrescentado no seu arquivo .gitignore)**.
5. Execute o comando *npm run dev* para rodar o servidor localmente utilizando o nodemon na porta especificada no **".env"** ou por padrão na porta *8080*.

## Live Demo

Para visualização de uma versão demo do site clique [aqui](https://rodhenr.github.io/ToDo-List/).
