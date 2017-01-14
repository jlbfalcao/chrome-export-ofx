export default function ({date, value, description}) {
    return [
        '<STMTTRN>',
        `<TRNTYPE>${value < 0 ? 'DEBIT' : 'CREDIT'}`,
        `<DTPOSTED>${date.format('YYYYMMDD')}100000[-03:EST]`,
        `<TRNAMT>${value.toFixed(2)}`,
        `<MEMO>${description}`,
        `</STMTTRN>`
    ].join("\r\n");
}

