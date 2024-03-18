beforeEach(() => {
    cy.visit('./src/index.html');
});
describe('Central de Atendimento ao Cliente TAT', () => {
    it('Verifica o titulo da aplicação', () => {
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {

        const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique erat lobortis, molestie sapien ut, mollis dui. Donec massa ante, \
        mollis sed neque eu, euismod consectetur lacus. Proin rutrum ex consectetur lacus placerat blandit. Phasellus ultricies ut tortor porttitor tincidunt.\
        Fusce blandit accumsan nisl, eget cursus mi auctor quis. Vivamus at fringilla turpis. Aliquam at dignissim odio. Vivamus lectus est, congue in venenatis in, \
        auctor quis quam. Sed porta libero vel libero posuere pharetra non vel ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per \
        inceptos himenaeos. Nam aliquet velit id massa ultrices, ultricies varius diam malesuada. Phasellus cursus eu tortor nec ultrices. Ut nec consequat enim. \
        Quisque aliquet finibus felis, non lobortis libero eleifend id. Quisque aliquam ex mauris, ut interdum ante varius at. Aliquam id consectetur libero. In vitae \
        justo malesuada, congue urna eu, hendrerit diam. Etiam facilisis tristique massa, a faucibus nisi consequat vel. Fusce in orci quis urna faucibus lacinia. \
        In consectetur ante sed lorem hendrerit, non consequat nisl porta. Nulla hendrerit vehicula ipsum non ornare. Sed cursus ante nisl, suscipit aliquet sem vehicula \
        scelerisque. Integer vel nisi efficitur, efficitur diam ut, laoreet neque. Ut sapien nibh, fringilla vitae sem at, facilisis porta magna. Aliquam metus ipsum, \
        finibus at pellentesque id, sagittis ut sem. Maecenas scelerisque enim eget sem fringilla condimentum. Duis vestibulum, elit placerat iaculis ultrices, dolor nisi \
        sodales arcu, vitae ullamcorper nisi mi sit amet est. Aliquam posuere tincidunt tincidunt. Phasellus lacus purus, malesuada ut ex ac, tincidunt ullamcorper velit. \
        Nullam rhoncus ut felis et sodales. Donec venenatis ac felis a varius. Nullam malesuada, leo feugiat rutrum egestas, risus orci interdum justo, et vestibulum \
        massa eros at nisi. In laoreet velit a porta rhoncus. Integer in fringilla nulla. Sed semper sapien quis nulla dictum, sed ornare lacus consequat. Maecenas quis \
        nulla et nisl cursus blandit at sed eros. Nunc tincidunt, lorem at sollicitudin imperdiet, ligula nunc lacinia quam, a tincidunt ipsum lacus rhoncus velit. \
        Phasellus fermentum nisi in ex faucibus, sed bibendum turpis luctus"



        cy.get('input[name="firstName"]').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo');
        cy.get('input[name="lastName"]').should('be.visible').type('Molter').should('have.value', 'Molter');
        cy.get('input[id="email"]').should('be.visible').type('email@gmail.com').should('have.value', 'email@gmail.com');
        cy.get('textarea[name="open-text-area"]').should('be.visible')
        .type(text, {delay:0})

        cy.contains('Enviar').click();
        cy.get('span[class="success"').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('input[name="firstName"]').should('be.visible').type('Rodrigo');
        cy.get('input[name="lastName"]').should('be.visible').type('Molter');
        cy.get('input[id="email"]').should('be.visible').type('emailgmail.com');
        cy.get('textarea[name="open-text-area"]').should('be.visible')
        .type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique erat lobortis, molestie sapien ut, mollis dui.", {delay:0})

        cy.contains('Enviar').click();
        cy.get('span[class="error"').should('be.visible')
    });

    it('Valida campo telefone aceita apenas numeros', () => {
        cy.get('input[id=phone').type('meutelefone').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('input[name="firstName"]').should('be.visible').type('Rodrigo');
        cy.get('input[name="lastName"]').should('be.visible').type('Molter');
        cy.get('input[id="email"]').should('be.visible').type('email@gmail.com');
        cy.get('textarea[name="open-text-area"]').should('be.visible')
        .type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique erat lobortis, molestie sapien ut, mollis dui.", {delay:0})
        cy.get('#phone-checkbox').check()

        cy.contains('Enviar').click();
        cy.get('span[class="error"').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[name="firstName"]').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo').clear().should('have.value', '');
        cy.get('input[name="lastName"]').should('be.visible').type('Molter').should('have.value', 'Molter').clear().should('have.value', '');;
        cy.get('input[id="email"]').should('be.visible').type('email@gmail.com').should('have.value', 'email@gmail.com').clear().should('have.value', '');;
        cy.get('input[id=phone').should('be.visible').type('123456789').should('have.value', '123456789').clear().should('have.value', '');;
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('Enviar').click();
        cy.get('span[class="error"').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('span[class="success"').should('be.visible')
    });
});