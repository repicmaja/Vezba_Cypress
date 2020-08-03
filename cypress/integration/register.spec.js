import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {randomEmail} from '../utils/'

const faker = require('faker');

var fakerFirstName = faker.name.firstName();
var fakerLastName = faker.name.lastName();
var fakerEmail = faker.internet.email();
var fakerpassword = faker.internet.password();

describe('Register module', () => {

    beforeEach(() => {
        cy.visit('/register')
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
      })
    
    it('GA-9 : Register page test', () => {
        //cy.visit('/')
        //cy.get('.nav-link').contains('Register').click()
        authPage.firstName.should('be.visible').click()
        authPage.lastName.should('be.visible').click()
        authPage.email.should('be.visible').click()
        authPage.password.should('be.visible').click()
        authPage.passwordConfirmation.should('be.visible').click()
        authPage.checkBox.should('be.visible').click()
        authPage.submit.should('be.visible').click()
    })

    it('GA-40 : Register page test - First name input field: required', () => {
        //cy.visit('/register')
        authPage.lastName.type(fakerLastName)
        authPage.email.type(fakerEmail)
        authPage.password.type(fakerpassword)
        authPage.passwordConfirmation.type(fakerpassword)
        authPage.checkBox.click()
        authPage.submit.click()
        authPage.firstName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GA-46 : Register page test - Last name input field: required', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.email.type(fakerEmail)
        authPage.password.type(fakerpassword)
        authPage.passwordConfirmation.type(fakerpassword)
        authPage.checkBox.click()
        authPage.submit.click()
        authPage.lastName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GA-54 : Register page test - Email field required', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.lastName.type(fakerLastName)
        authPage.password.type(fakerpassword)
        authPage.passwordConfirmation.type(fakerpassword)
        authPage.checkBox.click()
        authPage.submit.click()
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GA-55 : Register page test - Email field format invalid', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.lastName.type(fakerLastName)
        authPage.email.type('invalid email')
        authPage.password.type(fakerpassword)
        authPage.passwordConfirmation.type(fakerpassword)
        authPage.checkBox.click()
        authPage.submit.click()
    })

    it('GA-59 : Register page test - Password input field empty', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.lastName.type(fakerLastName)
        authPage.email.type(fakerEmail)
        authPage.passwordConfirmation.type(fakerpassword)
        authPage.checkBox.click()
        authPage.submit.click()
        authPage.password.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GA-60 : Register page test - Password Confirm input field empty', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.lastName.type(fakerLastName)
        authPage.email.type(fakerEmail)
        authPage.password.type(fakerpassword)
        authPage.checkBox.click()
        authPage.submit.click()
        authPage.passwordConfirmation.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GA-81 : Confirmation password doesnt match', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.lastName.type(fakerLastName)
        authPage.email.type(fakerEmail)
        authPage.password.type(fakerpassword)
        authPage.passwordConfirmation.type(fakerEmail)
        authPage.checkBox.click()
        authPage.submit.click()
    })

    it('GA-82 : Password form - invalid password', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.lastName.type(fakerLastName)
        authPage.email.type(fakerEmail)
        authPage.password.type('abcdefgh')
        authPage.passwordConfirmation.type('abcdefgh')
        authPage.checkBox.click()
        authPage.submit.click()
    })

    it('GA-83 : Password form - password has less then 8 characters', () => {
        //cy.visit('/register')
        authPage.firstName.type(fakerFirstName)
        authPage.lastName.type(fakerLastName)
        authPage.email.type(fakerEmail)
        authPage.password.type('a1')
        authPage.passwordConfirmation.type('a1')
        authPage.checkBox.click()
        authPage.submit.click()
    })

    it('GA-84 : User can not register twice', () => {
        //cy.visit('/register')
        authPage.firstName.type('test')
        authPage.lastName.type('test')
        authPage.email.type(EMAIL.EXISTING)
        authPage.password.type(EMAIL.PASSWORD)
        authPage.passwordConfirmation.type(EMAIL.PASSWORD)
        authPage.checkBox.click()
        authPage.submit.click()
        authPage.alert.should('be.visible')
                        .should('have.text', 'The email has already been taken.')   
                        .should('have.class', 'alert') 
    })

    it('GA-14 : Register page positive test - valid data', () => {
        //cy.visit('/register')
        //authPage.firstName.type(fakerFirstName)
        //authPage.lastName.type(fakerLastName)
        //authPage.email.type(fakerEmail)
        //authPage.password.type(fakerpassword)
        //authPage.passwordConfirmation.type(fakerpassword)
        //authPage.checkBox.click()
        //authPage.submit.click()
        authPage.register(fakerFirstName, fakerLastName, fakerEmail, fakerpassword, fakerpassword)
        cy.wait('@galleries')
        cy.get('a').contains('Logout').should('be.visible')
    })

})