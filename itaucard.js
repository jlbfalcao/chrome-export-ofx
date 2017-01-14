export default function () {
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
    return transactions;

}