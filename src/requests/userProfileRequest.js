import token from '../../data/testData/authorize/authorize';

const userProfileRequest = {
    'url': `${browser.config.baseAPIUrl}/me`,
    'header': token
};

export default userProfileRequest;