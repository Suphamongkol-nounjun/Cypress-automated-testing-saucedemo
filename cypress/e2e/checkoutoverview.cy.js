import { loginPage } from "../pages/login.page"
import { productPage} from "../pages/product.page";
import { cartPage } from "../pages/cart.page"
import { checkoutinfoPage } from "../pages/checkoutinfo";
import { checkoutoverviewPage } from "../pages/checkoutoverview"
import { validUser, invalidUser, problemUser } from "../test-data/user"
import product, { addItems, removeItems } from "../test-data/product";
import { addressUser } from "../test-data/addess";

describe('CHECKOUT OVERVIEW PAGE FUNCTION', () => {
    const { username, password } = validUser[0];
    const { firstName, lastName, zipCode } = addressUser[0];
    
    
    beforeEach(() => {
        loginPage.visit();
    });


    it.only('TC-023: The cart badge should displays the correct number of items currently in the cart',() => {
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
                checkoutoverviewPage.assertCheckoutOverviewPage();
            }).then(() => {
                productPage.getCountCart().then(countcart => {
                    checkoutoverviewPage.getClassAmount().then(countitem => {
                    expect(countcart).to.equal(countitem.toString());
                });
                });
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    // it.only('TC-024: The item name and price in the cart should match the selection from the product page',() => {})
    // it.only('TC-025: Should correctly calculate the total, tax, and grand total',() => {})
    // it.only('TC-026: When clicking "Cancel", should navigate back to the product page',() => {})
    // it.only('TC-027: When clicking "Finish", should process to the checkout complete page',() => {})
});