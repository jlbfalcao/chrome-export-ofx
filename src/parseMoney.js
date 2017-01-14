
export default function parseMoney(value) {
    return parseFloat(value.replace('R$', '').trim().replace('.', '').replace(',', '.'));
}