// Example Cypress E2E test (requires Cypress setup)
describe('Dashboard E2E', () => {
  it('should load content and allow category change', () => {
    cy.visit('/');
    cy.get('select').select('sports');
    cy.get('.grid').children().should('have.length.greaterThan', 0);
  });

  it('should perform search', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search content..."]').type('test');
    cy.wait(600); // Wait for debounce
    cy.get('.grid').children().should('exist');
  });
});