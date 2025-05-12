class LoginPage {

    constructor() {
    this.locatorUsername = '[data-test="username"]';
    this.locatorPassword = '[data-test="password"]';
    this.locatorLoginBtn = '[data-test="login-button"]';
    this.locatorErrorMessage = '[data-test="error"]';
  }



  visit() {
    cy.visit('/');
  }
   assertAtLoginPage() {
    cy.url().should('contain', '/');
  }
    fillUserPassword(username, password) {
  if (username) cy.get(this.locatorUsername).type(username);
  if (password) cy.get(this.locatorPassword).type(password);
}
  clickLoginButton() {
    cy.get(this.locatorLoginBtn).click();
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
  get errorMessage() {
    return cy.get(this.locatorErrorMessage);
  }
}

export const loginPage = new LoginPage();