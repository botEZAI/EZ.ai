import React,{ useState } from "react";
import "./ChatbotList.css";
import InputBot from './InputBot/InputBot';
import Popup from './Popup/Popup';
import BotList from "./BotList";
//import axios from 'axios';
import TokenPopup from "./Popup/TokenPopup";
import TokenChkPopup from "./Popup/TokenChkPopup";

const ChatbotList = () => {


    // 봇 state
    const [bots, setBots] = useState([
        {id:1, text:"기본봇"}
    ]);
    // 팝업 state
    const [popup, setPopup] = useState([
        {showPopup1 : false, showPopup2 : false, showPopup3 : false}
    ]);

    //InsertStarter: 팝업창 띄움
    const InsertStarter = () => {
        let openPopup = {
            showPopup1: true,
            showPopup2: false,
            showPopup3: false
        };

        setPopup(openPopup);
    };

    //InserFinish : 팝업창 닫으면서 봇을 리스트에 추가
    const InsertFinish = () => {

        setPopup({
            showPopup1:false,
            showPopup2:false,
            showPopup3: false // 팝업창 닫힘
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

    // nextPopup : 봇 간의 이동 (이전, 다음)
    const nextPopup = (nextVal) => { 

        const nextPopup = {
            showPopup1: false,
            showPopup2: false,
            showPopup3 : false
        }

        if(nextVal === 'tokenInput'){
            nextPopup.showPopup1 = false;
            nextPopup.showPopup2 = true;
            nextPopup.showPopup3 = false;
        }else if(nextVal === 'tokenChk'){
            nextPopup.showPopup1 = false;
            nextPopup.showPopup2 = false;
            nextPopup.showPopup3 = true;
        }else if(nextVal === 'first'){
            nextPopup.showPopup1 = true;
            nextPopup.showPopup2 = false;
            nextPopup.showPopup3 = false;
        }

        setPopup(nextPopup);
    }
    // closePopup : (봇 생성과 무관하게) 팝업창 강제로 닫기
    const closePopup = () => {
        setPopup({
            showPopup1:false,
            showPopup2:false,
            showPopup3: false 
        });
    }

    //dataRemoveHandler: 봇 삭제
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
                    <InputBot onInsert={InsertStarter}/>
                    <Popup isOpen = {popup.showPopup1} close = {closePopup} next = {nextPopup}/>
                    <TokenPopup isOpen = {popup.showPopup2} close = {closePopup} next = {nextPopup}/>
                    <TokenChkPopup isOpen = {popup.showPopup3} close = {closePopup} next={nextPopup} finish={InsertFinish}/>
                    <BotList bots={bots}
                             onRemove={dataRemoveHandler}/>
                </div>   
            </div>
        </div>
    )
};

export default ChatbotList;
