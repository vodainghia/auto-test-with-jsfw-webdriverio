import photoPage from '../pages/photo/photoPage';
import dataHandling from '../../utils/dataHandling';
import apiHelper from '../apiHelper/apiHelper';
const loginData = require('../../data/testData/login/loginData.json');

describe(`Scenario 2: Check that all related tags of a photo are correct`, () => {
    let expectedTagsList = [];
    let actualTagsList;
    let photoID;
    
    before(`Get a random photo, get the tags list of this photo, login to the application and get tags list on UI`, () => {
        photoID = apiHelper.getRandomPhotoInfo().id;

        apiHelper.getPhotoInfo(photoID).tags.forEach(x => {
            expectedTagsList.push(dataHandling.capitalizeEachWord(x.title));          
        });

        photoPage
            .openPhotoURL(photoID)
            .loginByAddToCollectionBtn(loginData.user01.username, loginData.user01.password);
    });

    it(`Check all related tags of the photo ID ${photoID} are correct`, () => {
        actualTagsList = photoPage.getRelatedTagsList();
        expect(expectedTagsList).to.eql(actualTagsList, `The tags of photo ID ${photoID} are incorrect!`);
    });

});