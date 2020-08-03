import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {randomEmail} from '../utils/'

const faker = require('faker');

var email = faker.internet.email();
var password = faker.internet.password();

describe('Login module', () => {

  beforeEach(() => {
    cy.visit('/login')
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
  })

  it('GA-19 : Login page layout ', () => {
//  cy.visit('/')
    //cy.get('.nav-link').contains('Login').click()
    authPage.email.should('be.visible')
    authPage.password.should('be.visible')
    authPage.submit.should('be.visible')
  })

  it('GA-28 : Login - valid data, GA-32 : User is logged  ', () => {
//  cy.visit('/')
    //cy.get('.nav-link').contains('Login').click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.wait('@galleries')
    // authPage.email.type(EMAIL.EXISTING)
    // authPage.password.type(EMAIL.PASSWORD)
    // authPage.submit.click()
    //cy.wait(1000)
    cy.get('.nav-link').contains('Logout').should('be.visible')    
  })

  it('GA-22 : Login - invalid data - username ', () => {
//  cy.visit('/')
    //cy.get('.nav-link').contains('Login').click()
    authPage.login(randomEmail(), EMAIL.PASSWORD)
    //authPage.email.type(fakerEmail)
    //authPage.password.type(EMAIL.PASSWORD)
    //authPage.submit.click()
    authPage.alert.should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })

  it('Login - invalid data - empty username ', () => {
        //  cy.visit('/')
        //cy.get('.nav-link').contains('Login').click()
        authPage.password.type(EMAIL.PASSWORD)
        authPage.submit.click()
        authPage.email.then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        })

  it('Login - invalid data - empty password ', () => {
        //cy.visit('/')
        //cy.get('.nav-link').contains('Login').click()
        authPage.email.type(EMAIL.EXISTING)
        authPage.submit.click()
        authPage.password.then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        })    
    
  it('GA-25 : Login - invalid data - password ', () => {
//  cy.visit('/')
    //cy.get('.nav-link').contains('Login').click()
    authPage.login(EMAIL.EXISTING, fakerpassword)
    // authPage.email.type(EMAIL.EXISTING)
    // authPage.password.type(fakerpassword)
    // authPage.submit.click()
    authPage.alert.should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })
 
  it('GA-26 : Login - invalid data - username and password ', () => {
// cy.visit('/')
    //cy.get('.nav-link').contains('Login').click()
    authPage.login(fakerEmail, fakerpassword)
    // authPage.email.type(fakerEmail)
    // authPage.password.type(fakerpassword)
    // authPage.submit.click()
    authPage.alert.should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })

})