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
    it('CG-4 HP-3 Create gradebook anotker profesor ', () => {
      // gradeBooks.professors.click()
      // profPage.createP.click()
      // cy.wait(1000)
      // profPage.add.click()
      // profPage.createProf('Petit','Monseur','https://filmdaily.co/wp-content/uploads/2020/04/money-heist-professor-lede-1300x731.jpg')
      // cy.wait(1000)
      gradeBooks.createGradebooks.click();
      CreateGradebook.title.type('gradebook3')
      CreateGradebook.profesor.select(['1331']).invoke('val')
      CreateGradebook.submit.click()   
      gradeBooks.filter.type('gradebook3')
      gradeBooks.search.click()
      gradeBooks.table.should('contain','gradebook3')
     })

    
     it('HP-5 Professor name is clickable ', () => {
      gradeBooks.filter.type('gradebook3')
      gradeBooks.search.click()
      gradeBooks.table.contains('td', 'Petit Monseur').click()
      cy.wait(1000)
      cy.get('table').contains('td', 'gradebook3').should('be.visible')
     
     })
     it('HP-4 Edit anotker profesor ', () => {
      gradeBooks.filter.type('gradebook3')
      gradeBooks.search.click()
      gradeBooks.table.contains('td', 'gradebook3').click()
      cy.wait(1000)
      myGradebook.Edit.should('not.exist')
      myGradebook.Delete.should('not.exist')
      myGradebook.AddStudent.should('not.exist')
     })
     it('HP-x Delete ', () => {
      gradeBooks.filter.type('gradebook3')
      gradeBooks.search.click()
      gradeBooks.table.contains('td', 'gradebook3').click()
      cy.wait(1000)
     
      myGradebook.Delete.click()
     
     })
})