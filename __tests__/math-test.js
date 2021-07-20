const testUtil = require('./test-util');

// Math:
module.exports = eva => {
    testUtil.test(eva, `(+ 1 5)`, 6)
    testUtil.test(eva, `(+ (+ 3 2) 5)`, 10);
    testUtil.test(eva, `(- 5 2)`, 3);
    testUtil.test(eva, `(* 5 5)`, 25);
    testUtil.test(eva, `(/ 5 2)`, 2.5);
};