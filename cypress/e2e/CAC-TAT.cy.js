beforeEach(() => {
    cy.visit('./src/index.html');
});
describe('Central de Atendimento ao Cliente TAT', () => {
    it('Verifica o titulo da aplicação', () => {
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });
    Cypress._.times(5, () => {
        it('Preenche os campos obrigatórios e envia o formulário', () => {

            const longText = Cypress._.repeat("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique erat lobortis, molestie sapien ut, mollis dui", 5);

            cy.get('#firstName')
            .should('be.visible')
            .type('Rodrigo')
            .should('have.value', 'Rodrigo');

            cy.get('#lastName')
            .should('be.visible')
            .type('Molter')
            .should('have.value', 'Molter');

            cy.get('#email')
            .should('be.visible')
            .type('email@gmail.com')
            .should('have.value', 'email@gmail.com');

            cy.get('#open-text-area')
            .should('be.visible')
            //.type(text, {delay:0});
            .invoke('val', longText)
            .should('have.value', longText)

            cy.contains('Enviar').click();

            cy.checkSucessMessage();

        });
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.get('#firstName')
        .should('be.visible')
        .type('Rodrigo');

        cy.get('#lastName')
        .should('be.visible')
        .type('Molter');

        cy.get('#email')
        .should('be.visible')
        .type('emailgmail.com');

        cy.get('#open-text-area')
        .should('be.visible')
        .type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique erat lobortis, molestie sapien ut, mollis dui.", {delay:0})

        cy.contains('Enviar').click();

        cy.checkErrorMessage();
    });

    it('Valida campo telefone aceita apenas numeros', () => {
        cy.get('#phone').type('meutelefone').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone-checkbox').check()

        cy.fillMandatoryFieldsAndSubmit();

        cy.checkErrorMessage();
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
        .should('be.visible')
        .type('Rodrigo')
        .should('have.value', 'Rodrigo')
        .clear()
        .should('have.value', '');


        cy.get('#lastName')
        .should('be.visible')
        .type('Molter')
        .should('have.value', 'Molter')
        .clear()
        .should('have.value', '');

        cy.get('#email')
        .should('be.visible')
        .type('email@gmail.com')
        .should('have.value', 'email@gmail.com')
        .clear()
        .should('have.value', '');

        cy.get('#phone')
        .should('be.visible')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('Enviar').click();
        cy.checkErrorMessage();
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.checkSucessMessage();
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select')
        .select('YouTube')
        .should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('select')
        .select('mentoria')
        .should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select')
            .select(1).should('have.value', 'blog');
    });

    it('seleciona um produto aleatório', () => {
        cy.get('#product')
        .children()
        .its('length').then(totalAmountProducts => {
            cy.get('select')
            .select(Cypress._.random(1, totalAmountProducts-1))
        })
    });

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value=feedback]').check()
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').each(($radioBtn) => {
            cy.wrap($radioBtn).check()
            .should('be.checked')
        })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#check input[type="checkbox"]')
        .as('checkboxes')
        .check()

        cy.get('@checkboxes')
        .each(checkbox => {
          expect(checkbox[0].checked).to.equal(true)
        })

        cy.get('@checkboxes')
        .last()
        .uncheck()
        .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', {enconding: null}).as('exampleFile')
        cy.get('input[type="file"]')
        .selectFile('@exampleFile')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy > a')
        .should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy > a')
        .invoke('removeAttr', 'target')
        .click()
    });

    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy > a')
        .invoke('removeAttr', 'target')
        .click()

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.get('#title')
        .contains('CAC TAT - Política de privacidade')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
          
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal("OK")
            cy.log(response.body)
            expect(response.body).contains("CAC TAT")
            

        })
      });

      it('mostrando o gato escondido', () => {
        cy.get('#cat')
        .invoke('show')
        .should('be.visible');
      });
});
