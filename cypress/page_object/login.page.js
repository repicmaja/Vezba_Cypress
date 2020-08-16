export default class Logpage {
    get email(){
        return cy.get('.form-control').eq(0)
    }

    get password(){
        return cy.get('.form-control').eq(1)
    }

    get login(){
        return cy.get('.btn')
    }

    get alert(){
        return cy.get('.alert')
    }
    get signin(){
        return cy.get('.nav-item').contains('Sign in')
    }
    get signout(){
        return cy.get('.nav-link').contains('Sign out')
    }
    get register(){
        return cy.get('.nav-link').contains('Register')
    }
    log(mejl,sifra){
        this.email.type(mejl)
        this.password.type(sifra)
        this.login.click()
    }

    get firstName(){
        return cy.get('#firstName')
    }
    get pass(){
        return cy.get('#password')
    }
    get lastName(){
        return cy.get('#lastName')
    }

    get passwordConfirmation(){
        return cy.get('#passwordConfirmation')
    }

    get checkBox(){
        return cy.get('#termsAndConditions')
    }
    get mail(){
        return cy.get('#email')
    }
    get submit(){
        return cy.get('.btn').contains('Submit')
    }
    reg(ime,prezime,sifra,sifraPotvrda,mejl){
        this.firstName.type(ime)
        this.lastName.type(prezime)
        this.pass.type(sifra)
        this.passwordConfirmation.type(sifraPotvrda)
        this.mail.type(mejl)
        this.submit.click()
    }


}

export const logPage = new Logpage()