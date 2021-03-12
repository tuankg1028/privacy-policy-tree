import appModel from "./app";
import userModel from "./user.model";
import evaluateHashModel from "./evaluate-hash.model";
class Model {
  constructor() {
    this.App = appModel;
    this.User = userModel;
    this.EvaluateHash = evaluateHashModel;
  }
}
export default new Model();
