/// <reference types="cypress" />

describe('sign-up test', () => {
  it("enters into input fields", () =>{
    cy.visit("/")
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .card > .card-body > form > :nth-child(1) > .form-control').clear();
    cy.get(':nth-child(2) > .card > .card-body > form > :nth-child(1) > .form-control').type('John Doe');
    cy.get(':nth-child(2) > .card > .card-body > form > :nth-child(2) > .form-control').clear();
    cy.get(':nth-child(2) > .card > .card-body > form > :nth-child(2) > .form-control').type('password123');
    cy.get(':nth-child(2) > .card > .card-body > form > :nth-child(3) > .btn').click();
    /* ==== End Cypress Studio ==== */
    cy.url().should('include', '/options')
    cy.url()
      .then(url => {
        console.log(url)
        const newUrl = url.replace("http://localhost:3000/options/", "")
        console.log(newUrl)
        cy.request('DELETE', "/api/users/" + newUrl)
      })
  })
})