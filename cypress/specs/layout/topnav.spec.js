describe(`<TopNav/>`, () => {
    it(`should have logo and github links`, () => {
        cy.visit('/');

        cy.get('[data-cy="topnav-main"]').should('exist');
        cy.get('[data-cy="topnav-github"]').should('exist');
    });
});
