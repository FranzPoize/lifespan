import Lifespan from '../';
const { describe, it } = global;

describe('Lifespan', function test() {
  // Stub tests. Will refactor later.
  this.timeout(10000);
  it('should not throw', (done) => {
    const released = {};

    released.a = false;
    let count = 0;
    const a = new Lifespan().onRelease(() => released.a = true);
    const i = setInterval(() => count = count + 1, 1000);
    a.onRelease(() => clearInterval(i));

    released.b = false;
    const b = new Lifespan();
    b.onRelease(() => released.b = true);
    setTimeout(b.release, 5500);
    b.onRelease(() => a.release());

    released.c1 = released.c2 = released.c3 = false;
    const c1 = new Lifespan().onRelease(() => released.c1 = true);
    const c2 = new Lifespan().onRelease(() => released.c2 = true);
    const c3 = new Lifespan().onRelease(() => released.c3 = true);

    released.c4 = false;
    const c4 = Lifespan.race(c1, c2, c3).onRelease(() => released.c4 = true);
    c1.release();
    released.c4.should.be.true;
    void c4;

    released.d1 = released.d2 = released.d3 = false;
    const d1 = new Lifespan().onRelease(() => released.d1 = true);
    const d2 = new Lifespan().onRelease(() => released.d2 = true);
    const d3 = Lifespan.join(d1, d2).onRelease(() => released.d3 = true);
    d1.release();
    released.d3.should.be.false;
    d2.release();
    released.d3.should.be.true;
    void d3;

    setTimeout(() => {
      released.a.should.be.false;
      count.should.be.exactly(2);
    }, 2200);

    setTimeout(() => {
      released.a.should.be.true;
      count.should.be.exactly(5);
    }, 6000);
    setTimeout(done, 7000);
  });
});
