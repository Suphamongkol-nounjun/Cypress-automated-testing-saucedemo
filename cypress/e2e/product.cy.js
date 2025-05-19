import { loginPage } from "../pages/login.page"
import { productPage} from "../pages/product.page";
import { validUser, invalidUser, problemUser } from "../test-data/user"
import product, { addItems, removeItems } from "../test-data/product";

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
    it('TC-008: Adding multiple products to the cart and navigating between pages to verify that the cart count remains consistent and accurate',() => {
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
    it('TC-009: Product should correctly sorts items from A to Z',() => {
        const testCaseId = 'TC-009';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();

          productPage.sortByNameZA();
          cy.wait(2000);
          productPage.getProductNames().then((productNames) => {
            const sortedNames = [...productNames].sort().reverse();
            console.log('Sorted Names:', sortedNames);
            console.log('Product Names:', productNames);

            expect(productNames).to.deep.equal(sortedNames);
          });
        productPage.sortByNameAZ();
        cy.wait(2000);
        productPage.getProductNames().then((productNames) => {
            const sortedNames = [...productNames].sort();
            console.log('Sorted Names:', sortedNames);
            console.log('Product Names:', productNames);

            expect(productNames).to.deep.equal(sortedNames);
          });
    
        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-010: Product should correctly sorts items from Z to A',() => {
        const testCaseId = 'TC-010';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();

          productPage.sortByNameZA();
          cy.wait(2000);
          productPage.getProductNames().then((productNames) => {
            const sortedNames = [...productNames].sort().reverse();
            console.log('Sorted Names:', sortedNames);
            console.log('Product Names:', productNames);

            expect(productNames).to.deep.equal(sortedNames);
          });

        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-011: Product should correctly sorts items from price low to high',() => {
        const testCaseId = 'TC-011';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();
    

          productPage.sortByPriceLowToHigh();
          cy.wait(2000);
          productPage.getProductPrices().then((productPrices) => {
            const sortedPrices = [...productPrices].sort((a, b) => {
              const priceA = parseFloat(a.replace('$', ''));
              const priceB = parseFloat(b.replace('$', ''));
              return priceA - priceB;
            });
            console.log('Sorted Prices:', sortedPrices);
            console.log('Product Prices:', productPrices);

            expect(productPrices).to.deep.equal(sortedPrices);
          });

        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-012: Product should correctly sorts items from price high to low',() => {
        const testCaseId = 'TC-012';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();
    

          productPage.sortByPriceHighToLow();
          cy.wait(2000);
          productPage.getProductPrices().then((productPrices) => {
            const sortedPrices = [...productPrices].sort((a, b) => {
              const priceA = parseFloat(a.replace('$', ''));
              const priceB = parseFloat(b.replace('$', ''));
              return priceB - priceA;
            });
            console.log('Sorted Prices:', sortedPrices);
            console.log('Product Prices:', productPrices);

            expect(productPrices).to.deep.equal(sortedPrices);
          });

        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-013: Should navigate to the cart page when clicking the cart icon',() => {
        const testCaseId = 'TC-013';
        try {
        loginPage.fillUserPassword(username, password);
        loginPage.clickLoginButton();
        productPage.assertAtProductPage();

        productPage.clickCartIcon();
        cy.url().should('include', '/cart.html');
        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    
})