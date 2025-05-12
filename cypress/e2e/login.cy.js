import { loginPage } from "../pages/login.page"
import { validUser, invalidUser, problemUser } from "../test-data/user"

describe('Login Page', () => {
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
})