
let url, credentials, message;

describe('intercept concept suite', () => {
  beforeEach(() => {
    cy.fixture('login').then((data) => {
      url = data.url;
      credentials = data.credentials;
      message = data.message;
      cy.visit(url.loginUrl);
    });
  });

  it('intercept bizos login ', () => {
 cy.intercept('POST', '/check/location',(req) => {
  req.reply((res) => {
    if(res.statusCode == 200){
      res.body.result.url = "/web#action=479&cids=1&menu_id=317"
    }
  })
 }).as('login');

    cy.Login(credentials.email, credentials.password);

    cy.wait('@login');
    // .then((interception) => {
    //   let responseStatusCode = interception.response.statusCode;
    //   // cy.log('Response Status Code:', responseStatusCode);
    //   // cy.log('Response Status Code:', interception.response.body);
      
    //   expect(responseStatusCode).equal(200);
    // }).debug();

  });
});
