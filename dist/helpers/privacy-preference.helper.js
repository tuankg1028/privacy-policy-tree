"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chalk = _interopRequireDefault(require("chalk"));

var evaluate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, user) {
    var appId, appAttributes, appPurposes, appTimeofRetention, privacyPreference, _yield$Promise$all, _yield$Promise$all2, isAcceptedAttrs, isAcceptedPurposes, isTimeofRetention;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appId = _ref._id, appAttributes = _ref.attributes, appPurposes = _ref.purposes, appTimeofRetention = _ref.timeofRetention;

            if (user) {
              _context.next = 3;
              break;
            }

            throw new Error("user not exist");

          case 3:
            privacyPreference = user.privacyPreference;
            _context.next = 6;
            return Promise.all([// check attributes
            evaluateAttributes(appId, appAttributes, privacyPreference), // check attributes
            evaluatePurposes(appId, appPurposes, privacyPreference), // check timeofRetention
            evaluateTimeofRetention(appTimeofRetention, privacyPreference)]);

          case 6:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 3);
            isAcceptedAttrs = _yield$Promise$all2[0];
            isAcceptedPurposes = _yield$Promise$all2[1];
            isTimeofRetention = _yield$Promise$all2[2];
            return _context.abrupt("return", isAcceptedAttrs && isAcceptedPurposes && isTimeofRetention);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function evaluate(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}(); // evaluate timeofRetention between app and upp


var evaluateTimeofRetention = function evaluateTimeofRetention(appTimeofRetention, privacyPreference) {
  console.log(appTimeofRetention, privacyPreference.timeofRetention);
  return appTimeofRetention <= privacyPreference.timeofRetention;
}; // evaluate attributes between app and upp


