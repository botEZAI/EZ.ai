import React,{ useState } from "react";
import "./ChatbotList.css";
import InputBot from './InputBot/InputBot';
import BotList from "./BotList";
import axios from 'axios';

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

        const reqData = {
            text: data.text
        };

        console.log(data);

        const url = "/url";  

        axios.post(url, reqData).then( resp => { 
            // 성공시
            setBots([...bots, data]);
        })
        .catch( err => {
            // 에러발생시
            alert("ERROR : " + err);
        });
        
        // setBots([...bots, data]);

        
    };

    //봇 삭제
    const dataRemoveHandler = (id) => {
        // if(window.confirm("목록에서 지우시겠습니까?")){

        let index = bots.filter(bot => {  // filter가 안 먹히는 브라우저도 있으니 slice 이용하는 걸로 수정 예정
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
                            <input type="text" className="search-input" placeholder="ChatBot name"/>
                        </span>
                        <span className="search-btn">
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
