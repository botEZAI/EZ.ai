import React from "react";
import "./ChatbotList.css";
import InputBot from './InputBot/InputBot';

const searchResult = [
  {
      id: 1,
      loginName: "kakao Chatbot"
  },
  {
      id: 2,
      loginName: "naver Chatbot"
  },
  {
      id: 3,
      loginName: "Line Chatbot"
  },
  {
      id: 4,
      loginName: "facebook Chatbot"
  }
]

const ChatbotList = () => {
  return (
    <div>
        <div className="main">
        <div className="main-title">
                <div className="sub-title">
                    <span className="list-title">나의 챗봇 목록</span>
                </div>
                <div className="sub-title">
                    <span>
                        <input type="text" className="search-input" placeholder="검색어를 입력하세요."/>
                    </span>
                    <span className="search-btn-span">
                        <button>검색</button>
                    </span>
                </div>
            </div>
            <div class="list-line"></div>   
            <div className="content">
                <InputBot />
            </div>   
        </div>

    </div>
  )
};

export default ChatbotList;
