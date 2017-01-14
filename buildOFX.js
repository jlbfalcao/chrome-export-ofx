export default function buildOfx(transactions, name) {

    function toMoney(v) {
        return v.toFixed(2);
    }

    function toDate(d) {
        return `${d.getFullYear()}${zeroPad(d.getMonth() + 1)}${zeroPad(d.getDate())}100000`;
    }

    function zeroPad(value) {
        return (value < 10) ? `0${value}` : value;
    }


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

    var content = `${ofxHeader}</BANKTRANLIST>
</STMTRS>
</STMTTRNRS>
</BANKMSGSRSV1>
</OFX>`;

    var a = document.createElement("a");
    a.download = name + ".ofx";
    a.href = "data:application/x-ofx;charset=utf-8," + encodeURIComponent(content);
    a.click();
}