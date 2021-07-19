const Environment = require('./Environment');
/**
 * Eva interpreter.
 */
class Eva {
    /**
     * Creates an Eva instance with the global environment.
     */
    constructor(global = new Environment()) {
        this.global = global;
    }
    /**
     * Evaluates an expression in the given environment.
     */
    eval(exp, env = this.global) {
        // -----------------------------------------
        // Self-evaluating expressions:

        if (is_number(exp)) {
            return exp;
        }

        if (is_string(exp)) {
            return exp.slice(1, -1);
        }

        // -----------------------------------------
        // Math operations:
        if (exp[0] === '+') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left + right;
        }

        if (exp[0] === '-') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left - right;
        }

        if (exp[0] === '*') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left * right;
        }

        if (exp[0] === '/') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            if (right === 0) {
                throw 'Division by zero.'
            }
            return left / right;
        }
        // -----------------------------------------
        // Comparison operators
        if (exp[0] === '<') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left < right;
        }
        if (exp[0] === '<=') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left <= right;
        }        
        if (exp[0] === '>') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left > right;
        }        
        if (exp[0] === '>=') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left >= right;
        }        
        if (exp[0] === '==') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left == right;
        }
        if (exp[0] === '!=') {
            var left = this.eval(exp[1], env);
            var right = this.eval(exp[2], env);
            return left != right;
        }
        // -----------------------------------------
        // Block: sequence of expressions
        if (exp[0] === 'begin') {
            const blockEnv = new Environment({}, env);
            return this._evalBlock(exp, blockEnv)
        }

        // -----------------------------------------
        // Variable declaration: (var foo 10)
        if (exp[0] === 'var') {
            const [_, name, value] = exp;
            return env.define(name, this.eval(value, env));
        }
        
        // -----------------------------------------
        // Variable update: (set foo 10)
        if (exp[0] === 'set') {
            const [_, name, value] = exp;
            return env.assign(name, this.eval(value, env));
        }

        // -----------------------------------------
        // Variable access: foo
        if (is_variable_name(exp)) {
            return env.lookup(exp);
        }
        // -----------------------------------------
        // if-expression:
        if (exp[0] === 'if') {
            const [_tag, condition, consequent, alternate] = exp;
            if (this.eval(condition, env) === true) {
                return this.eval(consequent, env);
            } else {
                return this.eval(alternate, env);
            }
        }
        // -----------------------------------------
        // while-expression:
        if (exp[0] === 'while') {
            const [_tag, condition, body] = exp;
            let result;
            while (this.eval(condition, env)) {
                result = this.eval(body, env);
            }
            return result;
        }
        


        throw `Unimplemented: ${JSON.stringify(exp)}`;
    }
    /**
     * Block evaluation
     */
    _evalBlock(block, env) {
        let result;
        const [_tag, ...expressions] = block;

        expressions.forEach(exp => {
            result = this.eval(exp, env);
        });

        return result;
    }
}

function is_number(exp) {
    return typeof exp === 'number';
}

function is_string(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function is_variable_name(exp) {
    return typeof exp == 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}

module.exports = Eva;