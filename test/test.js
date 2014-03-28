/**
 * Mocha test file.
 */

var pwriter = require('..');

describe('pwriter:',function(){

  it('should be created a instance.',function(done){
    aPwriter = new pwriter();

    //should(aPwriter).not();
    (aPwriter).should.be.ok;
    (aPwriter.next().value).should.be.ok;
    (aPwriter.next().done).should.be.ok;
    done();
  });
});
