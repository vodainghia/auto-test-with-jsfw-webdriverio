import loginPage from '../pages/login/loginPage';
import userCollectionPage from '../pages/userCollection/userCollectionPage';
import photoPage from '../pages/photo/photoPage';
import apiHelper from '../apiHelper/apiHelper';
const loginData = require('../../data/testData/login/loginData.json');

describe(`Scenario 4: Check the removed photo from the existed collection`, () => {
    let collectionID;
    let removedPhotoID;
    let keptPhotoID;
    let photoListInCollection;
    let collectionListInCollections;
    
    before(`Login to the application, create a temp collection, get 02 random photos, add these photos to temp collection`, () => {
        collectionID = apiHelper.createCollection().id;
        removedPhotoID = apiHelper.getRandomPhotoInfo().id;
        keptPhotoID = apiHelper.getRandomPhotoInfo().id;

        apiHelper
            .addPhotoToCollection(collectionID, removedPhotoID)
            .addPhotoToCollection(collectionID, keptPhotoID)
            .removePhotoFromCollection(collectionID, removedPhotoID);

        loginPage
            .goToLoginPage()
            .loginWithCorrectCreds(loginData.user01.username, loginData.user01.password);

        userCollectionPage
            .goToUserCollectionPage()
            .clickOnCollectionsBtn()
            .clickOnCollection(collectionID);
    });

    it(`Check the photo ID ${removedPhotoID} is removed and the photo ID ${keptPhotoID} is in the collection ID (${collectionID})`, () => {
        photoListInCollection = photoPage.getPhotoListInCollection();

        expect(photoListInCollection).to.not.include(removedPhotoID, `The photo ID ${removedPhotoID} is not removed!`)
        expect(photoListInCollection).to.include(keptPhotoID, `The photo ID ${keptPhotoID} is not in temp collection ${collectionID}!`);
    });

    after(`To delete the temp collection (${collectionID})`, () => {
        apiHelper.deleteCollection(collectionID);

        collectionListInCollections = apiHelper.getCollectionList();
        
        expect(collectionListInCollections).to.not.include(collectionID, `The temp collection ${collectionID} is not deleted!`);
    });
});