var evaluateAttributes = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, appAttributes, privacyPreference) {
    var _yield$Promise$all3, _yield$Promise$all4, isAllowed, isExcepted, isDeny;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Promise.all([evaluateAttributeType(appId, appAttributes, privacyPreference, "allow"), evaluateAttributeType(appId, appAttributes, privacyPreference, "except"), evaluateAttributeType(appId, appAttributes, privacyPreference, "deny")]);

          case 2:
            _yield$Promise$all3 = _context2.sent;
            _yield$Promise$all4 = (0, _slicedToArray2["default"])(_yield$Promise$all3, 3);
            isAllowed = _yield$Promise$all4[0];
            isExcepted = _yield$Promise$all4[1];
            isDeny = _yield$Promise$all4[2];
            console.log(_chalk["default"].blue("ATTRIBUTE - allow: APP: ".concat(JSON.stringify(appAttributes), " - UPP ").concat(privacyPreference.attributes, " is ").concat(_chalk["default"].green(isAllowed))));
            console.log(_chalk["default"].blue("ATTRIBUTE - except: APP: ".concat(JSON.stringify(appAttributes), " - UPP ").concat(privacyPreference.exceptions, " is ").concat(_chalk["default"].green(!isExcepted))));
            console.log(_chalk["default"].blue("ATTRIBUTE - deny: APP: ".concat(JSON.stringify(appAttributes), " - UPP ").concat(privacyPreference.exceptions, " is ").concat(_chalk["default"].green(!isDeny))));
            return _context2.abrupt("return", isAllowed && !isExcepted && !isDeny);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function evaluateAttributes(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}(); // evaluate attributes by type


var evaluateAttributeType = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appId, appAttributes, privacyPreference, type) {
    var uppAttributes, i, appAttributeId, appAttribute, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = true;
            _context3.next = _context3.t0 === (type === "allow") ? 3 : _context3.t0 === (type === "except") ? 5 : _context3.t0 === (type === "deny") ? 7 : 9;
            break;

          case 3:
            uppAttributes = privacyPreference.attributes;
            return _context3.abrupt("break", 10);

          case 5:
            uppAttributes = privacyPreference.exceptions;
            return _context3.abrupt("break", 10);

          case 7:
            uppAttributes = privacyPreference.exceptions;
            return _context3.abrupt("break", 10);

          case 9:
            throw new Error("type is invalid");

          case 10:
            i = 0;

          case 11:
            if (!(i < appAttributes.length)) {
              _context3.next = 27;
              break;
            }

            appAttributeId = appAttributes[i];
            _context3.next = 15;
            return _models["default"].App.aggregate([{
              $match: {
                _id: _mongoose["default"].Types.ObjectId(appId)
              }
            }, {
              $unwind: "$attributes"
            }, {
              $match: {
                "attributes._id": _mongoose["default"].Types.ObjectId(appAttributeId)
              }
            }]);

          case 15:
            appAttribute = _context3.sent;

            if (!(!appAttribute[0] || !appAttribute[0].attributes)) {
              _context3.next = 18;
              break;
            }

            throw new Error("Attribute ".concat(appAttributeId, " not found"));

          case 18:
            // get attribute
            appAttribute = appAttribute[0].attributes;
            _context3.next = 21;
            return _models["default"].App.findOne({
              _id: appId,
              attributes: {
                $elemMatch: {
                  _id: {
                    $in: uppAttributes
                  },
                  left: {
                    $lte: appAttribute.left
                  },
                  right: {
                    $gte: appAttribute.right
                  }
                }
              }
            });

          case 21:
            result = _context3.sent;

            if (!result) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", true);

          case 24:
            i++;
            _context3.next = 11;
            break;

          case 27:
            return _context3.abrupt("return", false);

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function evaluateAttributeType(_x6, _x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}(); // evaluate attributes between app and upp


var evaluatePurposes = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(appId, appPurposes, privacyPreference) {
    var _yield$Promise$all5, _yield$Promise$all6, isAllowed, isExcepted, isDeny;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Promise.all([evaluatePurposesType(appId, appPurposes, privacyPreference, "allow"), evaluatePurposesType(appId, appPurposes, privacyPreference, "except"), evaluatePurposesType(appId, appPurposes, privacyPreference, "deny")]);

          case 2:
            _yield$Promise$all5 = _context4.sent;
            _yield$Promise$all6 = (0, _slicedToArray2["default"])(_yield$Promise$all5, 3);
            isAllowed = _yield$Promise$all6[0];
            isExcepted = _yield$Promise$all6[1];
            isDeny = _yield$Promise$all6[2];
            console.log(_chalk["default"].blue("PURPOSE - allow: APP: ".concat(JSON.stringify(appPurposes), " - UPP ").concat(privacyPreference.allowedPurposes, " is ").concat(_chalk["default"].green(isAllowed))));
            console.log(_chalk["default"].blue("PURPOSE - except: APP: ".concat(JSON.stringify(appPurposes), " - UPP ").concat(privacyPreference.prohibitedPurposes, " is ").concat(_chalk["default"].green(!isExcepted))));
            console.log(_chalk["default"].blue("PURPOSE - deny: APP: ".concat(JSON.stringify(appPurposes), " - UPP ").concat(privacyPreference.denyPurposes, " is ").concat(_chalk["default"].green(!isDeny))));
            return _context4.abrupt("return", isAllowed && !isExcepted && !isDeny);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function evaluatePurposes(_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}(); // evaluate attributes by type


var evaluatePurposesType = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(appId, appPurposes, privacyPreference, type) {
    var uppAppPurposes, i, appPurposeId, appPurpose, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = true;
            _context5.next = _context5.t0 === (type === "allow") ? 3 : _context5.t0 === (type === "except") ? 5 : _context5.t0 === (type === "deny") ? 7 : 9;
            break;

          case 3:
            uppAppPurposes = privacyPreference.allowedPurposes;
            return _context5.abrupt("break", 10);

          case 5:
            uppAppPurposes = privacyPreference.prohibitedPurposes;
            return _context5.abrupt("break", 10);

          case 7:
            uppAppPurposes = privacyPreference.denyPurposes;
            return _context5.abrupt("break", 10);

          case 9:
            throw new Error("type is invalid");

          case 10:
            i = 0;

          case 11:
            if (!(i < appPurposes.length)) {
              _context5.next = 27;
              break;
            }

            appPurposeId = appPurposes[i];
            _context5.next = 15;
            return _models["default"].App.aggregate([{
              $match: {
                _id: _mongoose["default"].Types.ObjectId(appId)
              }
            }, {
              $unwind: "$purposes"
            }, {
              $match: {
                "purposes._id": _mongoose["default"].Types.ObjectId(appPurposeId)
              }
            }]);

          case 15:
            appPurpose = _context5.sent;

            if (!(!appPurpose[0] || !appPurpose[0].purposes)) {
              _context5.next = 18;
              break;
            }

            throw new Error("Purpose ".concat(appPurposeId, " not found"));

          case 18:
            // get purpose
            appPurpose = appPurpose[0].purposes;
            _context5.next = 21;
            return _models["default"].App.findOne({
              _id: appId,
              purposes: {
                $elemMatch: {
                  _id: {
                    $in: uppAppPurposes
                  },
                  left: {
                    $lte: appPurpose.left
                  },
                  right: {
                    $gte: appPurpose.right
                  }
                }
              }
            });

          case 21:
            result = _context5.sent;

            if (!result) {
              _context5.next = 24;
              break;
            }

            return _context5.abrupt("return", true);

          case 24:
            i++;
            _context5.next = 11;
            break;

          case 27:
            return _context5.abrupt("return", false);

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function evaluatePurposesType(_x13, _x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();

var _default = {
  evaluate: evaluate
};
exports["default"] = _default;
//# sourceMappingURL=privacy-preference.helper.js.map