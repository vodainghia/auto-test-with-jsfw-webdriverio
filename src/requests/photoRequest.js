import token from '../../data/testData/authorize/authorize';

const photoRequest = {
    'url': `${browser.config.baseAPIUrl}/photos/$id`,
    'header': token
};

export default photoRequest;
