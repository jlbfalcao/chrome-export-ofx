// parse www.americanexpressonline.com.br/amex/extrato
export default function parseAmex() {
    function filter(e) {
        return e.querySelectorAll('td').length == 3;
    }

    var elements = [].slice.call(document.querySelectorAll('.sldLanctos table tr:not(.infoBarTit):not(.data)'));
    return elements.filter(filter).map(function (row) {
        var cols = [].slice.call(row.querySelectorAll('td')).map(function (col, i) {
            return col.innerText;
        });
        var date = cols[0].split("/");
        var description = cols[1].split("\n");
        return {
            date: new Date(date[2], parseInt(date[1]) - 1, date[0]),
            description: description[0].trim(),
            memo: (description[1] || '').trim(),
            value: parseFloat(cols[2].replace('R$', '').trim().replace('.', '').replace(',', '.'))
        };
    });
}
console.log(parseAmex());