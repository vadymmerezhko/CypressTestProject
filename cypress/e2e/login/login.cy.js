import loginPage from '../../fixtures/page_object/login.page.js'
import accountPage from '../../fixtures/page_object/account.page.js'
let loginData;

describe('Login', () => {
    before(() => {
        cy.fixture('test_data/predefined/loginData.json').then((data) => {
            loginData = data;
        }) 
    });
    it('Should log in', () => {
        const user = loginData.existingUser
      loginPage.login(user)
      cy.url().should("include", "/customer/account/");
      accountPage.contactInfo
      .should("include.text", `${user.firstName} ${user.lastName}`)
      .and("include.text", `${user.email}`);
    });
});