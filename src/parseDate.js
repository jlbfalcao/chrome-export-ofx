import moment from 'moment';
moment.locale('pt-BR');

export default function (date, format, extra = 0) {
    return moment(date, format)
        .subtract(moment(date, format).isAfter() ? 1 : 0, 'year')
        .add(extra, 'months');
}
