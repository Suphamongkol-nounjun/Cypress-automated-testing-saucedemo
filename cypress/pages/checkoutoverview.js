class CheckOutOverViewPage {

    baseUrl = '/checkout-step-two.html'
    locatorClassamount = '.cart_item'
    
  

    

    assertCheckoutOverviewPage() {
        cy.url().should('contain', this.baseUrl);
    }
    getClassAmount() {
        return cy.get(this.locatorClassamount).its('length');
    }


   
}

export const checkoutoverviewPage = new CheckOutOverViewPage();