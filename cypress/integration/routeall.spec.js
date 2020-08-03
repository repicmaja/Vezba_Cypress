import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {randomEmail} from '../utils/'

const faker = require('faker');

var email = faker.internet.email();
var password = faker.internet.password();

describe('Route all', () => {

  beforeEach(() => {
    cy.visit('/login')
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=' ).as('stubing')
  })

it('Get', () => {
    // cy.request('Post',Cypress.env('apiUrl') + '/auth/login', {'email': "repicmaja@gmail.com", 'password': "maja1992"} )
    // .then((resp)=>{
    //    expect(resp.body).to.have.property('access_token')
    //    expect(resp.body).to.have.property('token_type')
    //   localStorage.setItem('token', resp.body.access_token)
    // })
    cy.loginBe(EMAIL.EXISTING,EMAIL.PASSWORD)
    //cy.visit('/')
    cy.wait('@stubing')
    cy.get('@stubing').
    its('response').then((resp)=>{
        //cy.log(resp.body.galleries[0].id)
        cy.request({
            method: 'DELETE',
            url: Cypress.env('apiUrl') + '/galleries' + resp.body.galleries[0].id,
            form: true,
            followRedirect: true,
            headers:{
                authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            
        })
          
    })
    })
})

