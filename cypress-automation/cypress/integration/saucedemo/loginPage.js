// Test scenarios for saucedemo login page!

function validateErrorMessages() {
  cy.get(".error")
    .should("have.length", 3)
    .then((errorMessage) => {
      cy.wrap(errorMessage)
        .last()
        .invoke("text")
        .should("be.oneOf", [
          "Epic sadface: Sorry, this user has been locked out.",
          "Epic sadface: Username and password do not match any user in this service",
        ]);
    });
}

describe('Saucedemo Login Page Test cases', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  it('should allow all users to log in if they configured loginAllowed as true', () => {
    
    cy.fixture("login-data.json").then((loginData) => {
      const validUsers = loginData.users.filter((user) => user.loginAllowed === true);
      
      validUsers.forEach((user) => {
        cy.login(user.username, user.password)
        cy.url().should('include', '/inventory.html');
        cy.logout();
      })
    })
  });

  it('should not allow any users to log in if they configured loginAllowed as false', () => {
    
    cy.fixture("login-data.json").then((loginData) => {
      const validUsers = loginData.users.filter((user) => user.loginAllowed === false);
      
      validUsers.forEach((user) => {
        cy.login(user.username, user.password)
        cy.url().should('include', 'saucedemo.com');   
        validateErrorMessages();
      })
    })
  });

  it('should performance_glitch_user', () => {
    const username = 'performance_glitch_user';
    const password = 'secret_sauce';
    cy.login(username, password)
    cy.url({ timeout: 1 }).should('include', 'saucedemo.com'); 
    cy.logout();
  });


  it('should add an item to the cart', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';
    const productName = 'Sauce Labs Backpack';

   // cy.login(users[0].username, users[0].password);
   cy.login(username, password);

    cy.addToCart(productName);

    cy.get('.shopping_cart_badge').should('have.text', '1');

    cy.logout();
  });
});
