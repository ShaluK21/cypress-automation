// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
    cy.get("#user-name").type(username)
    cy.get("#password").type(password, { log: false })
    cy.get("#login-button").click()
    if (username === "standard_user") {
      cy.url().should("include", "/inventory.html")
      cy.get(".bm-burger-button").click()
      cy.get("#logout_sidebar_link").click()
    } else {
      cy.get(".error")
        .should("have.length", 3)
        .then((errorMessage) => {
          cy.wrap(errorMessage)
            .last()
            .invoke("text")
            .should("be.oneOf", [
              "Epic sadface: Sorry, this user has been locked out.",
              "Epic sadface: Username and password do not match any user in this service",
            ])
        })
    }
  })


  // Custom command to log in with username and password
Cypress.Commands.add('login', (username, password) => {
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});

// Custom command to add an item to the cart
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('.inventory_item_name', productName)
    .closest('.inventory_item')
    .find('.btn_inventory')
    .click();
});

// Custom command to log out
Cypress.Commands.add('logout', () => {
  cy.get('.bm-burger-button').click();
  cy.get('#logout_sidebar_link').click();
});


 
  