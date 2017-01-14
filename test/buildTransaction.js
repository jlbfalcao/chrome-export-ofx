import assert from 'assert';
import moment from 'moment';
import buildTransaction from '../src/ofx/buildTransaction';

describe('buildTransaction', function () {

    it('credit', () => {
        const actual = buildTransaction({
            date: moment('23/04/2016', 'DD/MM/YYYY'),
            value: 10,
            description: "None"
        });

        const expected = `<STMTTRN>\r
<TRNTYPE>CREDIT\r
<DTPOSTED>20160423100000[-03:EST]\r
<TRNAMT>10.00\r
<MEMO>None\r
</STMTTRN>`

        assert.equal(actual, expected);
    });

    it('debit', () => {
        const actual = buildTransaction({
            date: moment('23/04/2016', 'DD/MM/YYYY'),
            value: -10,
            description: "None"
        });

        const expected = `<STMTTRN>\r
<TRNTYPE>DEBIT\r
<DTPOSTED>20160423100000[-03:EST]\r
<TRNAMT>-10.00\r
<MEMO>None\r
</STMTTRN>`

        assert.equal(actual, expected);
    });


});