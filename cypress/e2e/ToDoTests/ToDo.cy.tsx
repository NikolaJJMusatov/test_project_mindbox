describe('проверяем функциональность', () => {
  it('появляется ToDo в списке All', () => {
      cy.visit('http://localhost:5173');

      cy.get('input').type('1. написать 1 тест');
      cy.contains('Add ToDo').click();
      cy.get('ul').find('li').contains('1. написать 1 тест')
      
  });

  it('появляется ToDo в списке Completed', () => {
    cy.visit('http://localhost:5173');

    cy.get('input').type('1. написать 2 тест');
    cy.contains('Add ToDo').click();
    cy.get('ul').find('li').find('input').click();
    cy.contains('Completed').click();
    cy.get('ul').find('li').contains('1. написать 2 тест')
  });

  it('значение Items left меняется с 0 на 1', () => {
    cy.visit('http://localhost:5173');

    cy.get('input').type('1. написать 3 тест');
    cy.contains('Add ToDo').click();
    cy.get('.nav_menu_count').contains('0 ITEMS LEFT')
    cy.get('ul').find('li').find('input').click();
    cy.get('.nav_menu_count').contains('1 ITEMS LEFT')
  });

  it('выполненное ToDo удаляется', () => {
    cy.visit('http://localhost:5173');

    cy.get('input').type('1. написать 4 тест');
    cy.contains('Add ToDo').click();
    cy.get('ul').find('li').find('input').click();
    cy.contains('Clear Completed').click();

    cy.get('ul').find('li').should('not.exist');
    cy.get('.nav_menu_count').contains('0 ITEMS LEFT')

  });

});