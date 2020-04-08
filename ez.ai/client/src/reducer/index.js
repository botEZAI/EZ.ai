import { combineReducers } from "redux";
import user from "./user";
import chatbot from "./chatbot";

const rootReducer = combineReducers({
  user,
  chatbot,
});

export default rootReducer;
