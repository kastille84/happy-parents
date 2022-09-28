/// <reference types="cypress" />

describe('Test Header Navigation', () => {
  beforeEach('visit the app', () => {
    cy.visit('/')
  });

  it('shows the logo', () => {
    cy.get('[href="/"]').should('contain', 'Happy Parents');
  })
  
  it('verify login and signup link is displayed', () => {
    cy.get('[href="/login"]').should('contain', 'Login');
    cy.get('[href="/signup"]').should('contain', 'Sign Up');
  })

  it('click Login link redirects to login page', () => {
    cy.visit('/signup');
    cy.get('[href="/login"]').click();
    cy.get('.card-header').contains('Login with Family Credentials');
  })

})