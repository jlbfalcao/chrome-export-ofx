import download from '../download';
import buildOfx from '../ofx';
import parseDate from '../parseDate';
import parseMoney from '../parseMoney';

function parsePage() {
    return [].slice.call(document.querySelectorAll('.md-tab-content:not(.ng-hide) .charges .charge')).map(row => {
        return {
            date: parseDate(row.querySelector('.time').innerText, 'DD MMM'),
            description: row.querySelector('.description').innerText,
            value: -parseMoney(row.querySelector('.amount').innerText)
        };
    })
}

if (typeof chrome != 'undefined') {
    chrome.runtime.onMessage.addListener(function ({action, url}) {
        if (action == 'export') {
            download('nubank', buildOfx(parsePage()));
        }
    });
}