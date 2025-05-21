class CheckOutOverViewPage {

    baseUrl = '/checkout-step-two.html'
    locatorClassamount = '.cart_item'
    
  

    

   assertCheckoutOverviewPage() {
  return cy.url().should('include', this.baseUrl); // return Cypress chain
}
    getClassAmount() {
        return cy.get(this.locatorClassamount).its('length');
    }
    getItemName() {
        return cy.get('.inventory_item_name').invoke('text');
    }
    getItemPrice() {
        return cy.get('.inventory_item_price').invoke('text');
    }
    getItemName2() {
        return cy.get('.inventory_item_name').eq(1).invoke('text');
    }
    getTaxArray(itemTotal) {
  // คำนวณภาษี 8% แล้วปัดขึ้น 2 ตำแหน่งทศนิยม
  const tax = Math.ceil(0.08 * Number(itemTotal) * 100) / 100;
  return cy.wrap(tax);
}

getTotalPriceArray(itemTotal, tax) {
  // รวมราคา itemTotal กับ tax และปัดทศนิยม 2 ตำแหน่ง
  const total = Number(itemTotal) + Number(tax);
  return cy.wrap(Number(total.toFixed(2)));
}

getTaxFromPage() {
  return cy.get('[data-test="tax-label"]')
    .invoke('text')
    .then(text => Number(text.replace('Tax: $', '')));
}

getTotalPriceFromPage() {
  return cy.get('[data-test="subtotal-label"]')
    .invoke('text')
    .then(text => Number(text.replace('Item total: $', '')));
}

getFinalTotalPriceFromPage() {
  return cy.get('[data-test="total-label"]')
    .invoke('text')
    .then(text => Number(text.replace('Total: $', '')));
}
    clickCancel() {
        return cy.get('[data-test="cancel"]').click();
    }
    clickFinish() {
        return cy.get('[data-test="finish"]').click();
    }
   
}

export const checkoutoverviewPage = new CheckOutOverViewPage();