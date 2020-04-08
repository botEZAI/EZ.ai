import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  ADD_CHATBOT_REQUEST,
  ADD_CHATBOT_SUCCESS,
  ADD_CHATBOT_FAILURE,
  LOAD_CHATBOT_REQUEST,
  LOAD_CHATBOT_SUCCESS,
  LOAD_CHATBOT_FAILURE,
} from "../reducer/chatbot";

//챗봇 등록

function addChatbotAPI(chatbotData) {
  return axios.post("api/chatbotdata", chatbotData, {
    withCredentials: true,
  });
}

function* addChatbot(action) {
  try {
    const result = yield call(addChatbotAPI, action.data);
    yield put({
      type: ADD_CHATBOT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: ADD_CHATBOT_FAILURE,
      error: e,
    });
  }
}

function* watchAddChatbot() {
  yield takeLatest(ADD_CHATBOT_REQUEST, addChatbot);
}

//챗봇정보 로드
function loadChatbotAPI(chatbotData) {
  return axios.get("api/chatbotdata", {
    withCredentials: true,
  });
}

function* loadChatbot(action) {
  try {
    const result = yield call(loadChatbotAPI, action.data);
    yield put({
      type: LOAD_CHATBOT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_CHATBOT_FAILURE,
      error: e,
    });
  }
}

function* watchLoadChatbot() {
  yield takeEvery(LOAD_CHATBOT_REQUEST, loadChatbot);
}
export default function* userSaga() {
  yield all([fork(watchLoadChatbot), fork(watchAddChatbot)]);
}
