class AccountPage {
 get successRegistrationMessage() { return cy.get('[data-ui-id="message-success"]') };
 get contactInfo() { return cy.get('.box.box-information') };

}

export default new AccountPage();