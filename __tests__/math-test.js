const assert = require('assert');

// Math:
module.exports = eva => {
    assert.strictEqual(eva.eval(['+', 1, 5]), 6);
    assert.strictEqual(eva.eval(['+', ['+', 3, 2], 5]), 10);
    assert.strictEqual(eva.eval(['-', 5, 2]), 3);
    assert.strictEqual(eva.eval(['*', 5, 5]), 25);
    assert.strictEqual(eva.eval(['/', 5, 2]), 2.5);
};