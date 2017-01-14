import download from '../download';
import buildOfx from '../ofx';
import parseMoney from '../parseMoney';
import extractRows from '../extractRows';
import parseDate from '../parseDate';
import extraPayments from '../extraPayments';

const SELECTOR = '#TRNcontainer01 > table:nth-child(12) > tbody > tr:nth-child(1) > td:nth-child(4) table tbody tr';

function parseItaucardPage() {
    return extractRows(SELECTOR)
        .filter(row => row.length == 3) // should have 3 columns
        .filter(row => row[0].match(/^\d{2}\/\d{2}/)) // first column should be a date
        .map(([date, description, value]) => ({
            date: parseDate(date, 'DD/MM', extraPayments(description, /(\d+)\/(\d+)/)),
            description,
            value: -parseMoney(value)
        }))

}

if (typeof chrome != 'undefined') {
    chrome.runtime.onMessage.addListener(function ({action, url}) {
        if (action == 'export') {
            download('itaucard', buildOfx(parseItaucardPage()));
        }
    });
}
