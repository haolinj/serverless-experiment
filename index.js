var request = require('request');

console.log('Starting my function');

exports.handler = function (e, ctx, callback) {
  callback(null, { hello: 'world' });
}
