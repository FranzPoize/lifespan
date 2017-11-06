function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import _bindAll from 'lodash/bindAll';
import _each from 'lodash/each';
/* eslint-disable no-underscore-dangle */

var __DEV__ = process.env.NODE_ENV === 'development';

var Lifespan =
/*#__PURE__*/
function () {
  // placeholder property
  function Lifespan() {
    _classCallCheck(this, Lifespan);

    this._callbacks = [];
    this._released = false;

    _bindAll(this, ['release', 'onRelease', 'setInterval', 'setTimeout', 'setImmediate', 'requestAnimationFrame', 'Promise']);
  }

  _createClass(Lifespan, [{
    key: "release",
    value: function release() {
      if (this._released) {
        return this;
      }

      this._released = true;

      _each(this._callbacks, function (fn) {
        return fn();
      });

      this._callbacks = null;
      return this;
    }
  }, {
    key: "onRelease",
    value: function onRelease(fn) {
      if (this._released) {
        fn();
      } else {
        this._callbacks.unshift(fn);
      }

      return this;
    } // set an interval that will be cleared upon release

  }, {
    key: "setInterval",
    value: function (_setInterval) {
      function setInterval(_x, _x2) {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function (fn, period) {
      if (__DEV__) {
        fn.should.be.a.Function;
        period.should.be.a.Number.which.is.not.below(0);
      }

      var i = setInterval(fn, period);
      this.onRelease(function () {
        return clearInterval(i);
      });
      return this;
    }) // set a timeout that will be cleared upon release

  }, {
    key: "setTimeout",
    value: function (_setTimeout) {
      function setTimeout(_x3, _x4) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (fn, delay) {
      if (__DEV__) {
        fn.should.be.a.Function;
        delay.should.be.a.Number.which.is.not.below(0);
      }

      var i = setTimeout(fn, delay);
      this.onRelease(function () {
        return clearTimeout(i);
      });
      return this;
    }) // set an immediate that will be cleared upon release

  }, {
    key: "setImmediate",
    value: function (_setImmediate) {
      function setImmediate(_x5) {
        return _setImmediate.apply(this, arguments);
      }

      setImmediate.toString = function () {
        return _setImmediate.toString();
      };

      return setImmediate;
    }(function (fn) {
      if (__DEV__) {
        fn.should.be.a.Function;
      }

      var i = setImmediate(fn);
      this.onRelease(function () {
        return clearImmediate(i);
      });
      return this;
    }) // sets a next animation frame callback  that will be cleared upon release

  }, {
    key: "requestAnimationFrame",
    value: function (_requestAnimationFrame) {
      function requestAnimationFrame(_x6) {
        return _requestAnimationFrame.apply(this, arguments);
      }

      requestAnimationFrame.toString = function () {
        return _requestAnimationFrame.toString();
      };

      return requestAnimationFrame;
    }(function (fn) {
      if (__DEV__) {
        fn.should.be.a.Function;
      }

      var i = requestAnimationFrame(fn);
      this.onRelease(function () {
        return cancelAnimationFrame(i);
      });
      return this;
    }) // returns a Promise that will be resolved after release (deferred callback)

  }, {
    key: "Promise",
    value: function (_Promise) {
      function Promise() {
        return _Promise.apply(this, arguments);
      }

      Promise.toString = function () {
        return _Promise.toString();
      };

      return Promise;
    }(function () {
      var _this = this;

      return new Promise(function (resolve) {
        return _this.onRelease(resolve);
      });
    }) // creates a new lifespan, which is released when any of the lifespans are released

  }], [{
    key: "race",
    value: function race() {
      var r = new Lifespan();

      for (var _len = arguments.length, lifespans = new Array(_len), _key = 0; _key < _len; _key++) {
        lifespans[_key] = arguments[_key];
      }

      lifespans.forEach(function (lifespan) {
        return lifespan.onRelease(r.release);
      });
      return r;
    } // creates a new lifespan, which is released when all the lifespans are released

  }, {
    key: "join",
    value: function join() {
      for (var _len2 = arguments.length, lifespans = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lifespans[_key2] = arguments[_key2];
      }

      var countDown = lifespans.length;
      var r = new Lifespan();
      lifespans.forEach(function (lifespan) {
        return lifespan.onRelease(function () {
          countDown -= 1;

          if (countDown === 0) {
            r.release();
          }
        });
      });
      return r;
    }
  }]);

  return Lifespan;
}();

Object.defineProperty(Lifespan, "lifespan", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: null
});
export default Lifespan;
/* eslint-enable no-undescore-dangle */