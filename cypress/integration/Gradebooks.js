import {EMAIL} from '../fixtures/constants'
import {logPage} from '../page_object/login.page'
import {gradeBooks} from '../page_object/Gradebooks'


describe('Create gradebook module', () => {

    beforeEach(() => {
        cy.visit('/')
        logPage.log(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('diaries')
        cy.wait('@diaries')
        

      })
    

  it('HP-1 : Gradebooks page layout ', () => {

    gradeBooks.myGradebooks.should('be.visible')
    gradeBooks.table.should('be.visible')
    gradeBooks.professors.should('be.visible')
    gradeBooks.filter.should('be.visible')
    gradeBooks.search.should('be.visible')
    gradeBooks.createGradebooks.should('be.visible')
   
  })



})
