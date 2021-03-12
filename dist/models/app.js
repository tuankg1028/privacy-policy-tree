"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var findOrCreate = require("mongoose-findorcreate");

var schema = new Schema({
  name: String,
  attributes: [{
    name: String,
    left: Number,
    right: Number
  }],
  purposes: [{
    name: String,
    left: Number,
    right: Number
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});
schema.plugin(findOrCreate);

var _default = mongoose.model("app", schema);

exports["default"] = _default;
//# sourceMappingURL=app.js.map