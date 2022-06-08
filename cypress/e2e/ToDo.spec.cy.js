describe("todo list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("devem existir 3 colunas e todas devem estar vazias", () => {
    cy.get('[data-cy="coluna"]')
      .should("be.visible")
      .and("have.length", 3)
      .each((el) => {
        cy.wrap(el).contains("Sem itens para exibir");
      });
  });

  it("não deve adicionar um novo item repetido", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);
    cy.addItem("fazer", "item1");
    cy.verificarComItem("fazer", 1);
    cy.addItem("fazer", "item1").then(() => {
      expect(stub.getCall(0)).to.be.calledWith(
        "Item repetido! Digite outra descrição."
      );
    });
    cy.verificarComItem("fazer", 1);
  });

  it("deve acrescentar dois itens em cada coluna verificando a quantidade e no fim conseguir excluí-los verificando a quantidade novamente", () => {
    cy.addItem("fazer", "item1");
    cy.addItem("fazer", "item2");
    cy.verificarComItem("fazer", 2);
    cy.excluirItens("fazer");
    cy.verificarSemItem("fazer");

    cy.addItem("andamento", "item1");
    cy.addItem("andamento", "item2");
    cy.verificarComItem("andamento", 2);
    cy.excluirItens("andamento");
    cy.verificarSemItem("andamento");

    cy.addItem("concluido", "item1");
    cy.addItem("concluido", "item2");
    cy.verificarComItem("concluido", 2);
    cy.excluirItens("concluido");
    cy.verificarSemItem("concluido");
  });

  it("deve arrastar o item para a próxima janela", () => {
    cy.addItem("fazer", "item1");
    cy.addItem("fazer", "item2");
    cy.dragDrop("itens-fazer", "andamento-sem-item");
    cy.get('[data-cy="itens-andamento"]').children().trigger("dragend");
    cy.dragDrop("itens-andamento", "concluido-sem-item");
    cy.dragDrop("itens-concluido", "itens-fazer");
  });
});
