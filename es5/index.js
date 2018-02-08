"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "lifespan", {
  enumerable: true,
  get: function get() {
    return _lifespanDecorator.default;
  }
});
exports.default = void 0;

var _Lifespan = _interopRequireDefault(require("./Lifespan"));

var _lifespanDecorator = _interopRequireDefault(require("./lifespanDecorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_Lifespan.default, {
  lifespan: _lifespanDecorator.default
});
var _default = _Lifespan.default;
exports.default = _default;