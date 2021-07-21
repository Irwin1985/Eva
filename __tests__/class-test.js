const { test } = require('./test-util');

module.exports = (eva) => {
    test(eva, `
        (class Point null
            (begin

                (def constructor (this x y)
                    (begin
                        (set (prop this x) x)
                        (set (prop this y) y)))

                (def calc (this)
                    (+ (prop this x) (prop this y)))))

        (class Point3D Point
            (begin
    
                (def constructor (this x y z)
                    (begin
                        ((prop (super Point3D) constructor) x y)
                        (set (prop this z) z)
                    )
                )

                (def calc (this)
                    (begin                    
                        (+ ((prop (super Point3D) calc) this) (prop this z))
                    )
                )
            )
        )    

        (var p (new Point 10 20))
        ((prop p calc) p)

    `, 30);

    //test(eva, `
    // (class Point3D Point
    //     (begin

    //         (def constructor (this x y z)
    //             (begin
    //                 ((prop (super Point3D) constructor) x y)
    //                 (set (prop this z) z)
    //             )
    //         )            
    //     )
    // )    
    // `, 60);
};