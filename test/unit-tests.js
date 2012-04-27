
QUnit.config.autostart = false;

var query = location.href.split('?')[1],
    parts = query && query.split(query.indexOf('&amp;') !== -1 ? '&amp;' : '&'),
    src = [
      "_math"
    ],
    tests = [
      "test/deploy-to-server"
    ],
    name, value, builtMath;

  if (parts && parts.length) {
    query = {};
    parts.forEach(function ( part ) {
      var pair = part.split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    });
  }

  if (query && query.base && query.base === 'dist') {
    base = '../dist';
  } else {
    base = '../src';
  }

  if (typeof useBuilt !== 'undefined') {
    src = [];
    builtMath = _Math;
  }

require.config({
  baseUrl: base,
  paths: {
    test: '../test'
  }
});



define(src.concat(tests), function (_Math) {
  QUnit.start();

  if (!src.length) {
    _Math = builtMath;
  }

  // Pull off the first dependency, it is the _Math source module
  var tests = Array.prototype.slice.call(arguments, src.length ? 1 : 0);

  tests.forEach(function (test) {
    test(_Math);
  });

});
