export default class Profpage {
 
    get allProf(){
        return cy.get('.dropdown-item').contains('All Professors')
    }

    get createP(){
        return cy.get('.dropdown-item').contains('Create Professor')
    }

    get filter(){
        return cy.get('.form-control')
    }
    get ime(){
        return cy.get('#firstName')
    }
    get prezime(){
        return cy.get('#lastName')
    }
    get add(){
        return cy.get('.btn').contains('Add image')
    }
    get remove(){
        return cy.get('.btn').contains('Remove image')
    }
    get up(){
        return cy.get('.btn').contains('Move image up')
    }
    get down(){
        return cy.get('.btn').contains('Move image down')
    }
    get url(){
        return cy.get('.form-control')
    }
    get submit(){
        return cy.get('.btn').contains('Submit')
    }
    get search(){
        return cy.get('.btn').contains('Search')
    }
  
    createProf(ime, prezime, slika){
        this.ime.type(ime)
        this.prezime.type(prezime)
        this.url.type(slika)
        this.submit.click()
    }


}

export const profPage = new Profpage()