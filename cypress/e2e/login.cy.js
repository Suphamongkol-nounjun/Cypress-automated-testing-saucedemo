import { loginPage } from "../pages/login.page"
import { productPage } from "../pages/product.page";
import { validUser, invalidUser, problemUser } from "../test-data/user"

describe('LOGIN FUNCTION', () => {
  const { username, password } = validUser[0];

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-001: Input fields should display as the data that was filled',() => {
        const testCaseId = 'TC-001';
    try {
    loginPage.fillUserPassword('testuser', 'testpassword');
    loginPage.usernameInput.should('have.value', 'testuser');
    loginPage.passwordInput.should('have.value', 'testpassword');

    loginPage.assertAtLoginPage();
    cy.task('updateTestResult', { testCaseId, status: 'Pass' });
      
    } catch (error) {
      console.error('Error during login:', error);
      cy.task('updateTestResult', { testCaseId, status: 'Fail' });
    }
  });
  it('TC-002: Should show an error message if log in without a username',() => {
    const testCaseId = 'TC-002';
    try {
      loginPage.fillUserPassword('', password);
      loginPage.clickLoginButton();
      loginPage.errorMessage.should('contain', 'is required');
      loginPage.assertAtLoginPage();
      cy.task('updateTestResult', { testCaseId, status: 'Pass' });
    } catch (error) {
      console.error('Error during login:', error);
      cy.task('updateTestResult', { testCaseId, status: 'Fail' });
    }
  });
  it('TC-003: Should show an error message if log in without a password',() => {
    const testCaseId = 'TC-003';
    try {
      loginPage.fillUserPassword(username, '');
      loginPage.clickLoginButton();
      loginPage.errorMessage.should('contain', 'is required');
      loginPage.assertAtLoginPage();
      cy.task('updateTestResult', { testCaseId, status: 'Pass' });
    } catch (error) {
      console.error('Error during login:', error);
      cy.task('updateTestResult', { testCaseId, status: 'Fail' });
    }
  });
  it('TC-004: Should show an error message if log in with both fields blank',() => {
    const testCaseId = 'TC-004';
    try {
      loginPage.fillUserPassword('', '');
      loginPage.clickLoginButton();
      loginPage.errorMessage.should('contain', 'is required');
      loginPage.assertAtLoginPage();
      cy.task('updateTestResult', { testCaseId, status: 'Pass' });
    } catch (error) {
      console.error('Error during login:', error);
      cy.task('updateTestResult', { testCaseId, status: 'Fail' });
    }
  });
  validUser.forEach(user => {
    it(`TC-005: Should log in with valid credentials for ${user.username}`, () => {
      const testCaseId = 'TC-005';
      try {
        loginPage.fillUserPassword(user.username, user.password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();
        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
      } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
      }
    });
  });
  invalidUser.forEach(user => {
    it(`TC-006: Should show an error message if log in with invalid credentials for ${user.username}`, () => {
      const testCaseId = 'TC-006';
      try {
        loginPage.fillUserPassword(user.username, user.password);
        loginPage.clickLoginButton();
        loginPage.errorMessage.should('contain', 'Epic sadface');
        loginPage.assertAtLoginPage();
        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
      } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
      }
    });
  });
})