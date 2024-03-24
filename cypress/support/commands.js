const THREE_SECONDS_IN_MS = 3000

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (fields = {}) => {
  const {
    firstName = 'Rodrigo',
    lastName = 'Molter',
    email = 'rodrigo@email.com',
    textArea = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique erat lobortis, molestie sapien ut, mollis dui'
  } = fields

  cy.get('input[name="firstName"]')
    .should('be.visible')
    .type(firstName)

  cy.get('input[name="lastName"]')
    .should('be.visible')
    .type(lastName)

  cy.get('input[id="email"]')
    .should('be.visible')
    .type(email)

  cy.get('textarea[name="open-text-area"]')
    .should('be.visible')
    .type(textArea, {delay:0})

  cy.contains('Enviar').click()
})

Cypress.Commands.add('checkSucessMessage', () => {
  cy.get('.success').should('be.visible')
  cy.tick(THREE_SECONDS_IN_MS)
  cy.get('.success').should('not.be.visible')
})

Cypress.Commands.add('checkErrorMessage', () => {
  cy.get('.error').should('be.visible')
  cy.tick(THREE_SECONDS_IN_MS)
  cy.get('.error').should('not.be.visible')
})