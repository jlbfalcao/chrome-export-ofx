import itaucard from './itaucard';
import amex from './amex';
import buildOFX from './buildOFX';

chrome.browserAction.onClicked.addListener(function (tab) {
    var script = null;
    var name = null;
    if (tab.url.match(/americanexpressonline/)) {
        script = amex;
        name = 'amex';
    } else if (tab.url.match(/itaubankline\.itau\.com\.br/)) {
        script = itaucard;
        name = 'itaucard';
    }
    if (script) {
        chrome.tabs.executeScript(null, {
                code: `(${buildOFX})((${script})(), '${name}')`
            }
        );
    }
});
