beforeEach(() => {
  cy.visit('./src/index.html')
  cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  cy.clock()
})
describe('Central de Atendimento ao Cliente TAT', () => {

  context('sucessfuly', () => {
    it('exibe mensagem de sucesso ao preencher os campos obrigatórios e enviar o formulário', () => {
      cy.fillMandatoryFieldsAndSubmit()
      cy.checkSucessMessage()
    })
  })

  context('failure', () => {
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.fillMandatoryFieldsAndSubmit({ email: 'email@gmail,com' })
      cy.checkErrorMessage()
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#phone-checkbox').check()
      cy.fillMandatoryFieldsAndSubmit()
      cy.checkErrorMessage()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.contains('Enviar').click()
      cy.checkErrorMessage()
    })
  })
})
