import extraPayments from '../src/itaucard/extraPayments';
import {parseDate} from '../src/itaucard';

import assert from 'assert';

describe('Itaucard', function () {
    describe('extraPayments', () => {
        it('sem "PRESTACAO"', function () {
            assert.equal(extraPayments("fooo"), 0);
        });
        it('LOJA 01/02', function () {
            assert.equal(extraPayments("LOJA 04/10"), 3);
        });
    });

    describe('parseDate', () => {
        it('past dates dd/MM', () => {
            var now = new Date();

            var past = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2);
            assert.equal(parseDate(`${past.getDate()}/${past.getMonth()+1}`).getTime(), new Date(past.getFullYear(), past.getMonth(), past.getDate()).getTime());
        });

        it('future dates dd/MM', () => {
            var now = new Date();
            var future = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 2);
            assert.equal(parseDate(`${future.getDate()}/${future.getMonth()+1}`).getTime(), new Date(future.getFullYear()-1, future.getMonth(), future.getDate()).getTime());
        });


        it('parse dd/MM with future payments', () => {
            assert.equal(parseDate('05/01', 'LOJA 03/10').getTime(), new Date(new Date().getFullYear(), 2, 5).getTime());
        });

    });

});