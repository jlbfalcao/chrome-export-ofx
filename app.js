export default  function () {
    var s = '#TRNcontainer01 > table:nth-child(12) > tbody > tr:nth-child(1) > td:nth-child(4) table tbody tr';

    function parseDate(text) {
        var values = text.split('/'),
            dia = values[0],
            mes = values[1];
        return new Date(new Date().getFullYear(), parseInt(mes) - 1, parseInt(dia));
    }

    function parseMoney(text) {
        return parseFloat(text.replace('.', '').replace(',', '.'));
    }

    function toMoney(v) {
        return v.toFixed(2);
    }

    function toDate(d) {
        return `${d.getFullYear()}${zeroPad(d.getMonth() + 1)}${zeroPad(d.getDate())}100000`;
    }

    function zeroPad(value) {
        return (value < 10) ? `0${value}` : value;
    }

    var transactions = [];
    document.querySelectorAll(s).forEach(row => {
        var cols = row.querySelectorAll('td');
        if (cols.length == 3) {
            var c = Array.prototype.map.call(cols, e => e.innerText);
            if (c[0].match(/^\d{2}\/\d{2}/)) {
                var data = c[0],
                    description = c[1],
                    value = c[2];
                transactions.push({
                    date: parseDate(data),
                    description: description,
                    value: -parseMoney(value)
                });
            }
        }
    });

    function buildOfx(transactions) {
        var ofxHeader = `OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:NONE

<OFX>
<SIGNONMSGSRSV1>
<SONRS>
<STATUS>
<CODE>0
<SEVERITY>INFO
</STATUS>
<DTSERVER>${toDate(new Date())}[-03:EST]
<LANGUAGE>POR
</SONRS>
</SIGNONMSGSRSV1>
<BANKMSGSRSV1>
<STMTTRNRS>
<TRNUID>1001
<STATUS>
<CODE>0
<SEVERITY>INFO
</STATUS>
<STMTRS>
<CURDEF>BRL
<BANKTRANLIST>\r\n`;

        ofxHeader += transactions.map(({date, value, description}) => {
            return `<STMTTRN>
<TRNTYPE>${value < 0 ? 'DEBIT' : 'CREDIT'}
<DTPOSTED>${toDate(date)}[-03:EST]
<TRNAMT>${toMoney(value)}
<MEMO>${description}
</STMTTRN>\r\n`
        }).join("");

        return `${ofxHeader}</BANKTRANLIST>
</STMTRS>
</STMTTRNRS>
</BANKMSGSRSV1>
</OFX>`;
    }


    var a = document.createElement("a");
    a.download = "visa.ofx";
    a.href = "data:application/x-ofx;charset=utf-8," + encodeURIComponent(buildOfx(transactions))
    a.click();
}