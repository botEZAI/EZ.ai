export const initialState = {
  chatbotList: [], //챗봇리스트
  currentChatbot: null, //현재 클릭된 챗봇
  currentCategories: null, //현재 클릭된 챗봇의 카테고리 리스트
};

export const ADD_CHATBOT_REQUEST = "ADD_CHATBOT_REQUEST";
export const ADD_CHATBOT_SUCCESS = "ADD_CHATBOT_SUCCESS";
export const ADD_CHATBOT_FAILURE = "ADD_CHATBOT_FAILURE";

export const LOAD_CHATBOT_REQUEST = "LOAD_CHATBOT_REQUEST";
export const LOAD_CHATBOT_SUCCESS = "LOAD_CHATBOT_SUCCESS";
export const LOAD_CHATBOT_FAILURE = "LOAD_CHATBOT_FAILURE";

export const SET_CURRENT_CHATBOT = "SET_CURRENT_CHATBOT";

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
        currentCategories: action.data.categories,
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
    case SET_CURRENT_CHATBOT: {
      return {
        ...state,
        currentChatbot: action.data,
        currentCategories: action.data.categories,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
