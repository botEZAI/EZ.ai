import React, { useCallback, useEffect, useState } from "react";
import "./BuilderInfo.css";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_CHATBOT_REQUEST,
  UPDATE_CHATBOT_SUCCESS_RESET,
} from "../../reducer/chatbot";

const BuilderInfo = ({ keywordObject, keywordCategory }) => {
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();
  const { currentChatbot, isUpdateSuccess } = useSelector(
    (state) => state.chatbot
  );
  const updateChatbot = useCallback(() => {
    if (info === "") alert("변경사항을 입력하세요.");
    else {
      const mergedData = {
        ...currentChatbot,
        data: keywordObject,
        categories: keywordCategory,
        info,
      };
      dispatch({
        type: UPDATE_CHATBOT_REQUEST,
        data: mergedData,
      });
      setInfo("");
    }
  }, [keywordObject, keywordCategory, info]);
  useEffect(() => {
    if (isUpdateSuccess) {
      alert("저장성공!");
    }
    dispatch({
      type: UPDATE_CHATBOT_SUCCESS_RESET,
    });
  }, [isUpdateSuccess]);
  const onChangeInfo = useCallback(
    (e) => {
      setInfo(e.target.value);
    },
    [info]
  );
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
          <p>
            연동된 플랫폼:
            {currentChatbot &&
              JSON.parse(currentChatbot.platformInfo).map((v) =>
                v.connect === true ? v.platform + " " : null
              )}
          </p>
        </div>
      </div>
      <div className="info__column">
        <input
          placeholder="변경사항"
          value={info}
          onChange={(e) => onChangeInfo(e)}
        />
        <button onClick={updateChatbot}>저장</button>
      </div>
    </>
  );
};

export default BuilderInfo;
