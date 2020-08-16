import {EMAIL} from '../fixtures/constants'
import {logPage} from '../page_object/login.page'
import {gradeBooks} from '../page_object/Gradebooks'
import {profPage} from '../page_object/profesor.page'
import {CreateGradebook} from '../page_object/CreateGradebook'

describe('Professor module', () => {

    beforeEach(() => {
        cy.visit('/')
        logPage.log(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('diaries')
        cy.wait('@diaries')
        gradeBooks.professors.click()
        cy.wait(1000)
        
      

      })
    

  it('P-1 : Professor falling menu', () => {
   
    profPage.allProf.should('be.visible')
    profPage.createP.should('be.visible')
  
  })
   it('AP-1 : Professor page layout', () => {

    profPage.allProf.click()
    gradeBooks.myGradebooks.should('be.visible')
    gradeBooks.professors.should('be.visible')
    gradeBooks.createGradebooks.should('be.visible')
    profPage.filter.should('be.visible')
    gradeBooks.table.should('be.visible')
   
   })

   it('CP-1 : Create professor page layout', () => {

    profPage.createP.click()
    gradeBooks.myGradebooks.should('be.visible')
    gradeBooks.professors.should('be.visible')
    gradeBooks.createGradebooks.should('be.visible')
    profPage.ime.should('be.visible')
    profPage.prezime.should('be.visible')
    profPage.add.should('be.visible')
    profPage.add.click()
    profPage.url.should('be.visible')
    profPage.add.should('be.visible')
    profPage.remove.should('be.visible')
    profPage.up.should('be.visible')
    profPage.down.should('be.visible')
    CreateGradebook.submit.should('be.visible')
   })

   it('CP-3 : Create professor -invalid ', () => {
    profPage.createP.click()
    cy.wait(1000)
    profPage.add.click()
    profPage.ime.type('Mr')
    profPage.prezime.type('Bean')
    profPage.submit.click()
    profPage.url.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
      })
   })



   it('CP-2 : Create professor -valid ', () => {
    profPage.createP.click()
    cy.wait(1000)
    profPage.add.click()
    profPage.createProf('MONSEUR','Monseur','https://filmdaily.co/wp-content/uploads/2020/04/money-heist-professor-lede-1300x731.jpg')
   })
   
   it.only('AP-2 : Filter existed professor', () => {

    profPage.allProf.click()
    profPage.filter.type('MONSEUR')
    cy.wait(1000)
    cy.get('tbody').should('contain','MONSEUR')
    
   })
   
})