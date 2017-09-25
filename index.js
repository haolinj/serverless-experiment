'use strict';

const request = require('request').defaults({ jar: true });
const querystring = require('querystring');

exports.handler = function (event, ctx, callback) {

  const cookieJar = request.jar();
  const username = event.vendorUsername;
  const password = event.vendorPassword;
  const vendorStatus = event.vendorStatus;

  request({
    url: process.env.DATAPOS_LOGIN_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      username: username,
      password: password
    })
  }, function (loginErr, loginRes, loginBody) {
    if (loginErr) {
      callback(null, { result: 'Failed to login [' + loginErr.message + '].' });
    }
    else {
      if (loginRes.statusCode === 200) {
        request({ url: process.env.DATAPOS_VENDOR_MANAGE_URL + vendorStatus, method: 'POST', body: JSON.stringify({}) }, function (err, res, body) {
          if (err) {
            callback(null, { result: 'Failed to manage Vendor status [' + err.message + '].' });
          }
          else {
            if (res.statusCode === 200) {
              callback(null, { result: 'Successfully changed Vendor [' + username + '] status to [' + vendorStatus + '].' });
            }
            else {
              callback(null, { result: 'Response code [' + res.statusCode + '], failed to update Vendor status, [' + body + '].' });
            }
          }
        });
      }
      else {
        callback(null, { result: 'Response code [' + loginRes.statusCode + '], failed to authenticate [' + username + '], reason [' + loginBody + '].' });
      }
    }
  });
}
