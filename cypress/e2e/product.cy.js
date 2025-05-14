import { loginPage } from "../pages/login.page"
import { productPage} from "../pages/product.page";
import { validUser, invalidUser, problemUser } from "../test-data/user"
import { addItems, removeItems } from "../test-data/product";

describe('PRODUCT PAGE FUNCTION', () => {
    const { username, password } = validUser[0];
    
    
    beforeEach(() => {
        loginPage.visit();
    });
    
    it('TC-007: Adding all available products to the cart and then removing them, verifying that the cart updates correctly',() => {
        const testCaseId = 'TC-007';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();

        addItems.forEach(item => {
      productPage[item.method]().then(() => {
        productPage.getCountCart().then(count => {
          expect(count).to.equal(item.expectedCount);
        });
      });
    });
        removeItems.forEach(item => {
      productPage[item.method]().then(() => {
        productPage.getCountCart().then(count => {
          expect(count).to.equal(item.expectedCount);
        });
      });
    });
        
           
    
        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    });
    it.only('TC-008: Adding multiple products to the cart and navigating between pages to verify that the cart count remains consistent and accurate',() => {
        const testCaseId = 'TC-008';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();

       addItems.forEach(item => {
      productPage[item.method]().then(() => {
        // คลิกเข้า product
        productPage[item.clickMethod]();

        // ตรวจสอบ URL
        cy.url().should('include', item.expectedUrl);

        // กลับไปหน้า product list
        productPage.clickBacktoProducts();
        productPage.assertAtProductPage();

        // ตรวจสอบจำนวนใน cart
        productPage.getCountCart().then(count => {
          expect(count).to.equal(item.expectedCount);
        });
        });
       });
       
    
        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    // it.only('TC-009: Product should correctly sorts items from A to Z',() => {})
    // it.only('TC-010: Product should correctly sorts items from Z to A',() => {})
    // it.only('TC-011: Product should correctly sorts items from price low to high',() => {})
    // it.only('TC-012: Product should correctly sorts items from price high to low',() => {})
    // it.only('TC-013: Should navigate to the cart page when clicking the cart icon',() => {})
    
})