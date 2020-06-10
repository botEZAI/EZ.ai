export const initialState = {
  chatbotList: [], //챗봇리스트
  currentChatbot: null, //현재 클릭된 챗봇
  currentCategories: null, //현재 클릭된 챗봇의 카테고리 리스트
  isUpdateSuccess: false, //업데이트 성공여부
  isDeleteSuccess: false, //삭제 성공여부
  history: null, //현재 만들고있는 챗봇의 버전
  isRecoverSuccess: false, //복구 성공여부
  isDeploySuccess: false, //배포 성공여부
  deploy: false,
};

export const ADD_CHATBOT_REQUEST = "ADD_CHATBOT_REQUEST";
export const ADD_CHATBOT_SUCCESS = "ADD_CHATBOT_SUCCESS";
export const ADD_CHATBOT_FAILURE = "ADD_CHATBOT_FAILURE";

export const LOAD_CHATBOT_REQUEST = "LOAD_CHATBOT_REQUEST";
export const LOAD_CHATBOT_SUCCESS = "LOAD_CHATBOT_SUCCESS";
export const LOAD_CHATBOT_FAILURE = "LOAD_CHATBOT_FAILURE";

export const UPDATE_CHATBOT_REQUEST = "UPDATE_CHATBOT_REQUEST";
export const UPDATE_CHATBOT_SUCCESS = "UPDATE_CHATBOT_SUCCESS";
export const UPDATE_CHATBOT_FAILURE = "UPDATE_CHATBOT_FAILURE";
export const UPDATE_CHATBOT_SUCCESS_RESET = "UPDATE_CHATBOT_SUCCESS_RESET";

export const DELETE_CHATBOT_REQUEST = "DELETE_CHATBOT_REQUEST";
export const DELETE_CHATBOT_SUCCESS = "DELETE_CHATBOT_SUCCESS";
export const DELETE_CHATBOT_FAILURE = "DELETE_CHATBOT_FAILURE";

export const CONNECT_CHATBOT_REQUEST = "CONNECT_CHATBOT_REQUEST";
export const CONNECT_CHATBOT_SUCCESS = "CONNECT_CHATBOT_SUCCESS";
export const CONNECT_CHATBOT_FAILURE = "CONNECT_CHATBOT_FAILURE";

export const DISCONNECT_CHATBOT_REQUEST = "DISCONNECT_CHATBOT_REQUEST";
export const DISCONNECT_CHATBOT_SUCCESS = "DISCONNECT_CHATBOT_SUCCESS";
export const DISCONNECT_CHATBOT_FAILURE = "DISCONNECT_CHATBOT_FAILURE";

export const SET_CURRENT_CHATBOT = "SET_CURRENT_CHATBOT";

export const LOAD_HISTORY_REQUEST = "LOAD_HISTORY_REQUEST";
export const LOAD_HISTORY_SUCCESS = "LOAD_HISTORY_SUCCESS";
export const LOAD_HISTORY_FAILURE = "LOAD_HISTORY_FAILURE";

export const RECOVER_HISTORY_REQUEST = "RECOVER_HISTORY_REQUEST";
export const RECOVER_HISTORY_SUCCESS = "RECOVER_HISTORY_SUCCESS";
export const RECOVER_HISTORY_FAILURE = "RECOVER_HISTORY_FAILURE";

export const RECOVER_HISTORY_SUCCESS_RESET = "RECOVER_HISTORY_SUCCESS_RESET";

export const REMOVE_HISTORY_REQUEST = "REMOVE_HISTORY_REQUEST";
export const REMOVE_HISTORY_SUCCESS = "REMOVE_HISTORY_SUCCESS";
export const REMOVE_HISTORY_FAILURE = "REMOVE_HISTORY_FAILURE";

export const DEPLOY_HISTORY_REQUEST = "DEPLOY_HISTORY_REQUEST";
export const DEPLOY_HISTORY_SUCCESS = "DEPLOY_HISTORY_SUCCESS";
export const DEPLOY_HISTORY_FAILURE = "DEPLOY_HISTORY_FAILURE";

