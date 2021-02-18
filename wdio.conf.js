const path = require('path');
const fs = require('fs');

exports.config = {
    runner: 'local',
    specs: [
        'src/test_scripts/*.js'
    ],
    exclude: [
    ],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--start-maximized'
                
            ],
    
        }}],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://unsplash.com',
    baseAPIUrl: 'https://api.unsplash.com',
    waitforTimeout: 15000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 900000,
        compilers: ['js:@babel/register']
    },
    reporters: ['allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: true
        }
    },
    before: () => {
        require('@babel/register');
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.sprintf = require('sprintf-js').sprintf;
    },
};
