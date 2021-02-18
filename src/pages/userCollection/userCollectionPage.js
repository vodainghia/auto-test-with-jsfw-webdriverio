import elementHandling from '../../../utils/elementHandling';
import dataHandling from '../../../utils/dataHandling';
const userProfileData = require('../../../data/testData/userCollection/userProfileData.json');
const collectionData = require('../../../data/testData/collection/collectionData.json');

const $ = elementHandling.singleElement;
const currentDatetime = dataHandling.getDatetime();
const collectionUserBtn = 'header [role="presentation"]';
const viewProfileBtn = `div[role="menu"] a[role="link"][href="/@${userProfileData.username}"]`;
const fullNameTxt = 'div[data-test="users-route"] >div:nth-child(2) div.U8wGh';
const editProfileBtn = 'div[data-test="users-route"] a[href="/account"]';
const locationTextBox = 'input#user_location';
const updateAccountBtn =  '[value="Update account"][name="commit"]';
const likesBtn = 'a[data-test="user-nav-link-likes"]';
const unlikeBtn = '[data-test="users-likes-route"] figure:first-child button[type="button"][title="Like photo"]';
const collectionsBtn = 'a[data-test="user-nav-link-collections"]';
const editBtn = '._5eBad button[type="button"]';
const deleteCollectionLink = '._3Gs8n button[type="button"]';
const deleteBtn = '._3Gs8n button._27EoX[type="button"]';
const collectionHref = '[data-test="collection-feed-card"] a.fM0CB._1CBrG';
const likedPhotoHref = `a[itemprop='contentUrl'][href='/photos/{photoID}']`;
const collectionsHref = `[data-test="users-collections-route"] [data-test="collection-feed-card"] [href="/collections/{to be replaced}"]`;

class userCollectionPage {

    goToUserCollectionPage() {
        $(collectionUserBtn).click();
        $(viewProfileBtn).click();
        return this;
    }

    getFullName() {
        return $(fullNameTxt).getText();
    }

    goToEditProfilePage() {
        $(editProfileBtn).click();
        return this;
    }

    inputNewLocation(value) {
        $(locationTextBox).setValue(value);
        return this;
    }

    clickOnUpdateAccountBtn() {
        $(updateAccountBtn).click();
        return this;
    }

    getLocation() {
        return $(locationTextBox).getValue();
    }

    waitForLocationDisplay() {
        return $(locationTextBox).waitForDisplayed({ timeout: browser.config.waitforTimeout });
    }

    clickOnLikesBtn() {
        $(likesBtn).click();
        return this;
    }

    getLikedPhotoURL(photoID) {
        return $(likedPhotoHref.replace(`{photoID}`, `${photoID}`)).isExisting();
    }

    clickUnlikePhoto() {
        $(unlikeBtn).click();
        return this;
    }

    clickOnCollectionsBtn() {
        $(collectionsBtn).click();
        return this;
    }

    clickOnCollection(collectionID) {
        const collectionName = collectionData.paramsCollection.title.replace(' ', '-');
        const replaceData = `${collectionID}/${collectionName + currentDatetime}`.toLowerCase();
        const collectionsHrefFix = collectionsHref.replace(`{to be replaced}`, replaceData);
        $(collectionsHrefFix).click();
        return this;
    }

    clickOnEditBtn() {
        $(editBtn).click();
        return this;
    }

    clickOnDeleteCollectionLink() {
        $(deleteCollectionLink).click();
        return this;
    }

    clickOnDeleteBtn() {
        $(deleteBtn).click();
        return this;
    }

    getCollectionListInCollections() {
        const collectionList = $$(collectionHref);
        return dataHandling.getElementListFromHref(collectionList);
    }

}

export default new userCollectionPage();