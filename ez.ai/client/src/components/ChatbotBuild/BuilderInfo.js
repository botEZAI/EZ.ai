import React, { useCallback, useEffect, useState } from "react";
import "./BuilderInfo.css";
import { Prompt } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import produce from "immer";
import {
  UPDATE_CHATBOT_REQUEST,
  UPDATE_CHATBOT_SUCCESS_RESET,
  LOAD_HISTORY_REQUEST,
  DEPLOY_HISTORY_REQUEST,
} from "../../reducer/chatbot";

const BuilderInfo = ({ keywordObject, keywordCategory, setKeywordObject }) => {
  const [info, setInfo] = useState("");
  const snsIcon = ["fab fa-line", "fab fa-telegram"];
  const [isSaved, setIsSaved] = useState(true);
  const [isDeployed, setIsDeployed] = useState(false);
  const [isCanSave, setIsCanSave] = useState(true);
  const dispatch = useDispatch();
  const {
    currentChatbot,
    isUpdateSuccess,
    history,
    isDeploySuccess,
  } = useSelector((state) => state.chatbot);

  const platformInfo =
    currentChatbot && JSON.parse(currentChatbot.platformInfo);
  const [lineLimitOn, setLineLimmitOn] = useState(false);
  useEffect(() => {
    if (
      platformInfo &&
      platformInfo[0].connect &&
      keywordObject.find((v) => v.contents.length > 4)
    )
      setLineLimmitOn(true);
    else setLineLimmitOn(false);
  }, [keywordObject]);
  useEffect(() => {
    keywordObject.map((keyword, index) => {
      keyword.contents.map((content, i) => {
        if (content.type === "btn_template") {
          if (content.content.text === "") setIsCanSave(false);
        }
      });
    });
  }, [keywordObject]);
  const updateChatbot = () => {
    if (info === "") alert("저장사항에 대한 정보를 입력하세요.");
    else {
      if (!isCanSave) {
        setIsCanSave(true);
        alert("버튼템플릿 텍스트는 필수 입력사항입니다.");
        setInfo("");
      } else {
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
    }
  };
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
      if (lineLimitOn) {
        dispatch({
          type: UPDATE_CHATBOT_REQUEST,
          data: mergedData,
        });
        setInfo("");
        alert(
          "라인은 키워드당 요소가 4개를 초과할 수 없습니다. 저장만 가능합니다."
        );
      } else {
        dispatch({
          type: UPDATE_CHATBOT_REQUEST,
          data: mergedData,
        });
        setIsDeployed(true);

        setInfo("");
      }
    }
  }, [keywordObject, keywordCategory, info, history]);
  useEffect(() => {
    if (isUpdateSuccess) {
      alert("저장에 성공했습니다. 사이드바의 히스토리에서 확인 가능합니다.");
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
        <div
          className="info-platform"
          onClick={() =>
            alert(
              "우측 사이드바의 설정 페이지에서 연동 정보를 설정할 수 있습니다"
            )
          }
        >
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
          placeholder="저장 및 배포에 대한 정보를 입력하세요"
          value={info}
          onChange={(e) => onChangeInfo(e)}
        />
        <button className="save" onClick={() => updateChatbot()}>
          저장
        </button>
        <button className="deploy" onClick={deployChatbot}>
          배포
        </button>
      </div>
    </>
  );
};

export default BuilderInfo;
