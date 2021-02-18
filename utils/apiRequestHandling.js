import axios from 'axios';

export default class ApiRequestHandling {

    /**
     * @param {string} url
     * @param {Object} headers
     * @param {Object} params
     * @returns {Promise<T>}
     */
    static async makeGetRequest(url, headers, params) {
        try {
            const config = {
                headers: headers,
                params: params
            };
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            throw new Error('Error make get request');
        }
    }

    /**
     * @param {string} url
     * @param {Object} formData
     * @param {Object} requestHeaders
     * @returns {Promise<T>}
     */
    static async makePutRequest(url, formData, requestHeaders) {
        try {
            const res = await axios.put(url, formData, {headers: requestHeaders});
            return res.data;
        } catch (error) {
            throw new Error('Error make put request');
        }
    }

    /**
     * @param {string} url
     * @param {Object} formData
     * @param {Object} requestHeaders
     * @returns {Promise<T>}
     */
    static async makePostRequest(url, formData, requestHeaders) {
        try {
            const res = await axios.post(url, formData, {headers: requestHeaders});
            return res.data;
        } catch (error) {
            throw new Error('Error make post request');
        }
    }

    /**
     * @param {string} url
     * @param {Object} requestHeaders
     * @param {Object} formData
     * @returns {Promise<*>}
     */
    static async makeDeleteRequest(url, data, headers) {
        try {
            const response = data === null ? await axios.delete(url, {headers})
                : await axios.delete(url, {data, headers});
            return response.status;
        } catch (error) {
            throw new Error('Error make delete request');
        }
    }

    static getPutRequestData(url, formData, headers) {
        return browser.call(() => this.makePutRequest(url, formData, headers));

    }

    static getPostRequestData(url, formData, headers) {
        return browser.call(() => this.makePostRequest(url, formData, headers));

    }

    static getGetRequestData(url, headers, param = null) {
        if (param !== null) {
            return browser.call(() => this.makeGetRequest(url, headers, param));
        }
        return browser.call(() => this.makeGetRequest(url, headers));
    }

}