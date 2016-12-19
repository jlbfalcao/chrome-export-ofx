import script from './app';

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, {
            code: `(${script})()`
        }
    );
});
