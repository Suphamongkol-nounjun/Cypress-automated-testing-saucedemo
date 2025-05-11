class LoginPage {

    constructor() {
    this.locatorUsername = '[data-test="username"]';
    this.locatorPassword = '[data-test="password"]';
    this.locatorLoginBtn = '[data-test="login-button"]';
  }


  visit() {
    cy.visit('/');
  }
   assertAtLoginPage() {
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  }
    fillUserPassword(username, password) {
    cy.get(this.locatorUsername).type(username);
    cy.get(this.locatorPassword).type(password);
  }
  get usernameInput() {
    return cy.get(this.locatorUsername);
  }

  get passwordInput() {
    return cy.get(this.locatorPassword);
  }

  get loginButton() {
    return cy.get(this.locatorLoginBtn);
  }
}

export const loginPage = new LoginPage();