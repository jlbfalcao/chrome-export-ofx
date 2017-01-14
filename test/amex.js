import {parseDescription, extraPayments} from '../src/amex';

import assert from 'assert';

describe('Amex', function () {
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