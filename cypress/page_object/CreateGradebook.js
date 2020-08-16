export default class createGradebook {


    get title(){
        return cy.get('#title')
    }

    get profesor(){
        return cy.get('#professor')
    }

    get image(){
        return cy.get('[type=url]')
    }
   
    get submit(){
        return cy.get('.btn').contains('Submit')
    }
    get del(){
        return cy.get('.mb-3').contains('Delete')
    }
    get delete(){
        return cy.get('.btn').contains('Delete Gradebook')
    }


}

export const CreateGradebook = new createGradebook()