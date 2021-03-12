"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var findOrCreate = require("mongoose-findorcreate");

var schema = new Schema({
  userId: Schema.Types.ObjectId,
  hash: String,
  result: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});
schema.plugin(findOrCreate);

var _default = mongoose.model("evaluateHash", schema);

exports["default"] = _default;
//# sourceMappingURL=evaluate-hash.model.js.map