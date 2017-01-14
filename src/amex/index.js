// parse www.americanexpressonline.com.br/amex/extrato

import download from '../download';
import buildOfx from '../ofx';
import parseMoney from '../parseMoney';
import extractRows from '../extractRows';
import parseDate from './parseDate';
import parseDescription from './parseDescription';

const SELECTOR = '.sldLanctos table tr:not(.infoBarTit):not(.data)';


function parseAmexPage() {
    return extractRows(SELECTOR)
        .filter(row => row.length == 3)
        .map(([date, description, value]) => ({
            ...(parseDescription(description)),
            date: parseDate(date),
            value: parseMoney(value)
        }));
}

if (typeof chrome != 'undefined') {
    chrome.runtime.onMessage.addListener(function ({action, url}) {
        if (action == 'export') {
            download('amex', buildOfx(parseAmexPage()));
        }
    });
}

export {parseDate, parseDescription}