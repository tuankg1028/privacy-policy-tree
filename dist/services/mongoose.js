"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../../.env")
});

_mongoose["default"].connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD
});

_mongoose["default"].connection.on("error", function (err) {
  // eslint-disable-next-line no-console
  console.log(err);
});

_mongoose["default"].set("debug", true);
//# sourceMappingURL=mongoose.js.map