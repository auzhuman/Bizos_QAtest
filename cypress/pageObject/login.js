class Login{

    txtemail = "#login"
    txtpassword = "#password"
    btnclick = 'button[type="submit"]'
    alertMessage = 'p.alert'
    topBarname = '.oe_topbar_name'

    getEmail(){
         return cy.get(this.txtemail)
    }
    getPassword(){
        return cy.get(this.txtpassword)
    }

    setEmail(email){
        return   cy.get(this.txtemail).type(email)
    }
    setPassword(password){
        return cy.get(this.txtpassword).type(password)

    }
    clicklogin(){
        return cy.get(this.btnclick).click()
    }
    verifylogin(name){
        // return  cy.url().should('include', inboxUrl);
        cy.get(this.topBarname).should('contain', name)


    }
    clearEmailField(){
        return  cy.get(this.txtemail).clear()

    }

    assertionValidation(selector,validation){
        selector.invoke('prop','validationMessage')
                     .should('eq',validation)

    }
    errormessage(errorMessage){
        return  cy.get(this.alertMessage).should("contain",errorMessage)

    }

    loginpom (email,password){
         cy.get(this.txtemail).type(email)
         cy.get(this.txtpassword).type(password)
         cy.get(this.btnclick).click()
         return this

    }

    
}

export default Login;
