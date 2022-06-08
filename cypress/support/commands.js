Cypress.Commands.add("addItem", (coluna, texto) => {
  cy.get(`.coluna-${coluna}`).find('[data-cy="novo-item"]').click();
  cy.get(`.coluna-${coluna}`).then((el) => {
    const item = cy.wrap(el);

    item.get('[data-cy="input-add"]').type(texto);
    item.get('[data-cy="button-add"]').click();
  });
});

Cypress.Commands.add("excluirItens", (coluna) => {
  cy.get(`[data-cy="itens-${coluna}"]`)
    .children()
    .each((el) => {
      cy.wrap(el).find('[data-cy="excluir-item"]').click();
    });
});

Cypress.Commands.add("verificarComItem", (coluna, qtd) => {
  cy.get(`[data-cy="itens-${coluna}"]`)
    .children()
    .should("have.length", qtd)
    .and("be.visible");
});

Cypress.Commands.add("verificarSemItem", (coluna) => {
  cy.get(`[data-cy="${coluna}-sem-item"]`)
    .should("have.text", "Sem itens para exibir")
    .and("be.visible");
});

Cypress.Commands.add("dragDrop", (item, alvo) => {
  cy.get(`[data-cy="${item}"]`).children().first().trigger("dragstart");
  cy.get(`[data-cy="${alvo}"]`).trigger("drop");
});
