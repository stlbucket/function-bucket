const fbkt = require('./index');

const result = typeof fbkt === 'object' ? 'PASS - fbkt is an object' : 'FAIL - fbkt must be an object';

console.log('FUNCTION BUCKET TEST RESULT: ', result);