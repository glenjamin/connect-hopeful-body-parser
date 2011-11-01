var qs = require('qs');
var url = require('url');

exports = module.exports = function bodyParser() {
  return function bodyParser(req, res, next) {
    if (req.body) {
      return next();
    }
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { data += chunk; });
    req.on('end', function(){
      req.rawBody = data = data.trim();
      req.body = parseRawRequest(req.url, data);
      next();
    });
  }
}

exports.parseRawRequest = parseRawRequest;
function parseRawRequest(uri, data) {
  // JSON
  if (data[0] == '{' || data[0] == '[') {
    try {
      return JSON.parse(data);
    } catch (ex) {}
  }

  // Form encoded data
  if (~data.indexOf('=')) {
    try {
      return qs.parse(data);
    } catch (ex) {}
  }

  // Querystring
  try {
    var uri = url.parse(uri);
    if (uri.query) {
      return qs.parse(uri.query);
    }
  } catch (ex) {}

  return null;
}
