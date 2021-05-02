"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv").config();

var MONGODB_URL = process.env.MONGODB_URL;
console.log(1, MONGODB_URL);

_mongoose["default"].connect("mongodb://db:27017/privacy-policy", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose["default"].connection.on("error", function (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}); // mongoose.set("debug", true);
//# sourceMappingURL=mongoose.js.map