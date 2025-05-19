class CartPage {

    baseUrl = '/cart.html'



  visit() {
    cy.visit(this.baseUrl);}

   assertAtCartPage() {
    cy.url().should('contain', this.baseUrl);
  }
}


export const cartPage = new CartPage();