import loginPage from '../pages/login/loginPage';
import photoPage from '../pages/photo/photoPage';
import userCollectionPage from '../pages/userCollection/userCollectionPage';
import apiHelper from '../apiHelper/apiHelper';
const loginData = require('../../data/testData/login/loginData.json');

describe(`Scenario 5: Check like a random photo`, () => {
    let likedPhotoID;
    let likedPhotosList;
    
    before(`Login to the application, get a random photo and then like it`, () => {
        likedPhotoID = apiHelper.getRandomPhotoInfo().id;
        
        loginPage
            .goToLoginPage()
            .loginWithCorrectCreds(loginData.user01.username, loginData.user01.password);

        photoPage
            .openPhotoURL(likedPhotoID)
            .likePhoto();

        userCollectionPage
            .goToUserCollectionPage()
            .clickOnLikesBtn();
    });

    it(`Check if the photo ID ${likedPhotoID} is existing in the liked ones`, () => {
        expect(userCollectionPage.getLikedPhotoURL(likedPhotoID)).to.be.true;
    });

    after(`Remove the liked photo and check if the photo ID ${likedPhotoID} is non-existing`, () => {
        apiHelper.unlikePhoto(likedPhotoID);

        likedPhotosList = apiHelper.getPhotoList();

        expect(likedPhotosList).to.not.include(likedPhotoID, `The photo ID ${likedPhotoID} is still liked!`);
    })
});