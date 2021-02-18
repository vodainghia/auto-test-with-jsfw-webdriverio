import elementHandling from '../../../utils/elementHandling';

const $ = elementHandling.singleElement;
const userNameTextBox = 'input#user_email';
const passwordTextBox = 'input#user_password';
const loginButton = 'div >[type="submit"][value="Login"]';

class loginPage {

    inputUserName(value) {
        $(userNameTextBox).setValue(value);
        return this;
    }

    inputPassword(value) {
        $(passwordTextBox).setValue(value);
        return this;
    }

    clickOnLoginButton() {
        $(loginButton).click();
        return this;
    }

    loginWithCorrectCreds(userName, password) {
        this.inputUserName(userName);
        this.inputPassword(password);
        this.clickOnLoginButton();
        return this;
    }

    goToLoginPage() {
        browser.url('/login');
        return this;
    }

}

export default new loginPage();