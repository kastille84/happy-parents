/// <reference types="cypress" />

describe('Test Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  })

  it('shows login form', () => {
    cy.get('.card-header').contains('Login with Family Credentials');
    cy.get('[name="familyEmail"]');
    cy.get('[data-testid="familyEmail-message"]').should('contain','The email is used as the entry point for the family');
    cy.get('[name="familyPassword"]');
    cy.get('[data-testid="familyPassword-message"]').should('contain','The password is used by family to gain access');
  });

  it('shows required errors when all fields are empty and try to submit', () => {
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="familyEmail-message"]').should('contain','Email is required');
    cy.get('[data-testid="familyPassword-message"]').should('contain','Password is required');
  })

  it('shows error when email is not typed in correct format', () => {
    cy.get('[name="familyEmail"]').type('edMar');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="familyEmail-message"]').should('contain', 'Please enter a valid email');
  })

  it('shows error when password is less than 6 chars long', () => {
    cy.get('[name="familyPassword"]').type('1234');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="familyPassword-message"]').should('contain', 'Password should be 6 or more characters')
  })

})