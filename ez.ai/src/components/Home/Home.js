import React from 'react';
import './Home.css';

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
        loginName: "facebook Chatbot"
    }
]

const Home = () => {
    return (
        <div class="main">
           <div class="main-title">
                <div class="sub-title">
                    <span class="list-title">나의 챗봇 목록</span>
                </div>
                <div class="sub-title">
                    <span>
                        <input type="text" class="search-input" placeholder="검색어를 입력하세요."/>
                    </span>
                    <span class="search-btn-span">
                        <button>검색</button>
                    </span>
                </div>
            </div>            
            <div class="list-line"></div>
            <div class="chat-list create-bot">
                <span>+ 새로운 챗봇 만들기</span>
             </div>
        </div>
    );
};

export default Home;
