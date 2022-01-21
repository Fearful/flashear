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

Cypress.Commands.add('login', (name, { cacheSession = true } = {}) => {
  const login = () => {
    cy.visit('http://localhost:3000')
	cy.get('.nav-login').click()
	cy.location('pathname').should('eq', '/auth');

	cy.get('form')
	.find('[type="text"]').type(name);
	cy.get('form')
	.find('[type="password"]').type('Password1234!');
	cy.get('form').submit();
	cy.location('pathname').should('eq', '/');
  }
  if (cacheSession) {
    cy.session(name, login)
  } else {
    login()
  }
});

Cypress.Commands.add('signup', (name, { cacheSession = true } = {}) => {
  const signup = () => {
    cy.visit('http://localhost:3000')
	cy.get('.nav-login').click()
	cy.location('pathname').should('eq', '/auth');

	cy.get('form')
	.find('[type="text"]').type(name);
	cy.get('form')
	.find('[type="password"]').type('Password1234!');
	cy.get('.signupBtn').click();
	cy.location('pathname').should('eq', '/');
  }
  if (cacheSession) {
    cy.session(name, signup)
  } else {
    signup()
  }
});