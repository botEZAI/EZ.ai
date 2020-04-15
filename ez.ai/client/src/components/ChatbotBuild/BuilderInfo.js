import React, { useCallback, useEffect } from "react";
import "./BuilderInfo.css";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_CHATBOT_REQUEST,
  UPDATE_CHATBOT_SUCCESS_RESET,
} from "../../reducer/chatbot";

const BuilderInfo = ({ keywordObject, keywordCategory }) => {
  const dispatch = useDispatch();
  const { currentChatbot, isUpdateSuccess } = useSelector(
    (state) => state.chatbot
  );
  const updateChatbot = useCallback(() => {
    const mergedData = {
      ...currentChatbot,
      data: keywordObject,
      categories: keywordCategory,
    };
    dispatch({
      type: UPDATE_CHATBOT_REQUEST,
      data: mergedData,
    });
  }, [keywordObject, keywordCategory]);
  useEffect(() => {
    if (isUpdateSuccess) {
      alert("저장성공!");
    }
    dispatch({
      type: UPDATE_CHATBOT_SUCCESS_RESET,
    });
  }, [isUpdateSuccess]);
  return (
    <>
      <div className="info__column">
        <div className="info-name">
          <p>챗봇 이름:{currentChatbot && currentChatbot.botname}</p>
        </div>
        <div className="info-discription">
          <p>챗봇 간단 설명:{currentChatbot && currentChatbot.desc}</p>
        </div>
      </div>
      <div className="info__column">
        <div className="info-platform">
          <p>플랫폼 정보:{currentChatbot && currentChatbot.sns}</p>
        </div>
      </div>
      <div className="info__column">
        <button onClick={updateChatbot}>저장</button>
        <button>배포</button>
        <div className="builder_undo">배포 전 되돌아가기</div>
      </div>
    </>
  );
};

export default BuilderInfo;
