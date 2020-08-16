import {EMAIL} from '../fixtures/constants'
import {logPage} from '../page_object/login.page'


describe('Register module', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('diaries')
        logPage.register.click()
      })
    it('R-1 Register page layout', () => {
      
        logPage.firstName.should('be.visible')
        logPage.lastName.should('be.visible')
        logPage.email.should('be.visible')
        logPage.pass.should('be.visible')
        logPage.passwordConfirmation.should('be.visible')
        logPage.checkBox.should('be.visible')
        logPage.submit.should('be.visible')
    })


    
    it('R-3 : Registration with invalid form of password', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.lastName.type(EMAIL.PREZIME)
       
        logPage.pass.type('MAJAREPIC')
        logPage.passwordConfirmation.type('MAJAREPIC')
        logPage.mail.type(EMAIL.EXISTING)

        logPage.submit.click()
        logPage.pass.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please match the requested format.')
            })

        })
    it('R-4 : Registration with invalid form of password', () => {
     logPage.firstName.type(EMAIL.IME)
    logPage.lastName.type(EMAIL.PREZIME)
               
    logPage.pass.type('MAJAREPIC92')
   logPage.passwordConfirmation.type('MAJAREPIC92')
    logPage.mail.type(EMAIL.EXISTING)

    logPage.submit.click()
    logPage.pass.then(($input) => {
    expect($input[0].validationMessage).to.eq('Please match the requested format.')
                    })
     })

               
    it('R-5 : Registration with empty first names', () => {
        logPage.lastName.type(EMAIL.PREZIME)
        logPage.pass.type(EMAIL.PASSWORD)
        logPage.passwordConfirmation.type(EMAIL.PASSWORD)
        logPage.mail.type(EMAIL.EXISTING)
        
        logPage.submit.click()
        logPage.firstName.then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
         })
                                   
               
     })        
     it('R-6 : Registration with empty last names', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.pass.type(EMAIL.PASSWORD)
        logPage.passwordConfirmation.type(EMAIL.PASSWORD)
        logPage.mail.type(EMAIL.EXISTING)
       
        logPage.submit.click()
        logPage.lastName.then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
         })
                                   
               
     })        
     it('R-7 : Registration with empty password field', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.lastName.type(EMAIL.PREZIME)
        logPage.mail.type(EMAIL.EXISTING)
       
        logPage.submit.click()
        logPage.pass.then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
         })          
     })       

     it('R-8 : Registration with empty email field', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.lastName.type(EMAIL.PREZIME)
        logPage.pass.type(EMAIL.PASSWORD)
        logPage.passwordConfirmation.type(EMAIL.PASSWORD)
        
        logPage.submit.click()
        logPage.mail.then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
         })          
     })      

     it('R-9 : Registration with unckecked tersm and conditions', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.lastName.type(EMAIL.PREZIME)
        logPage.pass.type(EMAIL.PASSWORD)
        logPage.passwordConfirmation.type(EMAIL.PASSWORD)
        logPage.mail.type(EMAIL.EXISTING)
        logPage.submit.click()
        logPage.checkBox.click()
        logPage.alert.should('be.visible')
     })     
     
     it('R-10 : Registration with wrong password confirmation', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.lastName.type(EMAIL.PREZIME)
        logPage.pass.type(EMAIL.PASSWORD)
        logPage.passwordConfirmation.type('MAJAaa1992')
        logPage.mail.type(EMAIL.EXISTING)
        logPage.submit.click()
      //pokusala sam da uhvatim alert koji se pojavljuje na razne nacine ali nisam uspela
        
     })     

     
     it('R-11 : Registration password less than 8 letters', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.lastName.type(EMAIL.PREZIME)
        logPage.pass.type('Maja19')
        logPage.passwordConfirmation.type('Maja19')
        logPage.mail.type(EMAIL.EXISTING)
       
        logPage.submit.click()
        logPage.pass.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please match the requested format.')
                 })
     })    
     it('R-12 : Registration with all fields empty ', () => {
        
        logPage.submit.click()
        logPage.firstName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
                 })
        
     })   
     it('R-13 : Registration with all fields empty and unchecked', () => {
        logPage.checkBox.click()
        logPage.submit.click()
        logPage.firstName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
                 })
        
     })   

     it('R-15 : Registration with invalid form of email', () => {
        logPage.firstName.type(EMAIL.IME)
        logPage.lastName.type(EMAIL.PREZIME)
       
        logPage.pass.type(EMAIL.PASSWORD)
        logPage.passwordConfirmation.type(EMAIL.PASSWORD)
        logPage.mail.type('testiranje001gmail.com')

        logPage.submit.click()
        logPage.mail.then(($input) => {
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'testiranje001gmail.com' is missing an '@'.")
            })

        })

        
    it('R-2 : Registation', () => {
                logPage.reg(EMAIL.IME,EMAIL.PREZIME,EMAIL.PASSWORD,EMAIL.PASSWORD,EMAIL.EXISTING)
                cy.wait('@diaries')
             })

    it('R-14 : Registation with same credentials', () => {
     logPage.reg(EMAIL.IME,EMAIL.PREZIME,EMAIL.PASSWORD,EMAIL.PASSWORD,EMAIL.EXISTING)
    cy.wait('@diaries')
    logPage.firstName.then(($input) => {
        expect($input[0].validationMessage).to.eq('User already exists')
             })
    })
    
    it.only('R-16 : Registation user2', () => {
        logPage.reg('Testerko','Testeric2','Maja19592','Maja19592','testiranje003@gmail.com') 
        cy.wait('@diaries')
     })
    

})