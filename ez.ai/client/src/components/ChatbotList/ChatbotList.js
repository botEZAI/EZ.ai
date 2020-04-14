import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CHATBOT_REQUEST,
  LOAD_CHATBOT_REQUEST,
} from "../../reducer/chatbot";
import "./ChatbotList.css";
import InputBot from "./InputBot/InputBot";
import Popup from "./Popup/Popup";
import BotList from "./BotList";
import axios from "axios";
import TokenPopup from "./Popup/TokenPopup";
import TokenChkPopup from "./Popup/TokenChkPopup";

const ChatbotList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { currentCategories } = useSelector((state) => state.chatbot);
  useEffect(() => {
    if (user) {
      dispatch({
        type: LOAD_CHATBOT_REQUEST,
      });
    }
  }, [user]);
  // 봇 state
  const [bots, setBots] = useState([
    {
      id: 1,
      name: "기본 봇",
      desc: "봇 설명란입니다",
      sns: "telegram",
      token: "",
    },
  ]);
  const [popup, setPopup] = useState([
    { showPopup1: false, showPopup2: false, showPopup3: false },
  ]);
  const [botName, setBotName] = useState({ name: "" });
  const [botDesc, setBotDesc] = useState({ desc: "" });
  const [botConnect, setBotConnect] = useState({ sns: "" });
  const [botToken, setBotToken] = useState({ token: "" });

  //InsertStarter: 팝업창 띄움
  const InsertStarter = () => {
    // 이전 입력 봇 정보 초기화
    setBotName({ name: "" });
    setBotDesc({ desc: "" });
    setBotConnect({ sns: "" });
    setBotToken({ token: "" });

    let openPopup = {
      showPopup1: true,
      showPopup2: false,
      showPopup3: false,
    };
    setPopup(openPopup);
  };

  //InserFinish : 팝업창 닫으면서 봇을 리스트에 추가
  const InsertFinish = () => {
    console.log(bots);
    setPopup({
      showPopup1: false,
      showPopup2: false,
      showPopup3: false, // 팝업창 닫힘
    });

    let dataObject = {
      id: bots.length + 1,
      name: botName.name,
      desc: botDesc.desc,
      sns: botConnect.sns,
      token: botToken.token,
    };

    const reqData = {
      user: user.email,
      botname: botName.name,
      desc: botDesc.desc,
      sns: botConnect.sns,
      token: botToken.token,
      data: [
        {
          keyword: "Welcome",
          id: 1,
          contents: [],
          completed: false,
          category: "미분류",
        },
      ],
      categories: [{ category: "미분류", show: true }],
    };

    dispatch({
      type: ADD_CHATBOT_REQUEST,
      data: reqData,
    });

    setBots([...bots, dataObject]);
  };

  // nextPopup : 팝업창 간의 이동 (이전, 다음)
  const nextPopup = (nextVal) => {
    const nextPopup = {
      showPopup1: false,
      showPopup2: false,
      showPopup3: false,
    };

    if (nextVal === "tokenInput") {
      nextPopup.showPopup1 = false;
      nextPopup.showPopup2 = true;
      nextPopup.showPopup3 = false;
    } else if (nextVal === "tokenChk") {
      nextPopup.showPopup1 = false;
      nextPopup.showPopup2 = false;
      nextPopup.showPopup3 = true;
    } else if (nextVal === "first") {
      nextPopup.showPopup1 = true;
      nextPopup.showPopup2 = false;
      nextPopup.showPopup3 = false;
    }

    setPopup(nextPopup);
  };
  // closePopup : (봇 생성과 무관하게) 팝업창 강제로 닫기
  const closePopup = () => {
    setPopup({
      showPopup1: false,
      showPopup2: false,
      showPopup3: false,
    });
  };

  //dataRemoveHandler: 봇 삭제
  const dataRemoveHandler = (id) => {
    const index = bots.findIndex((bot) => bot.id === id);

    let newBots = [
      ...bots.slice(0, index),
      ...bots.slice(index + 1, bots.length),
    ];

    newBots.forEach((el, i) => {
      el.id = i + 1;
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
              <input
                type="text"
                className="search-input"
                placeholder="ChatBot name"
              />
            </span>
            <span className="search-btn">
              <button>검색</button>
            </span>
          </div>
        </div>
        <div className="list-line"></div>
        <div className="content">
          <InputBot onInsert={InsertStarter} />
          <Popup
            isOpen={popup.showPopup1}
            close={closePopup}
            next={nextPopup}
            botName={botName}
            botDesc={botDesc}
            botConnect={botConnect}
            setBotName={setBotName}
            setBotDesc={setBotDesc}
            setBotConnect={setBotConnect}
          />
          <TokenPopup
            isOpen={popup.showPopup2}
            close={closePopup}
            next={nextPopup}
            setBotName={setBotName}
            setBotDesc={setBotDesc}
            setBotConnect={setBotConnect}
            botToken={botToken}
            setBotToken={setBotToken}
          />
          <TokenChkPopup
            isOpen={popup.showPopup3}
            close={closePopup}
            next={nextPopup}
            botToken={botToken}
            setBotToken={setBotToken}
            finish={InsertFinish}
          />
          <BotList
            bots={bots}
            onRemove={dataRemoveHandler}
            botDesc={botDesc}
            botConnect={botConnect}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotList;
