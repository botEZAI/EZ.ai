import React, { useState, useCallback } from "react";
import "./BotItem.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CURRENT_CHATBOT,
  DELETE_CHATBOT_REQUEST,
  DISCONNECT_CHATBOT_REQUEST,
} from "../../../reducer/chatbot";
import { withRouter } from "react-router-dom";
import AddPlatformPopup from "../Popup/AddPlatformPopup";

const BotItem = (props) => {
  const dispatch = useDispatch();
  const { currentChatbot, chatbotList, currentCategories } = useSelector(
    (state) => state.chatbot
  );
  const [botClick, setBotClick] = useState({ botOn: false });
  const { children, onRemove, botDesc, botConnect, id } = props;
  const [addPlatformFlag, setAddPlatformFlag] = useState("");

  const [selectedSns, setSelectedSns] = useState([
    { name: "line", color: false },
    { name: "facebook", color: false },
    { name: "telegram", color: false },
    { name: "kakao", color: false },
  ]);

  const botClickEvent = (e) => {
    setBotClick({ botOn: !botClick.botOn });
  };
  const botDeleteClickEvent = useCallback(
    (id) => {
      const index = chatbotList.findIndex((v) => v.id === id);
      const chatbotData = chatbotList[index];
      dispatch({
        type: DELETE_CHATBOT_REQUEST,
        data: chatbotData,
      });
    },
    [currentChatbot]
  );
  const botSnsIconHandler = (botConnect) => {
    if (botConnect === "kakao") {
      return <span className="icon-kakao"></span>;
    } else if (botConnect === "line") {
      return <span className="icon-line"></span>;
    } else if (botConnect === "facebook") {
      return <span className="icon-facebook"></span>;
    } else if (botConnect === "telegram") {
      return <span className="icon-telegram"></span>;
    } else {
      return null;
    }
  };
  const setCurrentChatbot = useCallback(
    (id) => {
      const index = chatbotList.findIndex((v) => v.id === id);
      const chatbotData = chatbotList[index];
      dispatch({
        type: SET_CURRENT_CHATBOT,
        data: chatbotData,
      });
      props.history.push("/chatbotbuild");
    },
    [chatbotList]
  );
  //플랫폼 추가 팝업
  const onClickPlatform = useCallback((info) => {

    //연결되어 있으면 해제
    if (info.connect) {
      const platformInfo = JSON.parse(
        chatbotList.find((v) => v.id === id).platformInfo
      );
      platformInfo.find((v) => v.platform === info.platform).connect = false;

      dispatch({
        type: DISCONNECT_CHATBOT_REQUEST,
        data: { platformInfo, id },
      });
    } else {
      setAddPlatformFlag(info.platform);
    }
    // 연결시 색 생기게끔 - 추후수정예정
    setSelectedSns(selectedSns.map(i => (
        i.name === info.platform ?
            {name : i.name,  color :!i.color }
            : i)));
  }, []);
  return (
    <React.Fragment>
      {addPlatformFlag && (
        <AddPlatformPopup
          addPlatformFlag={addPlatformFlag}
          setAddPlatformFlag={setAddPlatformFlag}
          id={id}
        />
      )}
      {botClick.botOn ? (
        <div>
          <div className="bot-item-expand">
            <div className="bot-item-header" onClick={botClickEvent}>
              <div className="bot-item-infos">
                <div className="bot-name">{children}</div>
                <div className="bot-item-connected">
                  <div
                    className={selectedSns[0].color ? "sns-color-line" : null}
                  >
                    <i className="fab fa-line"></i>
                  </div>
                  <div
                    className={
                      selectedSns[1].color ? "sns-color-facebook" : null
                    }
                  >
                    <i className="fab fa-facebook-square"></i>
                  </div>
                  <div
                    className={
                      selectedSns[2].color ? "sns-color-telegram" : null
                    }
                  >
                    <i className="fab fa-telegram"></i>
                  </div>
                  <div
                    className={selectedSns[3].color ? "sns-color-kakao" : null}
                  >
                    <i className="fab fa-kaggle"></i>
                  </div>
                </div>
              </div>

              {/* <div className="sns-icons-container">
                {botSnsIconHandler(botConnect)}
              </div> */}
              <div className="bot-item-btns">
                <div
                  className="bot-item-create"
                  onClick={() => setCurrentChatbot(id)}
                >
                  만들기
                </div>
                <div
                  className="delete"
                  onClick={() => {
                    botDeleteClickEvent(id);
                  }}
                >
                  삭제
                </div>
              </div>
            </div>
            <div className="bot-item-footer">
              <div className="bot-description">
                <div className="txt-description">Description</div>
                <div className="txtBox">{botDesc}</div>
              </div>
            </div>

            <div className="sns-icons-container">
              {JSON.parse(
// <<<<<<< choikeonwoo
// //                 chatbotList.find((v) => v.id === id).platformInfo
// //               ).map((info) => (
// //                 <div className="sns-icon-container">
// //                   <div className="sns-icon-container-info">
// //                     <div className="sns-icon-container-icon">
// //                       <div className={`icon-${info.platform}`}></div>
// //                     </div>
// //                     <div className="sns-icon-container-toggle">
// //                       <label className="switch">
// //                         <input
// //                           type="checkbox"
// //                           onClick={() => onClickPlatform(info)}
// //                           checked={info.connect}
// //                         />
// //                         <span className="slider round"></span>
// //                       </label>
// =======
                  chatbotList.find((v) => v.id === id).platformInfo
              ).map((info, i) => (
                  <div className={selectedSns[i].color ? `sns-color-${info.platform} sns-icon-container` : "sns-icon-container"}>
                    <div className="sns-icon-container-info">
                      <div className= "sns-icon-container-icon">
                        <div className={`icon-${info.platform}`}></div>
                      </div>
                      <div className="sns-icon-container-toggle">
                        <label className="switch">
                          <input
                              type="checkbox"
                              className="sns-icon-checkbox"
                              onClick={() => onClickPlatform(info)}
                              checked={info.connect}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // 접혀있을때
        <div>
          <div className="bot-item-default" onClick={botClickEvent}>
            <div className="bot-item-infos">
              <div className="bot-name">{children}</div>
              <div className="bot-item-connected">
                <div className={selectedSns[0].color ? "sns-color-line" : null}>
                  <i className="fab fa-line"></i>
                </div>
                <div
                  className={selectedSns[1].color ? "sns-color-facebook" : null}
                >
                  <i className="fab fa-facebook-square"></i>
                </div>
                <div
                  className={selectedSns[2].color ? "sns-color-telegram" : null}
                >
                  <i className="fab fa-telegram"></i>
                </div>
                <div
                  className={selectedSns[3].color ? "sns-color-kakao" : null}
                >
                  <i className="fab fa-kaggle"></i>
                </div>
              </div>
            </div>
            <div className="bot-item-btns">
              <div
                className="bot-item-create"
                onClick={() => setCurrentChatbot(id)}
              >
                만들기
              </div>
              <div
                className="delete"
                onClick={() => {
                  botDeleteClickEvent(id);
                }}
              >
                삭제
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(BotItem);
