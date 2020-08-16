import {EMAIL} from '../fixtures/constants'
import {logPage} from '../page_object/login.page'
import {CreateGradebook} from '../page_object/CreateGradebook'
import {gradeBooks} from '../page_object/Gradebooks'
import {myGradebook} from '../page_object/MyGradebook'
import {profPage} from '../page_object/profesor.page'
describe('Create gradebook module', () => {

  beforeEach(() => {
      cy.visit('/')
      logPage.log(EMAIL.EXISTING, EMAIL.PASSWORD)
      cy.server()
      cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('diaries')
      cy.wait('@diaries')
     
    })
  
  it('CG-1 : Create gradebook layout ', () => {
    gradeBooks.createGradebooks.click();
    CreateGradebook.title.should('be.visible')
    CreateGradebook.profesor.should('be.visible')
    CreateGradebook.submit.should('be.visible')
  })
  it('CG-3 Create gradebook - empty title', () => {
    gradeBooks.createGradebooks.click();
    CreateGradebook.profesor.select(['316']).invoke('val')
    CreateGradebook.submit.click()
    logPage.alert.should('have.text','\n        Message: The given data was invalid.\n        \n          [\n  "The title field is required."\n]\n        ')
    gradeBooks.Gradebooks.click()
  })
  it('CG-2 Create valid gradebook-registered user', () => {
    gradeBooks.createGradebooks.click();
        CreateGradebook.title.type('gradebook1')
        CreateGradebook.profesor.select(['316']).invoke('val')
        CreateGradebook.submit.click()   
  })
  it('MG-2 My gradebook-page layout', () => {
    gradeBooks.myGradebooks.click()
    cy.get('tr').should('contain','gradebook1')
    gradeBooks.Gradebooks.click()
})
it('MG-8 My gradebook-add student', () => {
  gradeBooks.myGradebooks.click()
  myGradebook.AddStudent.click()
  cy.wait(1000)
  profPage.ime.type('Krcko')
  profPage.prezime.type('Orascic')
  profPage.submit.click()
  cy.wait(1000)
  gradeBooks.Gradebooks.click()
 gradeBooks.myGradebooks.click()
  cy.get('tr').should('contain','Krcko Orascic')
})   
it('MG-5 My gradebook-add comment', () => {
  gradeBooks.myGradebooks.click()
  myGradebook.com('Hello world')
  cy.wait(1000)
  gradeBooks.Gradebooks.click()
  cy.wait(1000)
  gradeBooks.myGradebooks.click()
  cy.get('.comments-box').should('contain','Hello world')
})   
it('MG-6 My gradebook-delete comment', () => {
  gradeBooks.myGradebooks.click()
  cy.wait(1000)
  CreateGradebook.del.click()

})   
it('MG-4 Edit gradebook', () =>{
  gradeBooks.myGradebooks.click()
  cy.wait(1000)
  myGradebook.Edit.click()
  CreateGradebook.title.clear()
  cy.wait(1000)
  CreateGradebook.title.type('izmena')
  myGradebook.Submit.click()
 

})


it('MG-7 My gradebook-delete gradebook', () => {
  gradeBooks.myGradebooks.click()
  cy.wait(1000)
  CreateGradebook.delete.click()
  gradeBooks.Gradebooks.click()
  gradeBooks.myGradebooks.click()
  gradeBooks.table.should('not.contain','izmena')
})   

})


