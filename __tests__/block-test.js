const testUtil = require('./test-util');

module.exports = eva => {
    // Blocks:
    testUtil.test(eva,
        `
            (var x 10)
            (var y 20)
            (+ (* x y) 30)
        `,
        230);        

    
    testUtil.test(eva, `
        (var x 10)
        (begin
            (var x 20)
            x
        )
        x
    `, 10);


    testUtil.test(eva, `
        (var value 10)
        (begin
            (var x (+ value 10))
            x
        )
        value
    `, 10);

    testUtil.test(eva, `
        (var data 10)
        (begin
            (set data 100)
        )
        data
    `, 100);


    testUtil.test(eva,
        `
            (var x 10)
            (var y 20)
            (+ (* x 10) y)
        `,
        120);
};