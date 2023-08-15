describe('BizOS Login', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    const invalidEmail = Cypress.env('invalidEmail')
    const invalidPassword = Cypress.env('invalidPassword')
    const inboxUrl = Cypress.env('inboxUrl')

    beforeEach(()=>{
        cy.visit('/web/login/')
    })

    it("should display validation message if required field is left empty",()=>{
        
        // for both empty fields.
        cy.get('button[type="submit"]').click()
        cy.get('#login:invalid')
                        .invoke('prop', 'validationMessage')
                        .should('equal', 'Please fill out this field.')


        //for empty email field.
        cy.get('#password').type(password)
        cy.get('button[type="submit"]').click()
        cy.get('#login:invalid')
                        .invoke('prop', 'validationMessage')
                        .should('equal', 'Please fill out this field.')
        
        cy.get('#password').clear()


        //for empty password field.
        cy.get('#login').type(invalidEmail)
        cy.get('button[type="submit"]').click()
        cy.get('#password:invalid')
                        .invoke('prop', 'validationMessage')
                        .should('equal', 'Please fill out this field.')


    })

    it('should display masked password',() =>{
        cy.get("#password").type(invalidPassword)
                           .should('have.attr','type','password')
    })

    it(`Should display error message after entering invalid email and invalid password.`,() =>{
     
        cy.get("#login").type(invalidEmail)
        cy.get("#password").type(invalidPassword)
        cy.get('button[type="submit"]').click()

        cy.get("p.alert").should("contain","Wrong login/password")

    });
    
    it(`Should display error message after entering valid email but an invalid password.`,() =>{
     
        cy.get("#login").type(email)
        cy.get("#password").type(invalidPassword)
        cy.get('button[type="submit"]').click()

        cy.get("p.alert").should("contain","Wrong login/password")

    });

    it(`Should display error message after entering invalid email but a valid password.`,() =>{
     
        cy.get("#login").type(invalidEmail)
        cy.get("#password").type(password)
        cy.get('button[type="submit"]').click()

        cy.get("p.alert").should("contain","Wrong login/password")

    });


 
    it ("Should redirect to  BizOS inbox page after entering valid credentials", () => {
        
        cy.get("#login").type(email)
        cy.get("#password").type(password)
        cy.get('button[type="submit"]').click()

        cy.url().should('include', inboxUrl);

    })

          
})