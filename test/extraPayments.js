import extraPayments from '../src/extraPayments';
import assert from 'assert';

describe('extraPayments', function () {
    it('format PRESTACAO 10 DE 20', function () {
        assert.equal(extraPayments('xoxoxox PRESTACAO 10 DE 20', /PRESTACAO (\d+) DE/), 9);
    });

    it('format n/m', () => {
        assert.equal(extraPayments('xoxoxox 8/20', /(\d+)\/(\d+)/), 7);
    });

    it('none', () => {
        assert.equal(extraPayments('xoxoxox', /(\d+)\/(\d+)/), 0);
    });
});

