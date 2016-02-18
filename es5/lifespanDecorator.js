'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Lifespan = require('./Lifespan');

var _Lifespan2 = _interopRequireDefault(_Lifespan);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __DEV__ = process.env.NODE_ENV === 'development';

function lifespan() {
  return function (Component) {
    if (__DEV__) {
      (0, _should2.default)(Component.prototype).not.have.property('getLifespan');
    }
    return function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: 'getLifespan',
        value: function getLifespan() {
          if (this._lifespan === void 0) {
            this._lifespan = new _Lifespan2.default();
          }
          return this._lifespan;
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this._lifespan) {
            this._lifespan.release();
            this._lifespan = null;
          }
          if (_get(Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this)) {
            _get(Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this).call(this);
          }
        }
      }]);

      return _class;
    }(Component);
  };
}

exports.default = lifespan;