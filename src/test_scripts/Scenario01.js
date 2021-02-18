import loginPage from '../pages/login/loginPage';
import userCollectionPage from '../pages/userCollection/userCollectionPage';
import apiHelper from '../apiHelper/apiHelper';
const loginData = require('../../data/testData/login/loginData.json');
const userProfileData = require('../../data/testData/userCollection/userProfileData.json');

describe(`Scenario 1: Check that the user's location is correct after updated`, () => {
    let oldLocation;
    let currentLocation;
    
    before(`Login to the application and change the location to ${userProfileData.location}`, () => {
        loginPage
            .goToLoginPage()
            .loginWithCorrectCreds(loginData.user01.username, loginData.user01.password);

        userCollectionPage
            .goToUserCollectionPage()
            .goToEditProfilePage();

        oldLocation = userCollectionPage.getLocation();

        userCollectionPage
            .inputNewLocation(userProfileData.location)
            .clickOnUpdateAccountBtn();
    });

    it(`The current location should be ${userProfileData.location}`, () => {
        currentLocation = userCollectionPage.getLocation();

        expect(currentLocation).to.equal(userProfileData.location, `${userProfileData.location} is not current location!`);
    });

    after(`To return the old location ${oldLocation}`, () => {
        apiHelper.updateLocation(oldLocation);
        currentLocation = apiHelper.getLocation().location;
        console.log(currentLocation)
        expect(currentLocation).to.equal(oldLocation, `${oldLocation} is not returned!`);
    });
});