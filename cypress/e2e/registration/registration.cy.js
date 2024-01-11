import { faker } from '@faker-js/faker';
import accountPage from '../../fixtures/page_object/account.page.js';
import registrationPage from "../../fixtures/page_object/registration.page.js"

let firstName, lastName, email, password, confirmPassword, userData;

describe("Registration", () => {
  before(() => {
    cy.fixture('test_data/predefined/registrationData.json').then((data) => {
      userData = data;
    });
  });
  
  it("Should register new user", () => {
    const user = userData.validUser;
    let firstRandomEmail = faker.internet.email();
    cy.visit('/customer/account/create/');
    registrationPage.firstNameInput.type(user.firstName).should("be.visible");
    registrationPage.lastNameInput.type(user.lastName).should("be.visible");
    registrationPage.emailInput.type(firstRandomEmail).should("be.visible");
    registrationPage.passwordInput.type(user.password).should("be.visible");
    registrationPage.confirmPasswordInput.type(user.confirmPassword).should("be.visible");
    registrationPage.createAccountButton.click();
    accountPage.successRegistrationMessage.should("contain", user.expectedMessage).and("be.visible");
    cy.url().should("include", "/customer/account/")
  })
  
  it("Verify if the user cannot proceed without filling all the mandatory fields", () => {
    cy.visit('/customer/account/create/');
    registrationPage.createAccountButton.click();
    cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 })
    registrationPage.requiredFieldErrorMessage.should("have.length", 5).each((element, index) => {
      cy.wrap(element)
      .should("be.visible")
      .should("have.text", "This is a required field.");
    });
    cy.url().should("include", "/customer/account/");
  })
  
  it("Verify if the numbers and special characters are allowed in the First and Last name", () => {
    const user = userData.validFirstLastName;
    let secondRandomEmail = faker.internet.email();
    cy.visit('/customer/account/create/');
    registrationPage.registerUser(
      firstName = user.firstName,
      lastName = user.lastName,
      email = secondRandomEmail,
      password = user.password,
      confirmPassword = user.confirmPassword,
    );

    registrationPage.errorMessage
    .should('contain', 'First Name is not valid!')
    .and('contain', 'Last Name is not valid!');
  });

  it("Should not register with an email that already exists", () => {
    cy.visit('/customer/account/create/');
    const user = userData.existingEmail;
    registrationPage.registerUser(
      firstName = user.firstName,
      lastName = user.lastName,
      email = user.email,
      password = user.password,
      confirmPassword = user.confirmPassword,
    );
    registrationPage.errorMessage.should(($element) => {
      const actualText = $element.text().trim();
      expect(actualText).to.equal(user.expectedMessage)
    });

    // Check the "click here" link
    registrationPage.errorMessage.contains("click here").should(($link) => {
      expect($link).to.have.attr("href", user.expectedUrl);
      expect($link).to.have.text("click here");
    });
  });

  it("Verify that password can not be the same as the email", () => {
    cy.visit('/customer/account/create/');
    const user = userData.emailAndPasswordNotTheSame;
    registrationPage.registerUser(
      firstName = user.firstName,
      lastName = user.lastName,
      email = user.email,
      password = user.password,
      confirmPassword = user.confirmPassword,
    );
    registrationPage.passwordError.should("have.text", user.expected)
  })
});
