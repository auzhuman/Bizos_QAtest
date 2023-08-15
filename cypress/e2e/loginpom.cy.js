import Login from "../pageObject/login";

const ln = new Login(); //import the pageobject for login as ln
let url, credentials,message;
describe ('bizos login' ,() => {
     

    beforeEach(()=>{
        cy.fixture('login').then((data) => {
            //import the fixtures login data as logindata
            url = data.url;
            credentials  =data.credentials;
            message = data.message;
            cy.visit(url.loginUrl)
        })
    })

    it("should display validation message if required field is left empty",()=>{
        
        // for both empty fields
        ln.clicklogin();
        ln.assertionValidation(ln.getEmail(), message.validation  )


        //for empty email field.
        ln.setEmail(credentials.email)
        ln.clicklogin()
        ln.assertionValidation(ln.getPassword(),message.validation)


        ln.clearEmailField();

        // for empty password field
        ln.setPassword(credentials.password)
        ln.clicklogin()
        ln.assertionValidation(ln.getEmail(),message.validation)
        

    })

    it('Should display masked password',() => {
        ln.setPassword(credentials.invalidPassword).should('have.attr','type','password')
    })

    it(`Should display error message after entering invalid email and invalid password.`,() =>{
        cy.Login(credentials.invalidEmail,credentials.invalidPassword)
        ln.errormessage( message.error )
    })

    it(`Should display error message after entering valid email but an invalid password.`,() =>{
        ln.loginpom(credentials.email,credentials.invalidPassword)
        ln.errormessage(message.error)
    })

    it(`Should display error message after entering invalid email but a valid password.`,() =>{
        cy.Login(credentials.invalidEmail,credentials.password)
        ln.errormessage(message.error)
    })

    it("Should redirect to  BizOS inbox page after entering valid credentials", () => {
        cy.Login(credentials.email,credentials.password)
        ln.verifylogin(credentials.name)

    })
    it.only("console using cy.task",() => {
        cy.task('displayNum','this is a message from the spec file')
    })
})
