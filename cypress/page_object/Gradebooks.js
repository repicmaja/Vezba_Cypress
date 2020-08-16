export default class Gradebooks {
    get myGradebooks(){
        return cy.get('.nav-link').contains('My Gradebook')
    }

    get createGradebooks(){
        return cy.get('.nav-link').contains('Create Gradebook')
    }
    get Gradebooks(){
        return cy.get('.nav-link').contains('Gradebooks')
    }

    get professors(){
        return cy.get('#navbardrop')
    }
    get filter(){
        return cy.get('.form-control')
    }
    get search(){
        return cy.get('.mt-3')
    }

    get table(){
        return cy.get('.table-dark')
    }
}
        export const gradeBooks = new Gradebooks()