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

 registerUser(firstName, lastName, email, password, confirmPassword) {
    if(firstName) { this.firstNameInput.clear().type(firstName);}
    if(lastName) { this.lastNameInput.clear().type(lastName);}
    if(email) { this.emailInput.clear().type(email); }
    if(password) { this.passwordInput.clear().type(password); }
    if(confirmPassword) { this.confirmPasswordInput.clear().type(confirmPassword); }
    this.createAccountButton.click()
 }
}

export default new registrationPage();