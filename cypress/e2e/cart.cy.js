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

    
    it('TC-014: The cart badge should displays the correct number of items currently in the cart',() => {
        const testCaseId = 'TC-014';
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
       
        productPage.clickCartIcon();
        cartPage.assertAtCartPage();
        cartPage.getCountCart().then((count) => {
            expect(count).to.equal(6);
        });

        cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {

        console.error('Error during login:', error);
        cy.task('updateTestResult', { testCaseId, status: 'Fail' });

        }
    })
    it('TC-015: The item name and price in the cart should match the selection from the product page',() => {
        const testCaseId = 'TC-015';
        try {
            loginPage.fillUserPassword(username, password);
            loginPage.clickLoginButton();
            productPage.assertAtProductPage();
            
            const productsArray = [];

productPage.addBackpack().then(product => {
  productsArray.push(product);
  return productPage.addBoltTshirt(); // ต้อง return เพื่อให้ Cypress รอ
}).then(product => {
  productsArray.push(product);

  productPage.clickCartIcon();
  cartPage.assertAtCartPage();

  cartPage.getProductNamesAndPrices().then(cartProducts => {
    cy.log('🛒 สินค้าใน cart:', JSON.stringify(cartProducts));
    cy.log('📦 สินค้าที่เพิ่ม:', JSON.stringify(productsArray));

    productsArray.forEach(expected => {
      const found = cartProducts.find(
        item => item.name.trim() === expected.name.trim() &&
                item.price.trim() === expected.price.trim()
      );
      expect(found, `ต้องเจอสินค้า ${expected.name} ใน cart`).to.not.be.undefined;
    });
  });
});

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-016: Should remove the selected item from the cart and update the cart badge',() => {
        const testCaseId = 'TC-016';
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
                return cartPage.removeBackpack();
            }).then(() => {
                cartPage.getCountCart().then(count => {
                    expect(count).to.equal(1);
                });
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-017: When clicking "Continue Shopping", should navigates back to the product page',() => {
        const testCaseId = 'TC-017';
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
                return cartPage.clickContinueShopping();
            }).then(() => {
                productPage.assertAtProductPage();
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
    it('TC-018: When clicking "Checkout", should proceed to the checkout information page',() => {
        const testCaseId = 'TC-018';
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
                cy.url().should('include', '/checkout-step-one.html');
            });

            cy.task('updateTestResult', { testCaseId, status: 'Pass' });
        } catch (error) {
            console.error('Error during login:', error);
            cy.task('updateTestResult', { testCaseId, status: 'Fail' });
        }
    })
});