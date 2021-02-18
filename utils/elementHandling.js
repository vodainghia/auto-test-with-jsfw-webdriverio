export default class ElementHandling {

    static singleElement(selector, ...parameters){
        if(parameters.length > 0){
            for (let parameter of parameters) {
                selector = selector.replace(/\$\w+/m, parameter);
            }
        }
        $(selector).waitForDisplayed(browser.config.waitforTimeout);
        return browser.$(selector);
    }

    static listElement(selector){
        $(selector).waitForDisplayed(browser.config.waitforTimeout);
        return browser.$$(selector);
    }
    
}
