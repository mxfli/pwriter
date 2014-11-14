/**
 * A simple markdown blog example of pwriter.
 */
var pWriter = require('..');
var path = require('path');
var baseDir = __dirname;
var co = require('co');

console.log('Hello')
pWriter.render(
    path.join(baseDir, 'markdown'),
    path.join(baseDir, 'template/layout.html'),
    path.join(baseDir, '../run/www')
);
console.log('world')
