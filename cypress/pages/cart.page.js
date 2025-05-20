class CartPage {

    baseUrl = '/cart.html'
    locatorCountCart = '[data-test="shopping-cart-link"]'
    locatorClassitemname = '.inventory_item_name'
    locatorClassitemprice = '.inventory_item_price'
    locatorRemoveBackpack = '[data-test="remove-sauce-labs-backpack"]'
    locatorContinueShopping = '[data-test="continue-shopping"]'
    locatorCheckout = '[data-test="checkout"]'


  visit() {
    cy.visit(this.baseUrl);}

   assertAtCartPage() {
    cy.url().should('contain', this.baseUrl);
  }
  getCountCart() {
    return cy.get(this.locatorCountCart).invoke('text').then(text => {
      return Number(text.replace(/\D/g, ''));
    });
  }
  removeBackpack() {
    return cy.get(this.locatorRemoveBackpack).click();
  }
  clickContinueShopping() {
    return cy.get(this.locatorContinueShopping).click();
  }
  clickCheckout() {
    return cy.get(this.locatorCheckout).click();
  }
getProductNamesAndPrices() {
  return cy.get(this.locatorClassitemname).then($names => {
    const names = [];
    $names.each((_, el) => {
      names.push(el.innerText.trim());
    });

    return cy.get(this.locatorClassitemprice).then($prices => {
      const prices = [];
      $prices.each((_, el) => {
        prices.push(el.innerText.trim());
      });

      // รวมชื่อกับราคาตาม index
      const products = names.map((name, index) => ({
        name,
        price: prices[index]
      }));

      return products;
    });
  });
}
}


export const cartPage = new CartPage();