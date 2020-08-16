import {EMAIL} from '../fixtures/constants'
import {logPage} from '../page_object/login.page'



describe('Sign in module', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('diaries')
  })

  it('SI-1 : Login page layout ', () => {

    logPage.email.should('be.visible')
    logPage.password.should('be.visible')
    logPage.login.should('be.visible')
    logPage.signin.should('be.visible')
    logPage.register.should('be.visible')
  })

  it('SI-2 : Login - valid credentials', () => {

    logPage.log(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.wait('@diaries')
   
  })

  it('SI-4 : Login - invalid username ', () => {

    logPage.log('repicma@gmail.com', EMAIL.PASSWORD)
   
    logPage.alert.should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })

  it('SI - 6 :Login - empty username ', () => {
       
        logPage.password.type(EMAIL.PASSWORD)
        logPage.login.click()
        logPage.email.then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        })

  it('SI-7 :Login - empty password ', () => {
        
        logPage.email.type(EMAIL.EXISTING)
        logPage.login.click()
       logPage.password.then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        })    
    
  it('SI-3: Login - invalid password ', () => {

   logPage.log(EMAIL.EXISTING, 'majarepic92')
   
    logPage.alert.should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })
 
  it('SI-5 : Login - invalid username and password ', () => {

    logPage.log('repicma@gmail.com','majarepic92')
    
    logPage.alert.should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })

})