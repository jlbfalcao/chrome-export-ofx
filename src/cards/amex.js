// parse www.americanexpressonline.com.br/amex/extrato

import download from '../download';
import buildOfx from '../ofx';
import parseMoney from '../parseMoney';
import extractRows from '../extractRows';

const SELECTOR = '.sldLanctos table tr:not(.infoBarTit):not(.data)';

function parseDate(date) {
    var dt = date.split('/');
    return new Date(dt[2], parseInt(dt[1]) - 1, dt[0]);
}

function parseAmexPage() {
    return extractRows(SELECTOR)
        .filter(row => row.length == 3)
        .map(([date, description, value]) => ({
            date: parseDate(date),
            description: description.split("\n")[0].trim(),
            memo: (description.split("\n")[1] || '').trim(),
            value: parseMoney(value)
        }));
}

chrome.runtime.onMessage.addListener(function ({action, url}) {
    if (action == 'export') {
        download('amex', buildOfx(parseAmexPage()));
    }
});
