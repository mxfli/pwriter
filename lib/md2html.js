/**
 * FileName: md2html.js
 * Author: @mxfli
 * CreateTime: 2012-03-25 22:09
 * Description:
 *     Markdown to html converter
 */

var logger = require('./logger.js').getLogger('info');

var jst = require('jst');
var Remarkable = require('remarkable');
var markdown = new Remarkable;

var co = require('co');
var fs = require('co-fs');
var thunkify = require('thunkify-wrap');
var path = require('path');
var meta = require('./meta.js');
logger.info('I am working...');

module.exports = function (markdownDir, templateFilePath, outputDir, cb) {

  logger.debug('Render:', markdownDir, templateFilePath, outputDir);
   co(function*() {
    var files = yield fs.readdir(markdownDir);
    for (var i = 0, file; file = files[i]; i++) {
      logger.info('markdown file', path.join(markdownDir, file));

      var data = yield fs.readFile(path.join(markdownDir, file), 'utf8');
      var dataArray = data.split('---');
      var metaTxt = dataArray[1];
      var metaObj = meta.parse(metaTxt);
      var title = metaObj.title;
      var content = dataArray[2];

      logger.debug('content data:\n', content);

      jst.renderFile = thunkify(jst.renderFile);

      var ctx = yield jst.renderFile(templateFilePath, {title: title, content: markdown.render(content)});
      var outputFile = path.basename(file, '.md') + '.html';
      yield fs.writeFile(path.join(outputDir, outputFile), ctx);
      logger.info('parse result:', file, '-->', outputFile);
    }
  })(cb);
};


