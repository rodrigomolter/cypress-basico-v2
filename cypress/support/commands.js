// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('input[name="firstName"]').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo');
    cy.get('input[name="lastName"]').should('be.visible').type('Molter').should('have.value', 'Molter');
    cy.get('input[id="email"]').should('be.visible').type('email@gmail.com').should('have.value', 'email@gmail.com');
    cy.get('textarea[name="open-text-area"]').should('be.visible')
    .type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique erat lobortis, molestie sapien ut, mollis dui. Donec massa ante, \
     mollis sed neque eu, euismod consectetur lacus. Proin rutrum ex consectetur lacus placerat blandit. Phasellus ultricies ut tortor porttitor tincidunt.", {delay:0})
    //cy.get('button[type="submit"]').click();
    cy.contains('Enviar').click();
})