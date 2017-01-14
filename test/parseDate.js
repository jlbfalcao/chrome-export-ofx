import assert from 'assert';
import sinon from 'sinon';
import moment from 'moment';
import parseDate from '../src/parseDate';

describe('parseDate', function () {
    let clock;
    before(() => {
        clock = sinon.useFakeTimers(new Date(2016, 3, 23, 0, 0, 0).getTime());
    });

    after(() => {
        clock.restore();
    });


    it('DD MMM', function () {
        assert.deepEqual(parseDate('10 ABR', 'DD MMM').format(), moment('10/04/2016', 'DD/MM/YYYY').format());
        assert.deepEqual(parseDate('30 ABR', 'DD MMM').format(), moment('30/04/2015', 'DD/MM/YYYY').format());
    });

    it('DD/MM', function () {
        assert.deepEqual(parseDate('10/04', 'DD/MM').format(), moment('10/04/2016', 'DD/MM/YYYY').format());
        assert.deepEqual(parseDate('30/04', 'DD/MM').format(), moment('30/04/2015', 'DD/MM/YYYY').format());
    });

    it('DD/MM/YYYY', function () {
        assert.deepEqual(parseDate('10/04/2016', 'DD/MM/YYYY').format(), moment('10/04/2016', 'DD/MM/YYYY').format());
        assert.deepEqual(parseDate('30/04/2016', 'DD/MM/YYYY').format(), moment('30/04/2015', 'DD/MM/YYYY').format());
    });


});