import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_HISTORY_REQUEST,
  RECOVER_HISTORY_REQUEST,
  REMOVE_HISTORY_REQUEST,
  RECOVER_HISTORY_SUCCESS_RESET,
  DEPLOY_HISTORY_REQUEST,
  DEPLOY_HISTORY_SUCCESS_RESET,
} from "../../../../reducer/chatbot";
import "./SideVersion.css";

const SideVersion = ({
  activeSideTab,
  setActivePlatformTab,
  setKeywordObject,
  setKeywordCategory,
  setNow,
  setClickedMainInput,
}) => {
  const dispatch = useDispatch();
  const {
    currentChatbot,
    history,
    currentCategories,
    isUpdateSuccess,
    isRecoverSuccess,
    isDeploySuccess,
  } = useSelector((state) => state.chatbot);
  const platformInfo =
    currentChatbot && JSON.parse(currentChatbot.platformInfo);
  useEffect(() => {
    currentChatbot &&
      dispatch({
        type: LOAD_HISTORY_REQUEST,
        data: currentChatbot,
      });
      setActivePlatformTab("platform-telegram");                                    
  }, [activeSideTab === "history", isUpdateSuccess, isDeploySuccess]);
  useEffect(() => {
    if (isRecoverSuccess) {
      setKeywordObject(JSON.parse(currentChatbot.data));
      setKeywordCategory(currentCategories);
      isRecoverSuccess && alert("불러오기 성공");
      dispatch({
        type: RECOVER_HISTORY_SUCCESS_RESET,
      });
    }
  }, [isRecoverSuccess]);

  //기록 복구
  const onRecoverHistory = useCallback(
    (history) => {
      setNow(-1);
      setClickedMainInput(false);
      dispatch({
        type: RECOVER_HISTORY_REQUEST,
        data: { currentChatbot, history },
      });
    },
    [history, currentChatbot]
  );
  //기록 삭제
  const onDeleteHistory = useCallback((history) => {
      if (window.confirm("정말로 해당 저장을 삭제하시겠습니까?\n한번 삭제후 되돌릴 수 없습니다.")) {
          if (history.info === "초기") alert("초기 버전은 삭제할 수 없습니다.");
          else {
            dispatch({
              type: REMOVE_HISTORY_REQUEST,
              data: { currentChatbot, history },
            });
          }
        }
      },
      [history]
  );
  //배포
  const onDeployHistory = useCallback(
    (history) => {
      if (
        platformInfo &&
        platformInfo[0].connect &&
        JSON.parse(history.data).find((v) => v.contents.length > 4)
      ) {
        return alert(
          "라인은 배포시 키워드당 요소가 4개를 초과할 수 없어 배포할 수 없습니다."
        );
      } else {
        dispatch({
          type: DEPLOY_HISTORY_REQUEST,
          data: { currentChatbot, history },
        });
      }
    },
    [history, isDeploySuccess]
  );
  useEffect(() => {
    if (isDeploySuccess) {
    }
    dispatch({
      type: DEPLOY_HISTORY_SUCCESS_RESET,
    });
  }, [isDeploySuccess]);

  return (
    <div className="sidebar-article">
      <div className="sidebar-history-recent-list">
        <div className="sidebar-history-recent-title">
          <div className="sidebar-history-recent-title-text">
            최근 저장 목록
          </div>
        </div>
        {history &&
          JSON.parse(history)
            .reverse()
            .map((v) => (

              <div
                className={`sidebar-history-box ${
                  v.deploy && `sidebar-history-deploy`
                }`}
              >
                <div className="sidebar-history-contents">
                  <div className="sidebar-history-text"> {v.info}</div>
                  <div className="sidebar-history-time">
                    {v.createdAt.replace(/T/, " ").replace(/\..+/, "")}
                  </div>
                </div>
                <div className="sidebar-history-btns">
                  {/* <div className="sidebar-history-btn sidebar-history-favorite"> */}
                  {/* <i className="far fa-star" alt="즐겨찾기"></i> */}
                  <button
                    className="sidebar-history-button sidebar-history-btn-deploy"
                    onClick={() => onDeployHistory(v)}
                  >
                    {!v.deploy ? "배포" : "현재 배포버전입니다"}
                  </button>
                  {/* </div> */}
                  <div className="sidebar-history-btn">
                    <button
                      className="sidebar-history-button sidebar-history-btn-load"
                      onClick={() => onRecoverHistory(v)}
                    >
                      불러오기
                    </button>
                    <button
                      className="sidebar-history-button sidebar-history-btn-delete"
                      onClick={() => onDeleteHistory(v)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SideVersion;
