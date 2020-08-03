import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {galleryPage} from '../page_object/create-gallery.page'

const faker = require('faker');

var Title = faker.random.word();
var Description = faker.lorem.sentence();


describe('Create gallery module', () => {

  beforeEach(() => {
    cy.visit('/login')
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
    cy.wait('@galleries')
    cy.visit('/create')
    cy.url().should('eq','https://gallery-app.vivifyideas.com/create')
  })

  it('GA-21, GA-27, GA-34 : Create new gallery valid  ', () => {
    galleryPage.createGallery( Title, Description, "https://www.bautrip.com/images/what-to-visit/bavaro-beach-punta-cana.jpg")
    // cy.get('h1').contains('Create Gallery').should('be.visible')
    // cy.get('#title').type(fakerTitle)
    // cy.get('#description').type(fakerDescription)
    // cy.get('[type=url]').type(fakerImage)
    // cy.get('[type=submit]').contains('Submit').click()
  })

  it('My gallery - pagination - load more', () => {
      for(var i=2;i<=11;i++){
        cy.visit('/create')
        galleryPage.createGallery( 'Test', 'Test galerija', "https://www.bautrip.com/images/what-to-visit/bavaro-beach-punta-cana.jpg");
        }
        cy.visit('/my-galleries')
        cy.contains('Load More').should('not.exist')
        cy.visit('/create')
        galleryPage.createGallery(Title, Description, "https://3j0grh44ocny4a6kcn288izx-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/bahamas-caribbean-sandbar-perfect-1024x576.jpg");
        cy.visit('/my-galleries')
        cy.get('.btn-custom').contains('Load More').should('be.visible')
  })

  it('My gallery - delete', () => {
    for(var j=1;j<=11;j++){
      cy.visit('/my-galleries')
      cy.get('.box-title').first().click()
      cy.wait(1000)
      cy.get('.btn-custom').contains('Delete Gallery').click()
    }


})

})

//cy.get('div.grid).children().should('have.length', 10)