export default class Authpage {
    get email(){
        return cy.get('#email')
    }

    get password(){
        return cy.get('#password')
    }

    get submit(){
        return cy.get('[type=submit]')
    }

    get alert(){
        return cy.get('.alert')
    }

    login(mejl,sifra){
        this.email.type(mejl)
        this.password.type(sifra)
        this.submit.click()
    }

    get firstName(){
        return cy.get('#first-name')
    }

    get lastName(){
        return cy.get('#last-name')
    }

    get passwordConfirmation(){
        return cy.get('#password-confirmation')
    }

    get checkBox(){
        return cy.get('[type=checkbox]')
    }

    register(ime, prezime, mejl,sifra, sifraPotvrda, cekBoks){
        this.firstName.type(ime)
        this.lastName.type(prezime)
        this.email.type(mejl)
        this.password.type(sifra)
        this.passwordConfirmation.type(sifraPotvrda)
        this.checkBox.click()
        this.submit.click()
    }


}

export const authPage = new Authpage()