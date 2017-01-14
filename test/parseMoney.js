import parseMoney from '../src/parseMoney';
import assert from 'assert';

describe('parseMoney', function () {
    it('R$ 1.234,56', function () {
        assert.equal(parseMoney(' R$   1.234,56'), 1234.56);
        assert.equal(parseMoney('2.763,17'), 2763.17);
    });
});