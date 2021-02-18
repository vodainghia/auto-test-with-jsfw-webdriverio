import elementHandling from '../../../utils/elementHandling';
import dataHandling from '../../../utils/dataHandling';
import LoginPage from '../login/loginPage';

const $ = elementHandling.singleElement;
const $$ = elementHandling.listElement;

const infoBtn = '//span[text()="Info"]/..';
const cameraModel = 'div[aria-label="Modal"] >div:last-child >dl:last-child >div:nth-child(2) >dd';
const focusLength = 'div[aria-label="Modal"] >div:last-child >dl:last-child >div:nth-child(3) >dd';
const relatedTags = '._3dpes ._3Z-ua a';
const addToCollectionBtn = '._3-6v7 button[title="Add to collection"]';
const closeAddToCollectionWindowBtn = '._3aAtM button';
const likePhotoBtn = '._3-6v7 button[title="Like photo"]';
const likedPhotoListLink = '.nDTlD a[itemprop="contentUrl"]';
const photoInCollectionHref = 'a[itemprop="contentUrl"]';
const likedPhoto = `a[itemprop='contentUrl'][href='/photos/{photoID}'] .IEpfq`;


class photoPage {

    clickOnInfoBtn() {
        $(infoBtn).click();
        return this;
    }

    openPhotoURL(photoId) {
        const url  = `/photos/${photoId}`;
        browser.url(url);
        return this;
    }

    getCameraModel() {
        return $(cameraModel).getText();
    }

    getFocalLength() {
        return $(focusLength).getText().replace('mm','');
    }

    closePopupWindow () {
        $(closeAddToCollectionWindowBtn).click();
        return this;
    }

    loginByAddToCollectionBtn(userName, password) {
        $(addToCollectionBtn).click();
        LoginPage.loginWithCorrectCreds(userName, password);
        this.closePopupWindow();
    }

    getRelatedTagsList() {
        const orgList = $$(relatedTags);
        return dataHandling.getElementListFromText(orgList);
    }

    openLikedPhoto(photoID) {
        const likedPhotoFix = likedPhoto.replace(`{photoID}`, `${photoID}`);
        $(likedPhotoFix).click();
        return this;
    }

    likePhoto() {
        $(likePhotoBtn).click();
        return this;
    }

    getLikedPhotosList() {
        const likedList = $$(likedPhotoListLink);
        return dataHandling.getElementListFromHref(likedList);
    }

    getPhotoListInCollection() {
        const photoList = $$(photoInCollectionHref);
        return dataHandling.getElementListFromHref(photoList);
    }

}

export default new photoPage();