var nodespec = require('nodespec');

var parser = require('../index.js');

nodespec.describe("hopefulBodyParser", function() {
  this.describe("parseRawRequest", function() {
    this.example("should parse JSON", function() {
      var parsed = parser.parseRawRequest('/', '{"a": 1}');
      this.assert.deepEqual(parsed, {a: 1});
    });
    this.example("should not parse bad JSON", function() {
      var parsed = parser.parseRawRequest('/', '{a: 1}');
      this.assert.strictEqual(parsed, null);
    });
    this.example("should parse form data", function() {
      var parsed = parser.parseRawRequest('/', 'value[a]=1&b=1');
      this.assert.deepEqual(parsed, {value: {a: 1}, b: 1});
    });
    this.example("should parse query string", function() {
      var parsed = parser.parseRawRequest('/?value[a]=1', '');
      this.assert.deepEqual(parsed, {value: {a: 1}});
    });
    this.example("should not parse empty data", function() {
      var parsed = parser.parseRawRequest('/', '');
      this.assert.strictEqual(parsed, null);
    });
  });
});

nodespec.exec();
