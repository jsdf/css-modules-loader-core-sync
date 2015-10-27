# css-modules-loader-core-sync
synchronous version of css-modules-loader-core

API is the same as css-modules-loader-core except that methods return values rather than promises of values.

### example

```js
var fs = require('fs');
var path = require('path');
var resolve = require('resolve');
var SyncCore = require('css-modules-loader-core-sync/');

function pathFetcher(filepath, relativeTo) {
  return resolve.sync(filepath.replace(/["']/g, ''), {basedir: path.dirname(relativeTo)});
}

var syncCore = new SyncCore();

var filepath = __dirname + '/fixtures/a.css';
var src = fs.readFileSync(filepath, {encoding: 'utf8'});

var result = syncCore.load(src, filepath, '', pathFetcher);

console.log(result.exportTokens); // => exported classes
console.log(result.injectableSource); // => compiled css
```
