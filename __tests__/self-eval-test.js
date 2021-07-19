const assert = require('assert');

// Literals
module.exports = eva => {
    assert.strictEqual(eva.eval(1), 1);
    assert.strictEqual(eva.eval('"hello"'), 'hello');
};
