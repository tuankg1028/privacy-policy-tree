var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var findOrCreate = require("mongoose-findorcreate");

var schema = new Schema(
  {
    attributes: [
      {
        name: String,
        left: Number,
        right: Number,
      },
    ],
    purposes: [{ name: String, left: Number, right: Number }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
schema.plugin(findOrCreate);

export default mongoose.model("privacyPolicy", schema);
