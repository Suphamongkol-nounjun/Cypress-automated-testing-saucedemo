class CheckOutInfoPage {

    baseUrl = '/checkout-step-one.html'
    locatorFirstName = '[data-test="firstName"]'
    locatorLastName = '[data-test="lastName"]'
    locatorZipCode = '[data-test="postalCode"]'
    locatorContinue = '[data-test="continue"]'
    locatorCancel = '[data-test="cancel"]'
    locatorErrorMessage = '[data-test="error"]'

    

    assertCheckoutInfoPage() {
        cy.url().should('contain', this.baseUrl);
    }
    clickCancel() {
        cy.get(this.locatorCancel).click();
    }
    clickContinue() {
        cy.get(this.locatorContinue).click();
    }
    getErrorMessage() {
        return cy.get(this.locatorErrorMessage);
    }
    checkErrorMessage() {
        cy.get(this.locatorErrorMessage).should('be.visible');
        cy.get(this.locatorErrorMessage).should('contain', 'is required');
    }
   fillAllFields(firstName, lastName, zipCode) {
  if (firstName) {
    cy.get(this.locatorFirstName).type(firstName);
  }

  if (lastName) {
    cy.get(this.locatorLastName).type(lastName);
  }

  if (zipCode) {
    cy.get(this.locatorZipCode).type(zipCode);
  }
}

}

export const checkoutinfoPage = new CheckOutInfoPage();