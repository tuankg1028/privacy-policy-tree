import "./services/mongoose";
import Models from "./models";
import Helpers from "./helpers";
import md5 from "md5";
import moment from "moment";
async function main() {
  // data test
  const app = {
    _id: "5fe883d3c517eb0706e0d906",
    attributes: ["5fe883d3c517eb0706e0d90c"], //
    purposes: ["5fe883d3c517eb0706e0d910"],
    timeofRetention: 30,
  };
  const userId = "5fe801981e727b08f6e9193e";
  const user = await Models.User.findById(userId);

  // check hash
  const hashValue = md5(
    JSON.stringify(app) + "-" + JSON.stringify(user.privacyPreference)
  );
  const permission = await Models.EvaluateHash.findOne({
    userId,
    hash: hashValue,
    createdAt: {
      $gte: moment()
        .utc()
        .subtract(Number(user.privacyPreference.timeofRetention), "second"),
    },
  });
  if (permission) {
    console.log("OK" + permission.result);
  } else {
    const isAccepted = await Helpers.PrivacyPreference.evaluate(app, user);

    if (isAccepted) {
      console.log("OK Accepted");
    } else {
      console.log("NO Accepted");
    }
    await Models.EvaluateHash.create({
      userId,
      hash: hashValue,
      result: isAccepted ? "grant" : " deny",
    });
  }
}

main();

async function test() {
  Models.PrivacyPolicy.insertMany([
    {
      name: "App 1",
      attributes: [
        { name: "Books", left: 1, right: 12 },
        { name: "Programming", left: 2, right: 11 },
        { name: "Languages", left: 3, right: 4 },
        { name: "Databases", left: 5, right: 10 },
        { name: "MongoDB", left: 6, right: 7 },
        { name: "dbm", left: 8, right: 9 },
      ],
      purposes: [
        { name: "Direct", left: 1, right: 8 },
        { name: "DPhone", left: 2, right: 3 },
        { name: "DEmail", left: 4, right: 5 },
        { name: "DFax", left: 6, right: 7 },
      ],
    },
  ]);
}
// test();
