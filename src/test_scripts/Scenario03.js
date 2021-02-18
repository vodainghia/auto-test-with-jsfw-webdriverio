import loginPage from '../pages/login/loginPage';
import userCollectionPage from '../pages/userCollection/userCollectionPage';
import photoPage from '../pages/photo/photoPage';
import apiHelper from '../apiHelper/apiHelper';
const loginData = require('../../data/testData/login/loginData.json');

describe(`Scenario 3: Check that the user can create a new collection and add a photo into it.`, () => {
    let collectionID;
    let photoID;
    let photoListInCollections;
    let collectionListInCollections;
    
    before(`Login to the application, create a temp collection, get a random photo, add this photo to temp collection and navigate to Collection Page`, () => {
        collectionID = apiHelper.createCollection().id;
        photoID = apiHelper.getRandomPhotoInfo().id;

        apiHelper.addPhotoToCollection(collectionID, photoID);

        loginPage
            .goToLoginPage()
            .loginWithCorrectCreds(loginData.user01.username, loginData.user01.password);

        userCollectionPage
            .goToUserCollectionPage()
            .clickOnCollectionsBtn()
            .clickOnCollection(collectionID);
    });

    it(`Check the collection ID (${collectionID}) and photo ID ${photoID} are correct`, () => {
        photoListInCollections = photoPage.getPhotoListInCollection();

        expect(photoListInCollections).to.include(photoID, `The collection ID (${collectionID}) and photo ID ${photoID} are incorrect!`);
    });

    after(`To delete the temp collection (${collectionID})`, () => {
        apiHelper.deleteCollection(collectionID);

        collectionListInCollections = apiHelper.getCollectionList();
        
        expect(collectionListInCollections).to.not.include(collectionID, `The temp collection ${collectionID} is not deleted!`);
    });
});