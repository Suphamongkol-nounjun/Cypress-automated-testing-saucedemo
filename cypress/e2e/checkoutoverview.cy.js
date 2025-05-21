import { loginPage } from "../pages/login.page";
import { productPage } from "../pages/product.page";
import { cartPage } from "../pages/cart.page";
import { checkoutinfoPage } from "../pages/checkoutinfo";
import { checkoutoverviewPage } from "../pages/checkoutoverview";
import { validUser, invalidUser, problemUser } from "../test-data/user";
import product, { addItems, removeItems } from "../test-data/product";
import { addressUser } from "../test-data/addess";

describe("CHECKOUT OVERVIEW PAGE FUNCTION", () => {
  const { username, password } = validUser[0];
  const { firstName, lastName, zipCode } = addressUser[0];

  beforeEach(() => {
    loginPage.visit();
  });

  it("TC-023: The cart badge should displays the correct number of items currently in the cart", () => {
    const testCaseId = "TC-023";
    try {
      loginPage.fillUserPassword(username, password);
      loginPage.clickLoginButton();
      productPage.assertAtProductPage();

      productPage
        .addBackpack()
        .then(() => {
          productPage.getCountCart().then((count) => {
            expect(count).to.equal("1");
          });
          return productPage.addBikelike();
        })
        .then(() => {
          productPage.getCountCart().then((count) => {
            expect(count).to.equal("2");
          });
          return productPage.clickCartIcon();
        })
        .then(() => {
          cartPage.assertAtCartPage();
          return cartPage.clickCheckout();
        })
        .then(() => {
          checkoutinfoPage.assertCheckoutInfoPage();
          return checkoutinfoPage.fillAllFields(firstName, lastName, zipCode);
        })
        .then(() => {
          checkoutinfoPage.clickContinue();
        })
        .then(() => {
          checkoutoverviewPage.assertCheckoutOverviewPage();
        })
        .then(() => {
          productPage.getCountCart().then((countcart) => {
            checkoutoverviewPage.getClassAmount().then((countitem) => {
              expect(countcart).to.equal(countitem.toString());
            });
          });
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  });
  it("TC-024: The item name and price in the cart should match the selection from the product page", () => {
    const testCaseId = "TC-024";
    try {
      loginPage.fillUserPassword(username, password);
      loginPage.clickLoginButton();
      productPage.assertAtProductPage();

      const productsArray = [];

      productPage
        .addBackpack()
        .then((product) => {
          productsArray.push(product);
          return productPage.addBoltTshirt(); // ต้อง return เพื่อให้ Cypress รอ
        })
        .then((product) => {
          productsArray.push(product);

          productPage.clickCartIcon();
          cartPage.assertAtCartPage();

          cartPage.getProductNamesAndPrices().then((cartProducts) => {
            cy.log("🛒 สินค้าใน cart:", JSON.stringify(cartProducts));
            cy.log("📦 สินค้าที่เพิ่ม:", JSON.stringify(productsArray));

            productsArray.forEach((expected) => {
              const found = cartProducts.find(
                (item) =>
                  item.name.trim() === expected.name.trim() &&
                  item.price.trim() === expected.price.trim()
              );
              expect(found, `ต้องเจอสินค้า ${expected.name} ใน cart`).to.not.be
                .undefined;
            });
          });
          cartPage.clickCheckout();
          checkoutinfoPage.assertCheckoutInfoPage();
          checkoutinfoPage.fillAllFields(firstName, lastName, zipCode);
          checkoutinfoPage.clickContinue();
          checkoutoverviewPage.assertCheckoutOverviewPage().then(() => {
            // เช็คสินค้าในหน้า Checkout Overview ซ้ำอีกครั้ง
            productPage.clickCartIcon(); // หรือถ้าหน้า Checkout Overview มีตัวดึงชื่อราคาสินค้าเองก็ใช้ method นั้นแทน

            cartPage.assertAtCartPage(); // ถ้าต้องเช็คว่าหน้าเปลี่ยนจริง ๆ (ถ้าไม่เปลี่ยนหน้า อาจข้ามได้)

            cartPage.getProductNamesAndPrices().then((cartProducts) => {
              cy.log(
                "🛒 สินค้าใน checkout overview:",
                JSON.stringify(cartProducts)
              );
              cy.log("📦 สินค้าที่เพิ่ม:", JSON.stringify(productsArray));

              productsArray.forEach((expected) => {
                const found = cartProducts.find(
                  (item) =>
                    item.name.trim() === expected.name.trim() &&
                    item.price.trim() === expected.price.trim()
                );
                expect(found, `ต้องเจอสินค้า ${expected.name} ใน cart`).to.not
                  .be.undefined;
              });
            });
          });
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  });
  it("TC-025: Should correctly calculate the total, tax, and grand total", () => {
    const testCaseId = "TC-025";
    try {
      loginPage.fillUserPassword(username, password);
      loginPage.clickLoginButton();
      productPage.assertAtProductPage();

      const productsArray = [];

      productPage
        .addBackpack()
        .then((product) => {
          productsArray.push(product);
          return productPage.addBoltTshirt(); // ต้อง return เพื่อให้ Cypress รอ
        })
        .then((product) => {
          productsArray.push(product);

          productPage.clickCartIcon();
          cartPage.assertAtCartPage();
          cartPage.clickCheckout();
          checkoutinfoPage.assertCheckoutInfoPage();
          checkoutinfoPage.fillAllFields(firstName, lastName, zipCode);
          checkoutinfoPage.clickContinue();
          checkoutoverviewPage.assertCheckoutOverviewPage();

          const totalPriceArray = productPage.getPricefromArray(productsArray); // <== ไม่ต้อง .then()
            cy.log(`💰 ราคาสินค้า (array): ${totalPriceArray}`);
          checkoutoverviewPage.getTaxArray(totalPriceArray).then((tax) => {
            checkoutoverviewPage
              .getTotalPriceArray(totalPriceArray, tax)
              .then((finaltotalPricefromArray) => {
                checkoutoverviewPage.getTaxFromPage().then((taxFromPage) => {
                  checkoutoverviewPage
                    .getTotalPriceFromPage()
                    .then((totalFromPage) => {
                      checkoutoverviewPage
                        .getFinalTotalPriceFromPage()
                        .then((finalTotalFromPage) => {
                          cy.log(`💰 ราคาสินค้า (array): ${totalPriceArray}`);
                          cy.log(`💸 ภาษี (คำนวณ): ${tax}`);
                          cy.log(
                            `🧾 ราคารวม (คำนวณ): ${finaltotalPricefromArray}`
                          );

                          cy.log(`💸 ภาษี (จากหน้า): ${taxFromPage}`);
                          cy.log(`💰 ราคารวม (จากหน้า): ${totalFromPage}`);
                          cy.log(
                            `🧾 ราคารวมสุดท้าย (จากหน้า): ${finalTotalFromPage}`
                          );

                          expect(tax).to.equal(taxFromPage);
                          expect(totalPriceArray).to.equal(totalFromPage);
                          expect(finaltotalPricefromArray).to.equal(
                            finalTotalFromPage
                          );
                        });
                    });
                });
              });
          });
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  });

  it('TC-026: When clicking "Cancel", should navigate back to the product page',() => {
    const testCaseId = "TC-026";
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
          checkoutoverviewPage.clickCancel();
          productPage.assertAtProductPage();
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  })
  it('TC-027: When clicking "Finish", should process to the checkout complete page',() => {
    const testCaseId = "TC-027";
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
          cy.url().should('include', '/checkout-complete.html');
        });

      cy.task("updateTestResult", { testCaseId, status: "Pass" });
    } catch (error) {
      console.error("Error during login:", error);
      cy.task("updateTestResult", { testCaseId, status: "Fail" });
    }
  })
});
