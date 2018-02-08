"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lifespan = _interopRequireDefault(require("./Lifespan"));

var _should = _interopRequireDefault(require("should"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return _get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __DEV__ = process.env.NODE_ENV === 'development';

function lifespan() {
  return function (Component) {
    if (__DEV__) {
      (0, _should.default)(Component.prototype).not.have.property('getLifespan');
    }

    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(_class, _Component);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: "getLifespan",
          value: function getLifespan() {
            if (this._lifespan === void 0) {
              this._lifespan = new _Lifespan.default();
            }

            return this._lifespan;
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            if (this._lifespan) {
              this._lifespan.release();

              this._lifespan = null;
            }

            if (_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "componentWillUnmount", this)) {
              _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "componentWillUnmount", this).call(this);
            }
          }
        }]);

        return _class;
      }(Component)
    );
  };
}

var _default = lifespan;
exports.default = _default;