#!/usr/bin/env node
'use strict';

// pkg . --target host --output eva.exe --debug

const fs = require('fs');

const evaParser = require('./parser/evaParser');
const Eva = require('./Eva');

function evalGlobal(src, eva) {
    const exp = evaParser.parse(`(begin ${src})`);
    let result = eva.evalGlobal(exp);
    console.log(result);
}

function main(argv) {
    console.log("Hola mundo");
    const [_node, _path, mode, exp] = argv;

    const eva = new Eva();

    // Direct expression:
    if (mode === '-e') {
        return evalGlobal(exp, eva);
    }

    // Eva file:
    if (mode === '-f') {
        const src = fs.readFileSync(exp, 'utf-8');
        return evalGlobal(src, eva);
    }
}