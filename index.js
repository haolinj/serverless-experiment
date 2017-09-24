const request = require('request');

exports.handler = function (event, ctx, callback) {

  const cookieJar = request.jar();

  const username = event['vendorUsername'];
  const password = event['vendorPassword'];
  const vendorStatus = event['vendorStatus'];

  request.post({
    url: process.env.DATAPOS_LOGIN_URL, jar: cookieJar, body: {
      username: username,
      password: password
    }
  });

  request.post({ url: process.env.DATAPOS_VENDOR_MANAGE_URL + vendorStatus, body: {}, jar: cookieJar }, function (err, res, body) {
    console.log(res, body);
  });

  callback(null, { hello: 'world' });
}
