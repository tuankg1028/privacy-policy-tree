import Models from "../models";
import mongoose from "mongoose";
import chalk from "chalk";
const evaluate = async (
  {
    _id: appId,
    attributes: appAttributes,
    purposes: appPurposes,
    timeofRetention: appTimeofRetention,
  },
  user
) => {
  if (!user) throw new Error("user not exist");
  const { privacyPreference } = user;

  const [
    isAcceptedAttrs,
    isAcceptedPurposes,
    isTimeofRetention,
  ] = await Promise.all([
    // check attributes
    evaluateAttributes(appId, appAttributes, privacyPreference),
    // check attributes
    evaluatePurposes(appId, appPurposes, privacyPreference),
    // check timeofRetention
    evaluateTimeofRetention(appTimeofRetention, privacyPreference),
  ]);

  return isAcceptedAttrs && isAcceptedPurposes && isTimeofRetention;
};

// evaluate timeofRetention between app and upp
const evaluateTimeofRetention = (appTimeofRetention, privacyPreference) => {
  console.log(appTimeofRetention, privacyPreference.timeofRetention);
  return appTimeofRetention <= privacyPreference.timeofRetention;
};

// evaluate attributes between app and upp
const evaluateAttributes = async (appId, appAttributes, privacyPreference) => {
  const [isAllowed, isExcepted, isDeny] = await Promise.all([
    evaluateAttributeType(appId, appAttributes, privacyPreference, "allow"),
    evaluateAttributeType(appId, appAttributes, privacyPreference, "except"),
    evaluateAttributeType(appId, appAttributes, privacyPreference, "deny"),
  ]);

  console.log(
    chalk.blue(
      `ATTRIBUTE - allow: APP: ${JSON.stringify(appAttributes)} - UPP ${
        privacyPreference.attributes
      } is ${chalk.green(isAllowed)}`
    )
  );

  console.log(
    chalk.blue(
      `ATTRIBUTE - except: APP: ${JSON.stringify(appAttributes)} - UPP ${
        privacyPreference.exceptions
      } is ${chalk.green(!isExcepted)}`
    )
  );

  console.log(
    chalk.blue(
      `ATTRIBUTE - deny: APP: ${JSON.stringify(appAttributes)} - UPP ${
        privacyPreference.exceptions
      } is ${chalk.green(!isDeny)}`
    )
  );

  return isAllowed && !isExcepted && !isDeny;
};

// evaluate attributes by type
const evaluateAttributeType = async (
  appId,
  appAttributes,
  privacyPreference,
  type
) => {
  let uppAttributes;

  switch (true) {
    case type === "allow": {
      uppAttributes = privacyPreference.attributes;
      break;
    }
    case type === "except": {
      uppAttributes = privacyPreference.exceptions;
      break;
    }
    case type === "deny": {
      uppAttributes = privacyPreference.exceptions;
      break;
    }
    default: {
      throw new Error("type is invalid");
    }
  }

  for (let i = 0; i < appAttributes.length; i++) {
    const appAttributeId = appAttributes[i];
    let appAttribute = await Models.App.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(appId) } },
      { $unwind: "$attributes" },
      { $match: { "attributes._id": mongoose.Types.ObjectId(appAttributeId) } },
    ]);

    if (!appAttribute[0] || !appAttribute[0].attributes)
      throw new Error(`Attribute ${appAttributeId} not found`);
    // get attribute
    appAttribute = appAttribute[0].attributes;

    const result = await Models.App.findOne({
      _id: appId,
      attributes: {
        $elemMatch: {
          _id: { $in: uppAttributes },
          left: { $lte: appAttribute.left },
          right: { $gte: appAttribute.right },
        },
      },
    });

    if (result) return true;
  }
  return false;
};

// evaluate attributes between app and upp
const evaluatePurposes = async (appId, appPurposes, privacyPreference) => {
  const [isAllowed, isExcepted, isDeny] = await Promise.all([
    evaluatePurposesType(appId, appPurposes, privacyPreference, "allow"),
    evaluatePurposesType(appId, appPurposes, privacyPreference, "except"),
    evaluatePurposesType(appId, appPurposes, privacyPreference, "deny"),
  ]);

  console.log(
    chalk.blue(
      `PURPOSE - allow: APP: ${JSON.stringify(appPurposes)} - UPP ${
        privacyPreference.allowedPurposes
      } is ${chalk.green(isAllowed)}`
    )
  );

  console.log(
    chalk.blue(
      `PURPOSE - except: APP: ${JSON.stringify(appPurposes)} - UPP ${
        privacyPreference.prohibitedPurposes
      } is ${chalk.green(!isExcepted)}`
    )
  );

  console.log(
    chalk.blue(
      `PURPOSE - deny: APP: ${JSON.stringify(appPurposes)} - UPP ${
        privacyPreference.denyPurposes
      } is ${chalk.green(!isDeny)}`
    )
  );

  return isAllowed && !isExcepted && !isDeny;
};

// evaluate attributes by type
const evaluatePurposesType = async (
  appId,
  appPurposes,
  privacyPreference,
  type
) => {
  let uppAppPurposes;

  switch (true) {
    case type === "allow": {
      uppAppPurposes = privacyPreference.allowedPurposes;
      break;
    }
    case type === "except": {
      uppAppPurposes = privacyPreference.prohibitedPurposes;
      break;
    }
    case type === "deny": {
      uppAppPurposes = privacyPreference.denyPurposes;
      break;
    }
    default: {
      throw new Error("type is invalid");
    }
  }

  for (let i = 0; i < appPurposes.length; i++) {
    const appPurposeId = appPurposes[i];
    let appPurpose = await Models.App.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(appId) } },
      { $unwind: "$purposes" },
      { $match: { "purposes._id": mongoose.Types.ObjectId(appPurposeId) } },
    ]);

    if (!appPurpose[0] || !appPurpose[0].purposes)
      throw new Error(`Purpose ${appPurposeId} not found`);
    // get purpose
    appPurpose = appPurpose[0].purposes;

    const result = await Models.App.findOne({
      _id: appId,
      purposes: {
        $elemMatch: {
          _id: { $in: uppAppPurposes },
          left: { $lte: appPurpose.left },
          right: { $gte: appPurpose.right },
        },
      },
    });

    if (result) return true;
  }

  return false;
};
export default {
  evaluate,
};
