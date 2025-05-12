import { loginPage } from "../pages/login.page"
import { productPage} from "../pages/product.page";
import { validUser, invalidUser, problemUser } from "../test-data/user"

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
        productPage.addBackpack().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('1');
        });
        productPage.addBikelike().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('2');
        });
        productPage.addBoltTshirt().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('3');
        });
        productPage.addFleeceJacket().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('4');
        });
        productPage.addOnesie().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('5');
        });
        productPage.addRedTshirt().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('6');
        });
        productPage.removeBackpack().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('5');
        });
        productPage.removeBikelike().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('4');
        });
        productPage.removeBoltTshirt().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('3');
        });
        productPage.removeFleeceJacket().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('2');
        });
        productPage.removeOnesie().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('1');
        });
        productPage.removeRedTshirt().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('');
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
        productPage.addBackpack().then((item) => {
          
        });
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('1');
        });
        productPage.clickBackpackProduct();
        productPage.assertAtProductDetailPage();
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('1');
        });
        productPage.clickBacktoProducts();
        productPage.assertAtProductPage();

        productPage.addBikelike();
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('2');
        });
        productPage.clickBikeLightProduct();
        productPage.assertAtProductDetailPage();
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('2');
        });
        productPage.clickBacktoProducts();
        productPage.assertAtProductPage();

        productPage.addBoltTshirt();
        productPage.getCountCart().then(count => {
          
          expect(count).to.equal('3');
        });
        productPage.clickBoltTshirtProduct();
        productPage.assertAtProductDetailPage();
        productPage.getCountCart().then(count => {
          expect(count).to.equal('3');
        });
        productPage.clickBacktoProducts();
        productPage.assertAtProductPage();
    
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