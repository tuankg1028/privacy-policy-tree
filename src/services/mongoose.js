import mongoose from "mongoose";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
});

mongoose.connection.on("error", (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

mongoose.set("debug", true);