export const DEPLOY_HISTORY_SUCCESS_RESET = "DEPLOY_HISTORY_SUCCESS_RESET";

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHATBOT_REQUEST: {
      return {
        ...state,
      };
    }
    case ADD_CHATBOT_SUCCESS: {
      return {
        ...state,
        chatbotList: [...state.chatbotList, action.data],
      };
    }
    case ADD_CHATBOT_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_CHATBOT_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_CHATBOT_SUCCESS: {
      return {
        ...state,
        chatbotList: action.data,
      };
    }
    case LOAD_CHATBOT_FAILURE: {
      return {
        ...state,
      };
    }
    case UPDATE_CHATBOT_REQUEST: {
      return {
        ...state,
      };
    }
    case UPDATE_CHATBOT_SUCCESS: {
      return {
        ...state,
        chatbotList: action.data.chatbotData,
        history: action.data.historyData,
        isUpdateSuccess: true,
      };
    }
    case UPDATE_CHATBOT_FAILURE: {
      return {
        ...state,
      };
    }
    case UPDATE_CHATBOT_SUCCESS_RESET: {
      return {
        ...state,
        isUpdateSuccess: false,
      };
    }
    case DELETE_CHATBOT_REQUEST: {
      return {
        ...state,
      };
    }
    case DELETE_CHATBOT_SUCCESS: {
      return {
        ...state,
        chatbotList: action.data,
        isDeleteSuccess: true,
      };
    }
    case DELETE_CHATBOT_FAILURE: {
      return {
        ...state,
      };
    }
    case CONNECT_CHATBOT_REQUEST: {
      return {
        ...state,
      };
    }
    case CONNECT_CHATBOT_SUCCESS: {
      return {
        ...state,
        chatbotList: action.data,
      };
    }
    case CONNECT_CHATBOT_FAILURE: {
      return {
        ...state,
      };
    }
    case DISCONNECT_CHATBOT_REQUEST: {
      return {
        ...state,
      };
    }
    case DISCONNECT_CHATBOT_SUCCESS: {
      return {
        ...state,
        chatbotList: action.data,
      };
    }
    case DISCONNECT_CHATBOT_FAILURE: {
      return {
        ...state,
      };
    }
    case SET_CURRENT_CHATBOT: {
      return {
        ...state,
        currentChatbot: action.data,
        currentCategories: JSON.parse(action.data.categories),
      };
    }
    case LOAD_HISTORY_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_HISTORY_SUCCESS: {
      return {
        ...state,
        history: action.data.history,
      };
    }
    case LOAD_HISTORY_FAILURE: {
      return {
        ...state,
      };
    }
    case RECOVER_HISTORY_REQUEST: {
      return {
        ...state,
      };
    }
    case RECOVER_HISTORY_SUCCESS: {
      return {
        ...state,
        currentChatbot: {
          ...state.currentChatbot,
          data: action.data.data,
        },
        currentCategories: JSON.parse(action.data.categories),
        isRecoverSuccess: true,
      };
    }

    case RECOVER_HISTORY_FAILURE: {
      return {
        ...state,
      };
    }
    case RECOVER_HISTORY_SUCCESS_RESET: {
      return {
        ...state,
        isRecoverSuccess: false,
      };
    }
    case REMOVE_HISTORY_REQUEST: {
      return {
        ...state,
      };
    }
    case REMOVE_HISTORY_SUCCESS: {
      return {
        ...state,
        history: JSON.stringify(action.data),
      };
    }
    case REMOVE_HISTORY_FAILURE: {
      return {
        ...state,
      };
    }
    case DEPLOY_HISTORY_REQUEST: {
      return {
        ...state,
      };
    }
    case DEPLOY_HISTORY_SUCCESS: {
      return {
        ...state,
        history: JSON.stringify(action.data),
        isDeploySuccess: true,
      };
    }
    case DEPLOY_HISTORY_FAILURE: {
      return {
        ...state,
      };
    }
    case DEPLOY_HISTORY_SUCCESS_RESET: {
      return {
        ...state,
        isDeploySuccess: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
