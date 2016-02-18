'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lifespan = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Lifespan = require('./Lifespan');

var _Lifespan2 = _interopRequireDefault(_Lifespan);

var _lifespanDecorator = require('./lifespanDecorator');

var _lifespanDecorator2 = _interopRequireDefault(_lifespanDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_extends(_Lifespan2.default, { lifespan: _lifespanDecorator2.default });

exports.lifespan = _lifespanDecorator2.default;
exports.default = _Lifespan2.default;