import { all, fork } from "redux-saga/effects";
import axios from "axios";
import user from "./user";
import chatbot from "./chatbot";

export default function* rootSaga() {
  yield all([fork(user), fork(chatbot)]);
}
