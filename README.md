## :ledger: Descrição do Projeto

Essa é uma aplicação de lista de tarefas, onde você pode arrastar os itens entre 3 categorias diferentes. Ela possui duas de funcionamento:

- A primeira delas é no modo anônimo onde não requer um cadastro e as informações são salvas pelo redux e persistidas caso aconteça um refresh na página.

- A segunda forma funciona utilizando **Sequelize** e o **Node.js** juntamente com o front-end. Com este método é possível realizar cadastros de usuários e fazer login para que cada usuário salve suas informações na database.

<p align="center">
<img alt="gif" src="https://media2.giphy.com/media/audXC31R5yFycYqWaZ/giphy.gif?cid=790b76112cf40aed7e826bfca8b829258764ac44c7b1e055&rid=giphy.gif&ct=g" />
</p>

## :man_technologist: Tecnologias

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
- [Sequelize](https://sequelize.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [UUID](https://www.uuidgenerator.net/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## :dvd: Como replicar este projeto

### Front-End

Para replicar esse projeto de forma local no seu computador siga os passos abaixo:

- Você deve fazer o download/clone deste repositório para seu computador e o abrir na sua IDE.

```
1. Execute o comando npm i para instalar as dependências do projeto
2. Execute o comando npm start para rodar localmente na porta 3000
```

### Back-End

Caso queira também rodar a parte do servidor e banco de dados na sua máquina, siga os passos adicionais:

- Você deve possuir o MySQL instalado na sua máquina (neste projeto utilizei a versão 8.0).
- Você deve fazer o download/clone do [Repositório](https://github.com/rodhenr/ToDo-List-BackEnd) e o abrir em uma nova janela na sua IDE.

```
1. Crie uma nova database no seu MySQL com o comando "CREATE DATABASE nomedatabase;"
2. Execute o comando npm i para instalar as dependências do projeto
3. No arquivo .env altere as informações de acordo com as suas configurações
4. Execute o comando "npx sequelize-cli db:migrate" para executar as migrations do sequelize e as tabelas da sua database serem criadas
5. Execute o comando npm run dev para rodar o servidor localmente
6. Se tudo estiver configurado corretamente irá aparecer a mensagem "Servidor iniciado na porta ..." no console
```

_OBS: Arquivos .env podem possuir informações sensíveis e caso você queira subir seu projeto para o github é aconselhável que o .env seja acrescentado no seu arquivo .gitignore_

## :grin: Dúvidas ou sugestões?

Caso tenha alguma dúvida ou alguma sugestão fico no aguardo da sua mensagem!
