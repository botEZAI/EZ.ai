import React, { useState, useCallback } from "react";
import "./BotItem.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_CHATBOT } from "../../../reducer/chatbot";
import { withRouter } from "react-router-dom";

const BotItem = (props) => {
  const dispatch = useDispatch();
  const { currentChatbot, chatbotList } = useSelector((state) => state.chatbot);
  const [botClick, setBotClick] = useState({ botOn: false });
  const { children, onRemove, botDesc, botConnect, id } = props;

  const botClickEvent = (e) => {
    setBotClick({ botOn: !botClick.botOn });
  };
  const botDeleteClickEvent = (e) => {
    onRemove();
  };
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
      const currentChatbot = chatbotList.find((v) => v.id === id);
      dispatch({
        type: SET_CURRENT_CHATBOT,
        data: currentChatbot,
      });
      props.history.push("/chatbotbuild");
    },
    [currentChatbot]
  );
  return (
    <React.Fragment>
      {botClick.botOn ? (
        <div>
          <div className="bot-item-expand" onClick={botClickEvent}>
            <div className="bot-item-header">
              <div className="bot-name">{children}</div>

              <div className="sns-icons-container">
                {botSnsIconHandler(botConnect)}
              </div>
              <div
                className="bot-item-ceate"
                onClick={() => setCurrentChatbot(id)}
              >
                만들기
              </div>
              <div className="delete" onClick={botDeleteClickEvent}>
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
          <div className="bot-item-default" onClick={botClickEvent}>
            <div className="bot-name">{children}</div>

            <div className="sns-icons-container">
              {botSnsIconHandler(botConnect)}
            </div>
            <div
              className="bot-item-ceate"
              onClick={() => setCurrentChatbot(id)}
            >
              만들기
            </div>
            <div className="delete" onClick={botDeleteClickEvent}>
              삭제
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(BotItem);
