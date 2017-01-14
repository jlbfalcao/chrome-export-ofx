import extraPayments from '../src/amex/extraPayments';
import {parseDate, parseDescription} from '../src/amex';

import assert from 'assert';

describe('Amex', function () {
    describe('extraPayments', () => {
        it('sem "PRESTACAO"', function () {
            assert.equal(extraPayments("fooo"), 0);
        });
        it('PRESTACAO 2 DE 10', function () {
            assert.equal(extraPayments("nonon PRESTACAO 2 DE 10 noneonoe"), 1);
        });
    });

    describe('parseDate', () => {
        it('parse dd/MM/YYYY', () => {
            assert.equal(parseDate('01/01/2017').getTime(), new Date(2017, 0, 1).getTime());
        });

        it('parse dd/MM/YYYY with future payments', () => {
            assert.equal(parseDate('03/01/2017', 'nonono PRESTACAO 3 DE 20 nonon').getTime(), new Date(2017, 2, 3).getTime());
            assert.equal(parseDate('03/12/2017', 'nonono PRESTACAO 3 DE 20 nonon').getTime(), new Date(2018, 1, 3).getTime());
        });

    });

    describe('parseDescription', () => {
        it('parse single line', () => {
            assert.deepEqual(parseDescription("   single line   "), {description: "single line", memo: ''});
        });

        it('parse multipleLine', () => {
            assert.deepEqual(parseDescription("   first line  \n second line  "), {
                description: "first line",
                memo: 'second line'
            });
        });

    })
});