import { loginPage } from "../pages/login.page"
import { productPage} from "../pages/product.page";
import { cartPage } from "../pages/cart.page"
import { validUser, invalidUser, problemUser } from "../test-data/user"
import product, { addItems, removeItems } from "../test-data/product";

describe('CART PAGE FUNCTION', () => {
    const { username, password } = validUser[0];
    
    
    beforeEach(() => {
        loginPage.visit();
    });

    
    it.only('TC-014: The cart badge should displays the correct number of items currently in the cart',() => {
        const testCaseId = 'TC-014';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();

        productPage.clickCartIcon();
        cartPage.assertAtCartPage();

        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {

        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });

        }
    })
    // it.only('TC-007: The item name and price in the cart should match the selection from the product page',() => {})
    // it.only('TC-007: Should remove the selected item from the cart and update the cart badge',() => {})
    // it.only('TC-007: When clicking "Continue Shopping", should navigates back to the product page',() => {})
    // it.only('TC-007: When clicking "Checkout", should proceed to the checkout information page',() => {})
});