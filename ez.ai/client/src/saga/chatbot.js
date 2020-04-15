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
  UPDATE_CHATBOT_REQUEST,
  UPDATE_CHATBOT_SUCCESS,
  UPDATE_CHATBOT_FAILURE,
  DELETE_CHATBOT_REQUEST,
  DELETE_CHATBOT_SUCCESS,
  DELETE_CHATBOT_FAILURE,
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

//챗봇 업데이트
function updateChatbotAPI(chatbotData) {
  return axios.patch("api/chatbotdata", chatbotData, {
    withCredentials: true,
  });
}

function* updateChatbot(action) {
  try {
    const result = yield call(updateChatbotAPI, action.data);
    yield put({
      type: UPDATE_CHATBOT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPDATE_CHATBOT_FAILURE,
      error: e,
    });
  }
}

function* watchUpdateChatbot() {
  yield takeEvery(UPDATE_CHATBOT_REQUEST, updateChatbot);
}
//챗봇 삭제
function deleteChatbotAPI(chatbotData) {
  return axios.delete(
    "api/chatbotdata",
    { data: chatbotData },
    {
      withCredentials: true,
    }
  );
}

function* deleteChatbot(action) {
  try {
    const result = yield call(deleteChatbotAPI, action.data);
    yield put({
      type: DELETE_CHATBOT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_CHATBOT_FAILURE,
      error: e,
    });
  }
}

function* watchDeleteChatbot() {
  yield takeEvery(DELETE_CHATBOT_REQUEST, deleteChatbot);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadChatbot),
    fork(watchAddChatbot),
    fork(watchUpdateChatbot),
    fork(watchDeleteChatbot),
  ]);
}
