import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {randomEmail} from '../utils/'
import {GalleryPage} from '../page_object/create-gallery.page'
const faker = require('faker');
var Title = faker.random.word();
var Description = faker.lorem.sentence();

var email = faker.internet.email();
var password = faker.internet.password();

describe('Route all', () => {

  beforeEach(() => {
    cy.visit('/login')
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/my-galleries?page=1&term=' ).as('stubing')
  })

it('Get', () => {
    // cy.request('Post',Cypress.env('apiUrl') + '/auth/login', {'email': "repicmaja@gmail.com", 'password': "maja1992"} )
    // .then((resp)=>{
    //    expect(resp.body).to.have.property('access_token')
    //    expect(resp.body).to.have.property('token_type')
    //   localStorage.setItem('token', resp.body.access_token)
    // })
    cy.loginBe(EMAIL.EXISTING,EMAIL.PASSWORD)
   cy.visit('/create')
    // cy.wait('@stubing')
    //  for(var i=1;i<=10;i++){
    //     cy.visit('/create')
    //   GalleryPage.createGallery( Title, Description, "https://www.bautrip.com/images/what-to-visit/bavaro-beach-punta-cana.jpg");
    //     }
    //cy.get('@stubing').
    cy.visit('/my-galleries')
    cy.wait('@stubing')
    cy.get('@stubing').
    its('response').then((resp)=>{
    cy.log(resp.body.galleries[0].id)
    for(let i=0; i<10; i++) {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[i].id,
                form: true,
                followRedirect: true,
                headers:{
                authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
               
            })
    }

          
     })
    })
})

