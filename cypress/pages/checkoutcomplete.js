class CheckOutCompletePage {

    baseUrl = '/checkout-complete.html'

    
  

    

   assertCheckoutCompletePage() {
  return cy.url().should('include', this.baseUrl); // return Cypress chain
}
getCompleteText() {
    return cy.get('.complete-header').invoke('text');
}
clickBackHome() {
    return cy.get('.btn_primary').click();
}
}

export const checkoutcompletePage = new CheckOutCompletePage();