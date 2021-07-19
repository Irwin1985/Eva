const assert = require('assert');

module.exports = eva => {
    // Variables:
    assert.strictEqual(eva.eval(['var', 'x', 10]), 10);
    assert.strictEqual(eva.eval('x'), 10);

    assert.strictEqual(eva.eval(['var', 'y', 100]), 100);
    assert.strictEqual(eva.eval('y'), 100);

    // Testing the built-in variables
    assert.strictEqual(eva.eval('null'), null);
    assert.strictEqual(eva.eval('true'), true);
    assert.strictEqual(eva.eval('false'), false);
    assert.strictEqual(eva.eval('VERSION'), '0.1');

    assert.strictEqual(eva.eval(['var', 'isUser', 'true']), true);
    assert.strictEqual(eva.eval(['var', 'z', ['*', 2, 2]]), 4);
    assert.strictEqual(eva.eval('z'), 4);
};