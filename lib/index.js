/**
 * Personal Writer Center Suilte
 */

var logger = require('./logger').getLogger('info');
var config = require('../config/config.json');

logger.info(config.appName, ' version:', config.version);

module.exports.render = require('./md2html');
