import { loginPage } from "../pages/login.page";
import { productPage } from "../pages/product.page";
import { cartPage } from "../pages/cart.page";
import { checkoutinfoPage } from "../pages/checkoutinfo";
import { checkoutoverviewPage } from "../pages/checkoutoverview";
import { checkoutcompletePage } from "../pages/checkoutcomplete";
import { validUser, invalidUser, problemUser } from "../test-data/user";
import product, { addItems, removeItems } from "../test-data/product";
import { addressUser } from "../test-data/addess";

describe("CHECKOUT OVERVIEW PAGE FUNCTION", () => {
  const { username, password } = validUser[0];
  const { firstName, lastName, zipCode } = addressUser[0];

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-028: The cart badge number should be removed',() => {
    const testCaseId = "TC-028";
    try {
      loginPage.fillUserPassword(username, password);
      loginPage.clickLoginButton();
      productPage.assertAtProductPage();

      productPage
        .addBackpack()
        .then(() => {
          return productPage.addBikelike();
        })
        .then(() => {
          productPage.clickCartIcon();
          cartPage.assertAtCartPage();
          cartPage.clickCheckout();
          checkoutinfoPage.assertCheckoutInfoPage();
          checkoutinfoPage.fillAllFields(firstName, lastName, zipCode);
          checkoutinfoPage.clickContinue();
          checkoutoverviewPage.assertCheckoutOverviewPage();
          checkoutoverviewPage.clickFinish();
        })
        .then(() => {
          checkoutcompletePage.assertCheckoutCompletePage();
          productPage.getCountCart().then((count) => {
            expect(count).to.equal('');
          });
          
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  })
  it('TC-029: Display message',() => {
    const testCaseId = "TC-029";
    try {
      loginPage.fillUserPassword(username, password);
      loginPage.clickLoginButton();
      productPage.assertAtProductPage();

      productPage
        .addBackpack()
        .then(() => {
          return productPage.addBikelike();
        })
        .then(() => {
          productPage.clickCartIcon();
          cartPage.assertAtCartPage();
          cartPage.clickCheckout();
          checkoutinfoPage.assertCheckoutInfoPage();
          checkoutinfoPage.fillAllFields(firstName, lastName, zipCode);
          checkoutinfoPage.clickContinue();
          checkoutoverviewPage.assertCheckoutOverviewPage();
          checkoutoverviewPage.clickFinish();
        })
        .then(() => {
          checkoutcompletePage.assertCheckoutCompletePage();
          checkoutcompletePage.getCompleteText().then((text) => {
            expect(text).to.equal('Thank you for your order!');
          });
          
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  })
  it('TC-030: When clicking "Back Home", should navigate back to the product page',() => {
    const testCaseId = "TC-030";
    try {
      loginPage.fillUserPassword(username, password);
      loginPage.clickLoginButton();
      productPage.assertAtProductPage();

      productPage
        .addBackpack()
        .then(() => {
          return productPage.addBikelike();
        })
        .then(() => {
          productPage.clickCartIcon();
          cartPage.assertAtCartPage();
          cartPage.clickCheckout();
          checkoutinfoPage.assertCheckoutInfoPage();
          checkoutinfoPage.fillAllFields(firstName, lastName, zipCode);
          checkoutinfoPage.clickContinue();
          checkoutoverviewPage.assertCheckoutOverviewPage();
          checkoutoverviewPage.clickFinish();
        })
        .then(() => {
          checkoutcompletePage.assertCheckoutCompletePage();
          checkoutcompletePage.getCompleteText().then((text) => {
            expect(text).to.equal('Thank you for your order!');
            checkoutcompletePage.clickBackHome();
            productPage.assertAtProductPage();
          });
          
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  })
});
