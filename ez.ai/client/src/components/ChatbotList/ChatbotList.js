import React,{ useState } from "react";
import "./ChatbotList.css";
import InputBot from './InputBot/InputBot';
import BotList from "./BotList";

const ChatbotList = () => {
    
    const [bots, setBots] = useState([
        {id:1, text:"기본봇"}
    ]);

    // 봇 추가 (배열의 마지막에 추가)
    const dataInsertHandler = () => {

        let data = {
            id: bots.length + 1,
            text: "봇 테스트"
        };
        
        setBots([...bots, data]);
        
    };

    //봇 삭제
    const dataRemoveHandler = (id) => {
        // if(window.confirm("목록에서 지우시겠습니까?")){

        let index = bots.filter(bot => {
            return (bot.id) !== (id);
        });
        
        index.forEach( (el, i) => {
            // 0, 1, 2, 3.....
            el.id = (i + 1);
        });
        
        setBots(index);
        
    };

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
                <div className="list-line"></div>   
                <div className="content">
                    <InputBot onInsert={dataInsertHandler}/>
                    <BotList bots={bots}
                             onRemove={dataRemoveHandler}/>
                </div>   
            </div>
        </div>
    )
};

export default ChatbotList;
