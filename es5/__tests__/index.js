import Lifespan from '../';
var _global = global,
    describe = _global.describe,
    it = _global.it;
describe('Lifespan', function test() {
  // Stub tests. Will refactor later.
  this.timeout(10000);
  it('should not throw', function (done) {
    var released = {};
    released.a = false;
    var count = 0;
    var a = new Lifespan().onRelease(function () {
      return released.a = true;
    });
    var i = setInterval(function () {
      return count = count + 1;
    }, 1000);
    a.onRelease(function () {
      return clearInterval(i);
    });
    released.b = false;
    var b = new Lifespan();
    b.onRelease(function () {
      return released.b = true;
    });
    setTimeout(b.release, 5500);
    b.onRelease(function () {
      return a.release();
    });
    released.c1 = released.c2 = released.c3 = false;
    var c1 = new Lifespan().onRelease(function () {
      return released.c1 = true;
    });
    var c2 = new Lifespan().onRelease(function () {
      return released.c2 = true;
    });
    var c3 = new Lifespan().onRelease(function () {
      return released.c3 = true;
    });
    released.c4 = false;
    var c4 = Lifespan.race(c1, c2, c3).onRelease(function () {
      return released.c4 = true;
    });
    c1.release();
    released.c4.should.be.true;
    void c4;
    released.d1 = released.d2 = released.d3 = false;
    var d1 = new Lifespan().onRelease(function () {
      return released.d1 = true;
    });
    var d2 = new Lifespan().onRelease(function () {
      return released.d2 = true;
    });
    var d3 = Lifespan.join(d1, d2).onRelease(function () {
      return released.d3 = true;
    });
    d1.release();
    released.d3.should.be.false;
    d2.release();
    released.d3.should.be.true;
    void d3;
    setTimeout(function () {
      released.a.should.be.false;
      count.should.be.exactly(2);
    }, 2200);
    setTimeout(function () {
      released.a.should.be.true;
      count.should.be.exactly(5);
    }, 6000);
    setTimeout(done, 7000);
  });
});