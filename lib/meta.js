/**
 * node META parser for jekyII static markdown blog
 * 
 */

var logger = require('./logger.js').getLogger('info');

function parseMeta(metaTxt){
  logger.debug('Parsing meta text : \n', metaTxt);
  var that = {};
  var metaArray = metaTxt.split('\n');
  var title = metaArray[2].replace('title:','');
  that.layout = 'post';
  that.title = title;
  that.categories = '';
  that.tages = '';
  logger.info('Parse meta data result:', that);
  return that;
}

exports.parse = parseMeta;
