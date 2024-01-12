class LoginPage {
    get emailInput() { return cy.get('[name="login[username]"]') };
    get passwordInput() { return cy.get('[name="login[password]"]')} ;
    get signInButton() { return cy.get('.action.login.primary') };

    login(user) {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/login')
        if (user.email) { this.emailInput.type(user.email, {"delay":0}).should("be.visible"); }
        if (user.password) { this.passwordInput.type(user.password, {"delay":0}).should("be.visible"); }
        this.signInButton.click();
    }
}

export default new LoginPage