const assert = require('assert');

module.exports = eva => {
  assert.strictEqual(eva.eval(
    ['begin',
      ['var', 'counter', 0],
      ['var', 'result', 0],

      ['while', ['<', 'counter', 10],
        // result++
        // TODO: implement ['++', <Expr>]
        ['begin',
          ['set', 'result', ['+', 'result', 1]],
          ['set', 'counter', ['+', 'counter', 1]],
        ],
      ],
      'result'
    ]),
    10);
};