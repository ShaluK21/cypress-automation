// Test scenarios for saucedemo login page!

before(() => {
  // Actions to be performed before the entire test suite
  // cy.visit('https://www.saucedemo.com');
  //  cy.login('standard_user', 'secret_sauce');

});
describe('Saucedemo Login Page Test cases', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.login('standard_user', 'secret_sauce');
  });
  afterEach(() => {
    cy.logout();
  });


  it('should have given list of products after successfully login', () => {

    // Load the test data
    cy.fixture('product-list.json').then((testData) => {
      // Retrieve the products from the inventory list
      cy.get('.inventory_item').each((product, index) => {
        // Get the product details
        const productName = product.find('.inventory_item_name').text().trim();
        const productPrice = product.find('.inventory_item_price').text().trim();

        // Get the expected product details from the test data
        const expectedProduct = testData.products[index];

        // Assert the product details match the expected values
        expect(productName).to.equal(expectedProduct.name);
        expect(productPrice).to.equal(expectedProduct.price);
      });
    });

  });


  it('should take user to specific product page on product click- failing', () => {

    const productName = 'Sauce Labs Backpack';
    const productPrice = '$29.99';
    // Click on the product
    cy.contains('.inventory_item_name', productName).should('be.visible').click();
    // Assert that the current URL includes the product page URL
    cy.url().should('include', '/inventory-item.html');
    // Assert that the current URL includes the selected product details
    cy.get('.inventory_details_name')
      .should('have.text', productName);
    // Assert that the current URL includes the selected product price
    cy.get('.inventory_details_price')
      .should('have.text', productPrice);

  });

  it('should allow product added to car on click of button "Add to cart"', () => {


    const productName = 'Sauce Labs Backpack';

    cy.addToCart(productName);

    cy.get('.shopping_cart_badge').should('have.text', '1');

  });

  it('should enable button "Add to cart" on click of "Remove" button', () => {


  });

});
