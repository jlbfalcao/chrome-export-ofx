import extraPayments from './extraPayments';

export default function (date, description = '') {
    const extra = extraPayments(description);
    const dt = date.split('/');
    return new Date(dt[2], parseInt(dt[1] - 1) + extra, dt[0]);
}

