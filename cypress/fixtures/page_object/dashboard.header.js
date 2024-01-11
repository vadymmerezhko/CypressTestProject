class DashboardHeader {
    get emailInput() { return cy.get('[name="login[username]"]') };
    get passwordInput() { return cy.get('[name="login[password]"]')} ;
    get signInButton() { return cy.get('.action.login.primary') };
}

export default new DashboardHeader