
import Login from "../pageObject/login"


//custom command to set password,email and clicking Login
Cypress.Commands.add('Login',(email,password) => {

    let txtemail = "#login"
    let txtpassword = "#password"
    let btnclick = 'button[type="submit"]'

    cy.get(txtemail).type(email)

    cy.get(txtpassword).type(password)

    cy.get(btnclick).click()


})
