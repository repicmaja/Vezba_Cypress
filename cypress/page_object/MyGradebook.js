export default class Mygradebook {

    get Edit(){
        return cy.get('.btn').contains('Edit Gradebook')
    }
    get Submit(){
        return cy.get('.btn').contains('Submit')
    }
    
    get AddStudent(){
        return cy.get('.btn').contains('Add Student')
    }
  
    get Delete(){
        return cy.get('.btn-danger').contains('Delete Gradebook')
    }

    get Comment(){
        return cy.get('.form-control')
    }
    get submitC(){
        return cy.get('.btn').contains('Submit Comment')
    }
    com(komentar){
        this.Comment.type(komentar)
        this.submitC.click()
    }

}

export const myGradebook = new Mygradebook()