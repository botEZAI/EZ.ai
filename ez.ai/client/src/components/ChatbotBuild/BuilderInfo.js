import React, { useCallback, useEffect, useState } from "react";
import "./BuilderInfo.css";
import { Prompt } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_CHATBOT_REQUEST,
  UPDATE_CHATBOT_SUCCESS_RESET,
  LOAD_HISTORY_REQUEST,
  DEPLOY_HISTORY_REQUEST,
} from "../../reducer/chatbot";

const BuilderInfo = ({ keywordObject, keywordCategory }) => {
  const [info, setInfo] = useState("");
  const snsIcon = ["fab fa-line", "fab fa-facebook-square", "fab fa-telegram"];
  const [isSaved, setIsSaved] = useState(true);
  const [isDeployed, setIsDeployed] = useState(false);
  const dispatch = useDispatch();
  const {
    currentChatbot,
    isUpdateSuccess,
    history,
    isDeploySuccess,
  } = useSelector((state) => state.chatbot);

  const updateChatbot = useCallback(() => {
    if (info === "") alert("저장사항에 대한 정보를 입력하세요.");
    else {
      const mergedData = {
        ...currentChatbot,
        data: keywordObject,
        categories: keywordCategory,
        info,
        deploy: false,
      };
      dispatch({
        type: UPDATE_CHATBOT_REQUEST,
        data: mergedData,
      });
      setInfo("");
    }
  }, [keywordObject, keywordCategory, info]);
  const deployChatbot = useCallback(() => {
    if (info === "") alert("저장사항에 대한 정보를 입력하세요.");
    else {
      const mergedData = {
        ...currentChatbot,
        data: keywordObject,
        categories: keywordCategory,
        info,
        deploy: false,
      };
      dispatch({
        type: UPDATE_CHATBOT_REQUEST,
        data: mergedData,
      });
      setIsDeployed(true);

      setInfo("");
    }
  }, [keywordObject, keywordCategory, info, history]);
  useEffect(() => {
    if (isUpdateSuccess) {
      alert("저장성공!");
      setIsSaved(true);
      if (isDeployed) {
        dispatch({
          type: DEPLOY_HISTORY_REQUEST,
          data: {
            currentChatbot,
            history: history && JSON.parse(history).reverse()[0],
          },
        });
        setIsDeployed(false);
      }
    }
    dispatch({
      type: UPDATE_CHATBOT_SUCCESS_RESET,
    });
  }, [isUpdateSuccess]);
  //저장여부 설정
  useEffect(() => {
    if (
      currentChatbot &&
      JSON.stringify(keywordObject) !== currentChatbot.data
    ) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  }, [keywordObject]);

  const onChangeInfo = useCallback(
    (e) => {
      setInfo(e.target.value);
    },
    [info]
  );
  return (
    <>
      <Prompt
        when={!isSaved}
        message="저장이 안되어있습니다. 이동하시겠습니까?"
      />
      <div className="info__column">
        <div className="info__main">
          <div className="info-name">
            <p>{currentChatbot && currentChatbot.botname}</p>
          </div>
          <div className="info-discription">
            <p>Description : {currentChatbot && currentChatbot.desc}</p>
          </div>
        </div>
        <div className="info-platform">
          <div className="info-platform-title">
            <p>플랫폼 연동 정보</p>
          </div>
          <div className="builder-bot-item-connected">
            {currentChatbot &&
              JSON.parse(currentChatbot.platformInfo).map((info, i) => (
                <div
                  className={info.connect ? `sns-color-${info.platform}` : null}
                >
                  <i className={snsIcon[i]}></i>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="info__column">
        <input
          placeholder="저장에 대한 정보를 입력하세요"
          value={info}
          onChange={(e) => onChangeInfo(e)}
        />
        <button className="save" onClick={updateChatbot}>저장</button>
        <button className="deploy" onClick={deployChatbot}>배포</button>
      </div>
    </>
  );
};

export default BuilderInfo;
