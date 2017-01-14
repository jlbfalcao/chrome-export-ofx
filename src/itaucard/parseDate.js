import extraPayments from './extraPayments';
export default function (text, description = '') {
    const extra = extraPayments(description);
    const [day, month] = text.split('/');
    const date = new Date(new Date().getFullYear(), parseInt(month) - 1, parseInt(day));
    if (date.getTime() > new Date().getTime()) {
        return new Date(new Date().getFullYear() - 1, parseInt(month) - 1 + extra, parseInt(day));
    } else {
        return new Date(new Date().getFullYear(), parseInt(month) - 1 + extra, parseInt(day));
    }
}