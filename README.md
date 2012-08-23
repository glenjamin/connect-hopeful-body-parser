[![build status](https://secure.travis-ci.org/glenjamin/connect-hopeful-body-parser.png)](http://travis-ci.org/glenjamin/connect-hopeful-body-parser)
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

    // server.js
    var connect = require('connect');
    var bodyParser = require('connect-hopeful-body-parser');
    var server = connect(
        bodyParser(),
        function(req, res) {
            res.end(require('util').inspect(req.body));
        }
    );
    server.listen(9999);

    # Once the server is running...
    $ curl localhost:9999 -d '{"value" : {"a" : 1}}'
    { value: { a: 1 } }

    $ curl localhost:9999 -d 'value[a]=1'
    { value: { a: 1 } }

    $ curl "localhost:9999?value\[a\]=1"
    { value: { a: 1 } }

    $ curl "localhost:9999"
    null

## License

MIT Licensed, copyright Glen Mailer 2011
