import React,{ useState } from "react";
import "./ChatbotList.css";
import InputBot from './InputBot/InputBot';
import Popup from './Popup/Popup';
import BotList from "./BotList";
import axios from 'axios';
import PropTypes from 'prop-types';

const ChatbotList = () => {

    Popup.propTypes = {
        isOpen: PropTypes.bool,
        close: PropTypes.func.isRequired
    }

    // 봇 state
    const [bots, setBots] = useState([
        {id:1, text:"기본봇"}
    ]);
    // 팝업 state
    const [popup, setPopup] = useState([
        {showPopup : false}
    ]);

    //팝업창 닫으면서 봇을 리스트에 추가
    const closePopup = () => {

        setPopup({
            showPopup:false // 팝업창 닫힘
        });

        let data = {
            id: bots.length + 1,
            text: "봇 테스트"
        };

        // const reqData = {
        //     text: data.text
        // };
        
        // const url = "/url";  

        // axios.post(url, reqData).then( resp => { 
        //     // 성공시
        //     setBots([...bots, data]);
        // })
        // .catch( err => {
        //     // 에러발생시
        //     alert("ERROR : " + err);
        // });

        setBots([...bots, data]);
    };

    // 팝업창 띄움
    const dataInsertHandler = () => {
        let openPopup = {
            showPopup: true
        };

        setPopup(openPopup);
        
    };

    //봇 삭제
    const dataRemoveHandler = (id) => {

        const index = bots.findIndex(bot => bot.id === id);
        
        let newBots = [
            ...bots.slice(0,index),
            ...bots.slice(index+1, bots.length)
        ];

        newBots.forEach ( (el, i) => {
            el.id=(i + 1);
        });

        setBots(newBots);

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
                    <Popup isOpen = {popup.showPopup} close = {closePopup}/>
                    <BotList bots={bots}
                             onRemove={dataRemoveHandler}/>
                </div>   
            </div>
        </div>
    )
};

export default ChatbotList;
