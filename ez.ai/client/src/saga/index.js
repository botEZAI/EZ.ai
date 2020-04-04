import { all, fork } from "redux-saga/effects";
import axios from "axios";
import user from "./user";

export default function* rootSaga() {
  yield all([fork(user)]);
}
