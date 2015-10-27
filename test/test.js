var tap = require('tap');
var fs = require('fs');
var path = require('path');
var resolve = require('resolve');
var SyncCore = require('../');

function pathFetcher(filepath, relativeTo) {
  return resolve.sync(filepath.replace(/["']/g, ''), {basedir: path.dirname(relativeTo)});
}

tap.test('it works', function (t) {
  var syncCore = new SyncCore();

  var filepath = __dirname + '/fixtures/a.css';
  var src = fs.readFileSync(filepath, {encoding: 'utf8'});

  var result = syncCore.load(src, filepath, 'a', pathFetcher);
  t.assert(result.exportTokens.myClass);
  t.match(result.injectableSource, 'red');
  t.end();
})

