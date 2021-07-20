const testUtil = require('./test-util.js');

module.exports = eva => {
    // Variables:
    testUtil.test(eva, `(var x 10)`, 10);
    testUtil.test(eva, `x`, 10);
    testUtil.test(eva, `(var y 100)`, 100);
    testUtil.test(eva, `y`, 100);

    // Testing the built-in variables
    testUtil.test(eva, `null`, null)
    testUtil.test(eva, `true`, true);
    testUtil.test(eva, `false`, false);
    testUtil.test(eva, `VERSION`, '0.1');

    testUtil.test(eva, `(var isUser true)`, true)
    testUtil.test(eva, `(var z (* 2 2))`, 4);
    testUtil.test(eva, `z`, 4);
};