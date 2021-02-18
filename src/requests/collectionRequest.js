import token from '../../data/testData/authorize/authorize';

const collectionRequest = {
    'url': `${browser.config.baseAPIUrl}/collections/$id`,
    'header': token
};

export default collectionRequest;