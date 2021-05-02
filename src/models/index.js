import appModel from "./app";
import userModel from "./user.model";
import evaluateHashModel from "./evaluate-hash.model";
import privacyPolicyModel from "./privacy-policy.model";
class Model {
  constructor() {
    this.App = appModel;
    this.User = userModel;
    this.EvaluateHash = evaluateHashModel;
    this.PrivacyPolicy = privacyPolicyModel;
  }
}
export default new Model();
