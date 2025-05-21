class ProductPage {

  baseUrl = '/inventory.html'
    locatorAddBackpack = '[data-test="add-to-cart-sauce-labs-backpack"]'
    locatorAddBikelike = '[data-test="add-to-cart-sauce-labs-bike-light"]'
    locatorAddBoltTshirt = '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
    locatorAddFleeceJacket = '[data-test="add-to-cart-sauce-labs-fleece-jacket"]'
    locatorAddOnesie = '[data-test="add-to-cart-sauce-labs-onesie"]'
    locatorAddRedTshirt = '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'
    locatorRemoveBackpack = '[data-test="remove-sauce-labs-backpack"]'
    locatorRemoveBikelike = '[data-test="remove-sauce-labs-bike-light"]'
    locatorRemoveBoltTshirt = '[data-test="remove-sauce-labs-bolt-t-shirt"]'
    locatorRemoveFleeceJacket = '[data-test="remove-sauce-labs-fleece-jacket"]'
    locatorRemoveOnesie = '[data-test="remove-sauce-labs-onesie"]'
    locatorRemoveRedTshirt = '[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'
    locatorCountCart = '[data-test="shopping-cart-link"]'
    locatorBackToProducts = '[data-test="back-to-products"]'
    locatorBackpackProduct = '[data-test="item-4-title-link"]'
    locatorBikeLightProduct = '[data-test="item-0-title-link"]'
    locatorBoltTshirtProduct = '[data-test="item-1-title-link"]'
    locatorFleeceJacketProduct = '[data-test="item-5-title-link"]'
    locatorOnesieProduct = '[data-test="item-2-title-link"]'
    locatorRedTshirtProduct = '[data-test="item-3-title-link"]'
    locatorCartIcon = '[data-test="shopping-cart-link"]'
    locatorClassitemname = '.inventory_item_name'
    locatorClassitemprice = '.inventory_item_price'
    locatorSortContainer = '[data-test="product-sort-container"]'
    locatorProductName = '[data-test="inventory-item-name"]'
    locatorProductPrice = '[data-test="inventory-item-price"]'
    ocatorItemContainer = '[data-test="inventory-item-description"]';


  visit() {
    cy.visit(this.baseUrl);}

   assertAtProductPage() {
    cy.url().should('contain', this.baseUrl);
  }
  assertAtProductDetailPage() {
    cy.url().should('contain', '/inventory-item.html?id=');
    }
addBackpack() {
  let itemName, itemPrice;

  // หาชื่อและราคา
  return cy.get(this.locatorAddBackpack).parents().eq(1).within(() => {
    cy.get(this.locatorProductName)
      .invoke('text')
      .then(text => itemName = text.trim());
      
    cy.get(this.locatorProductPrice)
      .invoke('text')
      .then(text => itemPrice = text.trim());
  })
  .then(() => {
    // คลิกปุ่ม
    return cy.get(this.locatorAddBackpack).click();
  })
  .then(() => {
    // รอปุ่ม Remove
    return cy.get(this.locatorRemoveBackpack).should('be.visible', { timeout: 5000 });
  })
  .then(() => {
    // คืนค่า
    return { name: itemName, price: itemPrice };
  });
}
addBikelike() {
  let itemName, itemPrice;

  // หาชื่อและราคา
  return cy.get(this.locatorAddBikelike).parents().eq(1).within(() => {
    cy.get(this.locatorProductName)
      .invoke('text')
      .then(text => itemName = text.trim());
      
    cy.get(this.locatorProductPrice)
      .invoke('text')
      .then(text => itemPrice = text.trim());
  })
  .then(() => {
    // คลิกปุ่ม
    return cy.get(this.locatorAddBikelike).click();
  })
  .then(() => {
    // รอปุ่ม Remove
    return cy.get(this.locatorRemoveBikelike).should('be.visible', { timeout: 5000 });
  })
  .then(() => {
    // คืนค่า
    return { name: itemName, price: itemPrice };
  });
}
addBoltTshirt() {
  let itemName, itemPrice;
  // หาชื่อและราคา
  return cy.get(this.locatorAddBoltTshirt).parents().eq(1).within(() => {
    cy.get(this.locatorProductName)
      .invoke('text')
      .then(text => itemName = text.trim());
      
    cy.get(this.locatorProductPrice)
      .invoke('text')
      .then(text => itemPrice = text.trim());
  })
  .then(() => {
    // คลิกปุ่ม
    return cy.get(this.locatorAddBoltTshirt).click();
  })
  .then(() => {
    // รอปุ่ม Remove
    return cy.get(this.locatorRemoveBoltTshirt).should('be.visible', { timeout: 5000 });
  })
  .then(() => {
    // คืนค่า
    return { name: itemName, price: itemPrice };
  });
}
addFleeceJacket() {
  let itemName, itemPrice;
  // หาชื่อและราคา
  return cy.get(this.locatorAddFleeceJacket).parents().eq(1).within(() => {
    cy.get(this.locatorProductName)
      .invoke('text')
      .then(text => itemName = text.trim());
      
    cy.get(this.locatorProductPrice)
      .invoke('text')
      .then(text => itemPrice = text.trim());
  })
  .then(() => {
    // คลิกปุ่ม
    return cy.get(this.locatorAddFleeceJacket).click();
  })
  .then(() => {
    // รอปุ่ม Remove
    return cy.get(this.locatorRemoveFleeceJacket).should('be.visible', { timeout: 5000 });
  })
  .then(() => {
    // คืนค่า
    return { name: itemName, price: itemPrice };
  });
}
addOnesie() {
  let itemName, itemPrice;
  // หาชื่อและราคา
  return cy.get(this.locatorAddOnesie).parents().eq(1).within(() => {
    cy.get(this.locatorProductName)
      .invoke('text')
      .then(text => itemName = text.trim());
      
    cy.get(this.locatorProductPrice)
      .invoke('text')
      .then(text => itemPrice = text.trim());
  })
  .then(() => {
    // คลิกปุ่ม
    return cy.get(this.locatorAddOnesie).click();
  })
  .then(() => {
    // รอปุ่ม Remove
    return cy.get(this.locatorRemoveOnesie).should('be.visible', { timeout: 5000 });
  })
  .then(() => {
    // คืนค่า
    return { name: itemName, price: itemPrice };
  });
}
addRedTshirt() {
  let itemName, itemPrice;
  // หาชื่อและราคา
  return cy.get(this.locatorAddRedTshirt).parents().eq(1).within(() => {
    cy.get(this.locatorProductName)
      .invoke('text')
      .then(text => itemName = text.trim());
      
    cy.get(this.locatorProductPrice)
      .invoke('text')
      .then(text => itemPrice = text.trim());
  })
  .then(() => {
    // คลิกปุ่ม
    return cy.get(this.locatorAddRedTshirt).click();
  })
  .then(() => {
    // รอปุ่ม Remove
    return cy.get(this.locatorRemoveRedTshirt).should('be.visible', { timeout: 5000 });
  })
  .then(() => {
    // คืนค่า
    return { name: itemName, price: itemPrice };
  });
}
removeBackpack() {
  // คลิกปุ่ม Remove
  return cy.get(this.locatorRemoveBackpack).click()
    .then(() => {
      // รอปุ่ม Add
      return cy.get(this.locatorAddBackpack).should('be.visible', { timeout: 5000 });
    });
}
removeBikelike() {
  // คลิกปุ่ม Remove
  return cy.get(this.locatorRemoveBikelike).click()
    .then(() => {
      // รอปุ่ม Add
      return cy.get(this.locatorAddBikelike).should('be.visible', { timeout: 5000 });
    });
}
removeBoltTshirt() {
  // คลิกปุ่ม Remove
  return cy.get(this.locatorRemoveBoltTshirt).click()
    .then(() => {
      // รอปุ่ม Add
      return cy.get(this.locatorAddBoltTshirt).should('be.visible', { timeout: 5000 });
    });
}
removeFleeceJacket() {
  // คลิกปุ่ม Remove
  return cy.get(this.locatorRemoveFleeceJacket).click()
    .then(() => {
      // รอปุ่ม Add
      return cy.get(this.locatorAddFleeceJacket).should('be.visible', { timeout: 5000 });
    });
}
removeOnesie() {
  // คลิกปุ่ม Remove
  return cy.get(this.locatorRemoveOnesie).click()
    .then(() => {
      // รอปุ่ม Add
      return cy.get(this.locatorAddOnesie).should('be.visible', { timeout: 5000 });
    });
}
removeRedTshirt() {
  // คลิกปุ่ม Remove
  return cy.get(this.locatorRemoveRedTshirt).click()
    .then(() => {
      // รอปุ่ม Add
      return cy.get(this.locatorAddRedTshirt).should('be.visible', { timeout: 5000 });
    });
} 
  getCountCart() {
    return cy.get(this.locatorCountCart)
      .should('be.visible')
      .invoke('text')
      .then(text => text.trim());
  }
  clickBackpackProduct() {
    return cy.get(this.locatorBackpackProduct).click();
  }
  clickBikeLightProduct() {
    return cy.get(this.locatorBikeLightProduct).click();
  }
  clickBoltTshirtProduct() {
    return cy.get(this.locatorBoltTshirtProduct).click();
  }
  clickFleeceJacketProduct() {
    return cy.get(this.locatorFleeceJacketProduct).click();
  }
  clickOnesieProduct() {
    return cy.get(this.locatorOnesieProduct).click();
  }
  clickRedTshirtProduct() {
    return cy.get(this.locatorRedTshirtProduct).click();
  }
  clickBacktoProducts() {
    return cy.get(this.locatorBackToProducts).click();
  }
  getProductNames(){
    return cy.get(this.locatorClassitemname).then($elements => {
      const productNames = [];
      $elements.each((index, element) => {
        productNames.push(element.innerText);
      });
      return productNames;
    });
  }
  getProductPrices(){
    return cy.get(this.locatorClassitemprice).then($elements => {
      const productPrices = [];
      $elements.each((index, element) => {
        productPrices.push(element.innerText);
      });
      return productPrices;
    });
  }
  sortByNameAZ() {
    return cy.get(this.locatorSortContainer).select('az');
  }
  sortByNameZA() {
    return cy.get(this.locatorSortContainer).select('za');
  }
  sortByPriceLowToHigh() {
    return cy.get(this.locatorSortContainer).select('lohi');
  }
  sortByPriceHighToLow() {
    return cy.get(this.locatorSortContainer).select('hilo');
  }
  clickCartIcon() {
    return cy.get(this.locatorCartIcon).click();
  }
  getPricefromArray(productsArray) {
  return productsArray.reduce((total, item) => {
    return total + Number(item.price.replace('$', ''));
  }, 0);
}
}
export const productPage = new ProductPage();