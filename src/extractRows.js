export default function extractRows(selector) {
    return [].slice.call(document.querySelectorAll(selector))
        .map(row => [].slice.call(row.querySelectorAll('td')).map(c => c.innerText)) // convert NodeList to Array
}
