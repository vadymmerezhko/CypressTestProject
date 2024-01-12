class registrationPage {

 get firstNameInput() { return cy.get('#firstname') };
 get lastNameInput() { return cy.get('#lastname') };
 get emailInput() { return cy.get('#email_address') };
 get passwordInput() { return cy.get('#password') };
 get confirmPasswordInput() { return cy.get('#password-confirmation') };
 get createAccountButton() { return cy.get('[title="Create an Account"]') };
 get requiredFieldErrorMessage() { return cy.get('[class="mage-error"]') };
 get errorMessage() { return cy.get('[data-ui-id="message-error"]') };
 get passwordError() { return cy.get('#password-error') } ;

 registerUser(user) {
   cy.visit('/customer/account/create/');
    if(user.firstName) { this.firstNameInput.clear().type(user.firstName, {"delay":0});}
    if(user.lastName) { this.lastNameInput.clear().type(user.lastName, {"delay":0});}
    if(user.email) { this.emailInput.clear().type(user.email, {"delay":0}); }
    if(user.password) { this.passwordInput.clear().type(user.password, {"delay":0}); }
    if(user.confirmPassword) { this.confirmPasswordInput.clear().type(user.confirmPassword, {"delay":0}); }
    this.createAccountButton.click()
 }
}

export default new registrationPage();