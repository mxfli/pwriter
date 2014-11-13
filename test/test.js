/**
 * Mocha test file.
 */

var path = require('path');
var pWriter = require('..');
var co = require('co');
var fs = require('co-fs');
var assert = require('assert');

var prePath = function * (pathstr) {
  "use strict";
  if (!(yield fs.exists(pathstr))) {
    yield prePath(path.baseFileName(pathstr));
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

      try {
       pWriter.render(markdownPath, templatePath, outputPath,function *(){
         console.log('Hello');
         var exists = yield fs.exists(path.join(baseDir, outputPath, 'index.html'));

         assert(exists === true, 'index.html file not exists');

       });
      } catch (e) {
        throw e;
      }

    })(done);

  });
});
