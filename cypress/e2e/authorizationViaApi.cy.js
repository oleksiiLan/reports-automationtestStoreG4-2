import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";
import formData from "../fixtures/formData.json"

it('Authorization', {retries: 2}, () => {
  homePage.visit();
  homePage.getLoginOrRegisterButton().click();
  loginPage.submitLoginForm();
})