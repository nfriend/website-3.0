require('ts-node').register({
    compilerOptions: {
        target: 'es6'
    }
});
const requireDir = require('require-dir');
const chalk = require('chalk');

const integrationsTests = requireDir('./integration');

Promise.all(Object.values(integrationsTests).map(t => t.default))
    .then(() => {
        console.log(chalk.green('✓ All tests passed'));
    })
    .catch(err => {
        console.log(err);
        console.log(chalk.red('✗ Some tests failed'));
    });
