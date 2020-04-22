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
    [currentChatbot]
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
            <div className="bot-item-header">
              <div className="bot-name" onClick={botClickEvent}>
                {children}
              </div>

              {/* <div className="sns-icons-container">
                {botSnsIconHandler(botConnect)}
              </div> */}
              <div className="sns-icons-container">
                {JSON.parse(
                  chatbotList.find((v) => v.id === id).platformInfo
                ).map((info) => (
                  <span className={`icon-${info.platform}`}>
                    <label class="switch">
                      <input
                        type="checkbox"
                        onClick={() => onClickPlatform(info)}
                        checked={info.connect}
                      />
                      <span class="slider round"></span>
                    </label>
                  </span>
                ))}
              </div>
              <div
                className="bot-item-ceate"
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
            <div className="bot-item-footer">
              <div className="bot-description">
                <div className="txt-description">Description</div>
                <div className="txtBox">{botDesc}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bot-item-default">
            <div className="bot-name" onClick={botClickEvent}>
              {children}
            </div>

            {/* <div className="sns-icons-container">
              {botSnsIconHandler(botConnect)}
            </div> */}
            <div className="sns-icons-container">
              {JSON.parse(
                chatbotList.find((v) => v.id === id).platformInfo
              ).map((info) => (
                <span className={`icon-${info.platform}`}>
                  <label class="switch">
                    <input
                      type="checkbox"
                      onClick={() => onClickPlatform(info)}
                      checked={info.connect}
                    />
                    <span class="slider round"></span>
                  </label>
                </span>
              ))}
            </div>
            <div
              className="bot-item-ceate"
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
      )}
    </React.Fragment>
  );
};

export default withRouter(BotItem);
