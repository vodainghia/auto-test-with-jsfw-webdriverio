import apiHandling from '../../utils/apiRequestHandling';
import dataHandling from '../../utils/dataHandling';
import photoRequest from '../../src/requests/photoRequest';
import userProfileRequest from '../../src/requests/userProfileRequest';
import collectionRequest from '../../src/requests/collectionRequest';
const collectionData = require('../../data/testData/collection/collectionData.json');
const currentDatetime = dataHandling.getDatetime();

export default class apiHelper {

    static getLocation() {
        const url = userProfileRequest.url
        return apiHandling.getGetRequestData(url, userProfileRequest.header);
    }

    static updateLocation(location) {
        const formData = {
            location: location
        };
        const url = userProfileRequest.url
        return apiHandling.getPutRequestData(url, formData, userProfileRequest.header);
    }
    
    static getRandomPhotoInfo() {
        const url = photoRequest.url.replace('$id', 'random');
        return apiHandling.getGetRequestData(url, photoRequest.header);
    }

    static getPhotoInfo(photoId) {
        const url = photoRequest.url.replace('$id', photoId);
        return apiHandling.getGetRequestData(url, photoRequest.header);
    }

    static createCollection() {
        const data = {
            title: collectionData.paramsCollection.title + currentDatetime
        };
        const url = collectionRequest.url.replace('$id', '');
        return apiHandling.getPostRequestData(url, data, collectionRequest.header);
    }

    static addPhotoToCollection(collectionID, photoID) {
        const formData = {
            photo_id: photoID
        };
        const url = collectionRequest.url.replace(`$id`, `${collectionID}/add`);
        apiHandling.getPostRequestData(url, formData, collectionRequest.header);
        return this;
    }

    static removePhotoFromCollection(collectionID, photoID) {
        const data = {
            photo_id: photoID
        };
        const url = collectionRequest.url.replace(`$id`, `${collectionID}/remove`);
        apiHandling.makeDeleteRequest(url, data, collectionRequest.header);
        return this;
    }

    static deleteCollection(collectionID) {
        const url = collectionRequest.url.replace(`$id`, `${collectionID}`);
        apiHandling.makeDeleteRequest(url, null, collectionRequest.header);
        return this;
    }

    static getCollectionList() {
        const url = collectionRequest.url.replace(`$id`, ``);
        const collectionList = apiHandling.getGetRequestData(url, collectionRequest.header);
        let collectionListReturn = [];
        collectionList.forEach(element => {
            collectionListReturn.push(element.id);
        });
        return collectionListReturn;
    }

    static unlikePhoto(photoID) {
        const url = photoRequest.url.replace(`$id`, `${photoID}/like`);
        apiHandling.makeDeleteRequest(url, null, photoRequest.header);
        return this;
    }

    static getPhotoList() {
        const url = photoRequest.url.replace(`$id`, ``);
        const photoList = apiHandling.getGetRequestData(url, photoRequest.header);
        return dataHandling.getIDList(photoList)
    }

}