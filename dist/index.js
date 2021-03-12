"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("./services/mongoose");

var _models = _interopRequireDefault(require("./models"));

var _helpers = _interopRequireDefault(require("./helpers"));

var _md = _interopRequireDefault(require("md5"));

var _moment = _interopRequireDefault(require("moment"));

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var app, userId, user, hashValue, permission, isAccepted;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // data test
            app = {
              _id: "5fe883d3c517eb0706e0d906",
              attributes: ["5fe883d3c517eb0706e0d90c"],
              //
              purposes: ["5fe883d3c517eb0706e0d910"],
              timeofRetention: 30
            };
            userId = "5fe801981e727b08f6e9193e";
            _context.next = 4;
            return _models["default"].User.findById(userId);

          case 4:
            user = _context.sent;
            // check hash
            hashValue = (0, _md["default"])(JSON.stringify(app) + "-" + JSON.stringify(user.privacyPreference));
            _context.next = 8;
            return _models["default"].EvaluateHash.findOne({
              userId: userId,
              hash: hashValue,
              createdAt: {
                $gte: (0, _moment["default"])().utc().subtract(Number(user.privacyPreference.timeofRetention), "second")
              }
            });

          case 8:
            permission = _context.sent;

            if (!permission) {
              _context.next = 13;
              break;
            }

            console.log("OK" + permission.result);
            _context.next = 19;
            break;

          case 13:
            _context.next = 15;
            return _helpers["default"].PrivacyPreference.evaluate(app, user);

          case 15:
            isAccepted = _context.sent;

            if (isAccepted) {
              console.log("OK Accepted");
            } else {
              console.log("NO Accepted");
            }

            _context.next = 19;
            return _models["default"].EvaluateHash.create({
              userId: userId,
              hash: hashValue,
              result: isAccepted ? "grant" : " deny"
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}

main();

function test() {
  return _test.apply(this, arguments);
} // test();


function _test() {
  _test = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _models["default"].PrivacyPolicy.insertMany([{
              name: "App 1",
              attributes: [{
                name: "Books",
                left: 1,
                right: 12
              }, {
                name: "Programming",
                left: 2,
                right: 11
              }, {
                name: "Languages",
                left: 3,
                right: 4
              }, {
                name: "Databases",
                left: 5,
                right: 10
              }, {
                name: "MongoDB",
                left: 6,
                right: 7
              }, {
                name: "dbm",
                left: 8,
                right: 9
              }],
              purposes: [{
                name: "Direct",
                left: 1,
                right: 8
              }, {
                name: "DPhone",
                left: 2,
                right: 3
              }, {
                name: "DEmail",
                left: 4,
                right: 5
              }, {
                name: "DFax",
                left: 6,
                right: 7
              }]
            }]);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _test.apply(this, arguments);
}
//# sourceMappingURL=index.js.map