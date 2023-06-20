import formData from "../fixtures/formData.json";

export function login(qweqwe) {
  cy.log("Open website login page");
  cy.visit("/index.php?rt=account/login");

  cy.log("Check user is unauthorized");
  cy.getCookie("customer").should("be.null");

  cy.log("Authorize user");
  cy.get("#loginFrm_loginname").type(qweqwe.username);
  cy.get("#loginFrm_password").type(qweqwe.password);
  cy.get('button[type="submit"]').contains("Login").click();
}

// export function findNewProd(productName){
//     cy.get('ul.pagination a').then( pages => {
//         for(let i = 1; i < pages.length; i++){
//             cy.location().then( location => {
//                 if(!location.search.includes('product/product')){
//                     cy.get('body').then( body => {
//                         if(body.find(`.prdocutname[title="${productName}"]`).length > 0){
//                             cy.get(`.prdocutname[title="${productName}"]`).click();
//                         } else {
//                             cy.get('ul.pagination a').contains('>').click();
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }

export function findProduct(productName) {
  cy.get("body").then((body) => {
    if (body.find(`.prdocutname[title="${productName}"]`).length > 0) {
      cy.get(`.prdocutname[title="${productName}"]`).click();
    } else {
      cy.get("ul.pagination a").contains(">").click();
      findProduct(productName);
    }
  });
}

export function loginViaApi(user) {
  let requestBody = new FormData();

  requestBody.loginname = user.username;
  requestBody.password = user.password;

  // дістати з html get (значення)
  cy.request({
    method: "POST",
    url: "/index.php?rt=account/login",
    body: requestBody,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.isOkStatusCode).to.be.true;

    let token = response.body.csrftoken;
    let instance = response.body.csrfinstance;

    formData.loginname = user.username;
    formData.password = user.password;
    formData.csrftoken = token;
    formData.csrfinstance = instance;

    //засетати в localStorage
    //window.localStorage.setItem("user", JSON.stringify(sessionData));

    //   import cy from 'cypress';

    //   // запит і отримуємо HTML-відповідь
    //    cy.request('https://example.com')
    //       .its('body') //  тіло відповіді
    //       .then((body) => {
    //       // Виконуємо операції з отриманим HTML
    //       const value = Cypress.$('selector', body).text(); // Замість 'selector' вкажи необхідний селектор

    //       // Виводимо отримане значення
    //       cy.log('Отримане значення:', value);
    //       });
  });
}
