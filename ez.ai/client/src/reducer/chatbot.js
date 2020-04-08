export const initialState = {
  chatbotList: [],
};

export const ADD_CHATBOT_REQUEST = "ADD_CHATBOT_REQUEST";
export const ADD_CHATBOT_SUCCESS = "ADD_CHATBOT_SUCCESS";
export const ADD_CHATBOT_FAILURE = "ADD_CHATBOT_FAILURE";

export const LOAD_CHATBOT_REQUEST = "LOAD_CHATBOT_REQUEST";
export const LOAD_CHATBOT_SUCCESS = "LOAD_CHATBOT_SUCCESS";
export const LOAD_CHATBOT_FAILURE = "LOAD_CHATBOT_FAILURE";

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
    default: {
      return {
        ...state,
      };
    }
  }
};
