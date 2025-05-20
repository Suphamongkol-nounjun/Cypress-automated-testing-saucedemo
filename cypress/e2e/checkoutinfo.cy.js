import { loginPage } from "../pages/login.page"
import { productPage} from "../pages/product.page";
import { cartPage } from "../pages/cart.page"
import { checkoutinfoPage } from "../pages/checkoutinfo";
import { validUser, invalidUser, problemUser } from "../test-data/user"
import product, { addItems, removeItems } from "../test-data/product";
import { addressUser } from "../test-data/addess";

describe('CHECKOUT INFO PAGE FUNCTION', () => {
    const { username, password } = validUser[0];
    const { firstName, lastName, zipCode } = addressUser[0];
    
    
    beforeEach(() => {
        loginPage.visit();
    });

     it('TC-019: When clicking "Cancel", should navigate back to the cart page',() => {
        const testCaseId = 'TC-019';
        try {
            loginPage.fillUserPassword(username, password);
            loginPage.clickLoginButton();
            productPage.assertAtProductPage();

            productPage.addBackpack().then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('1');
                });
                return productPage.addBikelike();
            }).then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('2');
                });
                return productPage.clickCartIcon();
            }).then(() => {
                cartPage.assertAtCartPage();
                return cartPage.clickCheckout();
            }).then(() => {
                checkoutinfoPage.assertCheckoutInfoPage();
            }).then(() => {
                checkoutinfoPage.clickCancel();
            }).then(() => {
                cartPage.assertAtCartPage();
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-020: When clicking "Continue" without any client information, should display an error message',() => {
        const testCaseId = 'TC-020';
        try {
            loginPage.fillUserPassword(username, password);
            loginPage.clickLoginButton();
            productPage.assertAtProductPage();

            productPage.addBackpack().then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('1');
                });
                return productPage.addBikelike();
            }).then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('2');
                });
                return productPage.clickCartIcon();
            }).then(() => {
                cartPage.assertAtCartPage();
                return cartPage.clickCheckout();
            }).then(() => {
                checkoutinfoPage.assertCheckoutInfoPage();
                return checkoutinfoPage.clickContinue();
            }).then(() => {
                checkoutinfoPage.getErrorMessage();
            }).then(() => {
                checkoutinfoPage.checkErrorMessage();
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-021: When clicking "Continue" with some client information, should display an error message',() => {
        const testCaseId = 'TC-021';
        try {
            loginPage.fillUserPassword(username, password);
            loginPage.clickLoginButton();
            productPage.assertAtProductPage();

            productPage.addBackpack().then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('1');
                });
                return productPage.addBikelike();
            }).then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('2');
                });
                return productPage.clickCartIcon();
            }).then(() => {
                cartPage.assertAtCartPage();
                return cartPage.clickCheckout();
            }).then(() => {
                checkoutinfoPage.assertCheckoutInfoPage();
                return checkoutinfoPage.fillAllFields(firstName, '', '');
            }).then(() => {
                checkoutinfoPage.clickContinue();
            }).then(() => {
                checkoutinfoPage.getErrorMessage();
            }).then(() => {
                checkoutinfoPage.checkErrorMessage();
            }).then(() => {
                checkoutinfoPage.fillAllFields(firstName, lastName, '');
            }).then(() => {
                checkoutinfoPage.clickContinue();
            }).then(() => {
                checkoutinfoPage.getErrorMessage();
            }).then(() => {
                checkoutinfoPage.checkErrorMessage();
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-022: When clicking "Continue" with all client information, should proceed to the checkout overview page',() => {
        const testCaseId = 'TC-022';
        try {
            loginPage.fillUserPassword(username, password);
            loginPage.clickLoginButton();
            productPage.assertAtProductPage();

            productPage.addBackpack().then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('1');
                });
                return productPage.addBikelike();
            }).then(() => {
                productPage.getCountCart().then(count => {
                    expect(count).to.equal('2');
                });
                return productPage.clickCartIcon();
            }).then(() => {
                cartPage.assertAtCartPage();
                return cartPage.clickCheckout();
            }).then(() => {
                checkoutinfoPage.assertCheckoutInfoPage();
                return checkoutinfoPage.fillAllFields(firstName, lastName, zipCode);
            }).then(() => {
                checkoutinfoPage.clickContinue();
            }).then(() => {
                cy.url().should('contain', '/checkout-step-two.html');
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
});