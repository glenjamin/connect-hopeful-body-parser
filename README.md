# connect-hopeful-body-parser

For when you don't really want to be that strict, will attempt to parse

  * The request body as JSON
  * The request body as x-www-form-urlencoded
  * The urlencoded query string

## Install

npm install connect-hopeful-body-parser

## Usage

Add to the connect middleware chain, `req.body` will be set to either the
parsed object, or null.

    var connect = require('connect');
    var bodyParser = require('connect-hopeful-body-parser');
    var server = connect(
        bodyParser(),
        function(req, res) {
            res.end(require('util').inspect(req.body));
        }
    );
    server.listen(9999);

    curl localhost:9999 -d '{"value" : {"a" : 1}}'
    { value: { a: 1 } }

    curl localhost:9999 -d 'value[a]=1'
    { value: { a: 1 } }

    curl "localhost:9999?value\[a\]=1"
    { value: { a: 1 } }

## License

MIT Licensed, copyright Glen Mailer 2011
