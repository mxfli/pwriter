/**
 * Mocha test file.
 */

var path = require('path');
var pWriter = require('..');
var co = require('co');
var fs = require('co-fs');
var assert = require('assert');
var thunkify = require('thunkify-wrap');

var prePath = function * (pathstr) {
  if (!(yield fs.exists(pathstr))) {
    yield prePath(path.dirname(pathstr));
    yield fs.mkdir(pathstr);
  }
};

describe('pwriter:', function () {

  it('should have method render.', function (done) {

    (pWriter).should.be.ok;
    (pWriter.render).should.be.ok;
    done();
  });

  it('should render index page.', function (done) {
    "use strict";

    var baseDir = __dirname;
    co(function*() {
      var markdownPath = path.join(baseDir, '../examples/markdown');
      var templatePath = path.join(baseDir, '../examples/template/layout.html');
      var outputPath = path.join(baseDir, '../run/www');
      yield prePath(outputPath);

      assert(yield fs.exists(templatePath));
      assert(yield fs.exists(outputPath));
      var exists = yield fs.exists(path.join(outputPath, 'index.html'));
      if (exists) {
        yield fs.unlink(path.join(outputPath, 'index.html'));
      }
      //exists = yield fs.exists(path.join(outputPath, 'index.html'));
      //assert(exists === false, 'index.html file must be not exists');

      pWriter.thunkfyRender = thunkify(pWriter.render);

      yield pWriter.thunkfyRender(markdownPath, templatePath, outputPath);

      exists = yield fs.exists(path.join(outputPath, 'index.html'));

      assert(exists === true, 'index.html file not exists');
    })(done);

  });

  it('should exists of rendered index.html', function (down) {
    co(function* () {
      assert(yield fs.exists(path.join(__dirname, '../run/www/index.html')));
    })(down);
  });
});
