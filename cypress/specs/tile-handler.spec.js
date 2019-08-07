describe(`<TileHandler/>`, () => {
    it(`as a user, I should able to observe loaded statuses from backend, and able to filter them by pattern`, () => {
        cy.server();
        cy.route('POST', `${Cypress.env('graphql')}`).as('graphql');

        cy.visit('/');
        cy.wait('@graphql');

        cy.get('[data-cy^="-tile-"]').should('exist');

        cy.get('[data-cy="-pattern"]').type('1');
        cy.get('[data-cy^="-tile-"][disabled]').should('exist');
    });

    it(`as a user, I should NOT able to create status with empty name`, () => {
        cy.visit('/');

        cy.get('[data-cy="-add"]').click();

        cy.get('[data-cy="form-action-submit"]').click();

        cy.get('[data-cy="section-0-input-0-error-0"]').should('exist');
    });

    it(`as a user, I should able to create new ROOT status and find it in statuses later`, () => {
        const salt = Cypress.moment().format('YYYY/MM/DD HH:mm:ss');
        cy.server();
        cy.route('POST', `${Cypress.env('graphql')}`).as('graphql');

        cy.visit('/');

        cy.get('[data-cy="-add"]').click();

        cy.get('[data-cy="section-0-input-0"]').type(`created by cypress at ${salt}`);
        cy.get('[data-cy="form-action-submit"]').click();

        cy.wait('@graphql');
        cy.get('[data-cy="form-action-submit"]').should('not.exist');
        cy.get('[data-cy="form-action-update"]').should('exist');

        cy.visit('/');
        cy.wait('@graphql');

        cy.get('[data-cy="-pattern"]').type(salt);
        cy.get('[data-cy^="-tile-"]:not([disabled])').should('exist');
    });

    it(`as a user, I should able to create new CHILDREN status and find it in statuses later`, () => {
        const salt = Cypress.moment().format('YYYY/MM/DD HH:mm:ss');
        cy.server();
        cy.route('POST', `${Cypress.env('graphql')}`).as('graphql');

        cy.visit('/');

        cy.get('[data-cy="-add"]').click();

        cy.get('[data-cy="section-0-input-0"]').type(`created by cypress at ${salt}`);
        cy.get('[data-cy="section-0-input-1"]').trigger('mouseOver');
        cy.get('[data-cy="section-0-input-1"]').type(`a`);
        cy.wait('@graphql');

        cy.get('[data-cy="section-0-input-1-suggestion-0"]').click();
        /** because overlap, force: true required */
        cy.get('[data-cy="form-action-submit"]').click({ force: true });

        cy.wait('@graphql');
        cy.get('[data-cy="form-action-update"]').should('exist');

        cy.visit('/');
        cy.wait('@graphql');

        cy.get('[data-cy="-pattern"]').type(salt);
        cy.get('[data-cy^="-tile-"]:not([disabled])').should('exist');
    });

    it(`as a user, I should able to update existing status, and see it reflected in tree`, () => {
        const salt = Cypress.moment().format('YYYY/MM/DD HH:mm:ss');
        cy.server();
        cy.route('POST', `${Cypress.env('graphql')}`).as('graphql');

        cy.visit('/');

        cy.get('[data-cy^="-tile"]').last().click();

        cy.get('[data-cy="section-0-input-0"]').clear().type(`updated by cypress at ${salt}`);

        cy.get('[data-cy="form-action-update"]').click();

        cy.wait('@graphql');

        cy.visit('/');
        cy.wait('@graphql');

        cy.get('[data-cy="-pattern"]').type(`updated by cypress at ${salt}`);
        cy.get('[data-cy^="-tile-"]:not([disabled])').should('exist');

        cy.get('[data-cy^="-tile-"]:not([disabled])').click();
        cy.get('[data-cy="tree-node-0"]').should('contain', salt);
    });

    it(`as a user, I should able to search in tree of hierarchy, inside status`, () => {
        cy.server();
        cy.route('POST', `${Cypress.env('graphql')}`).as('graphql');

        cy.visit('/');

        cy.get('[data-cy^="-tile"]').first().click();

        cy.wait(['@graphql','@graphql']);

        cy.get('[data-cy="tree-pattern"]').type('sta');
        cy.get('[data-cy^="tree-node-0"]').should('to.have.length.of.at.least', 2);

        cy.get('[data-cy="tree-pattern"]').clear().type('weird not existing status name');
        cy.get('[data-cy^="tree-node-0"]').should('to.have.length.of.at.least', 0);
    });

    it(`as a user, I should NOT see prefillied values, if I previously views existing status`, () => {
        cy.server();
        cy.route('POST', `${Cypress.env('graphql')}`).as('graphql');

        cy.visit('/');

        cy.get('[data-cy^="-tile"]').first().click();

        cy.wait(['@graphql','@graphql']);

        cy.get('[data-cy="-modal-close"]').click();

        cy.get('[data-cy="-add"]').click();

        cy.get('[data-cy="section-0-input-0"]').should('not.have.value');
        cy.get('[data-cy="section-0-input-1-pill-0"]').should('not.exist');
    });
});
