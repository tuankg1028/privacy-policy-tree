"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _app = _interopRequireDefault(require("./app"));

var _user = _interopRequireDefault(require("./user.model"));

var _evaluateHash = _interopRequireDefault(require("./evaluate-hash.model"));

var Model = function Model() {
  (0, _classCallCheck2["default"])(this, Model);
  this.App = _app["default"];
  this.User = _user["default"];
  this.EvaluateHash = _evaluateHash["default"];
};

var _default = new Model();

exports["default"] = _default;
//# sourceMappingURL=index.js.map