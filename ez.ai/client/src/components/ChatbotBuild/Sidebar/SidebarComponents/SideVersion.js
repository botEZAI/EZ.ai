import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_HISTORY_REQUEST,
  RECOVER_HISTORY_REQUEST,
  REMOVE_HISTORY_REQUEST,
  RECOVER_HISTORY_SUCCESS_RESET,
} from "../../../../reducer/chatbot";
import "./SideVersion.css";

const SideVersion = ({
  activeSideTab,
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
  } = useSelector((state) => state.chatbot);

  useEffect(() => {
    currentChatbot &&
      dispatch({
        type: LOAD_HISTORY_REQUEST,
        data: currentChatbot,
      });
    console.log("current===", currentChatbot);
  }, [activeSideTab === "history", isUpdateSuccess]);
  useEffect(() => {
    if (isRecoverSuccess) {
      setKeywordObject(JSON.parse(currentChatbot.data));
      setKeywordCategory(currentCategories);
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
  const onDeleteHistory = useCallback(
    (history) => {
      if (history.info === "초기") alert("초기 버전은 삭제할 수 없습니다.");
      else {
        dispatch({
          type: REMOVE_HISTORY_REQUEST,
          data: { currentChatbot, history },
        });
      }
    },
    [history]
  );

  return (
    <div className="sidebar-article">
      <div className="sidebar-history-recent-list">
        <div className="sidebar-history-recent-title">
          <div className="sidebar-history-recent-title-text">
            최근 저장 목록
          </div>
          <div className="sidebar-history-recent-title-caution">
            최근 저장 목록은 최대 20개까지 저장됩니다.
          </div>
        </div>
        {history &&
          JSON.parse(history)
            .reverse()
            .map((v) => (
              <div className="sidebar-history-box">
                <div className="sidebar-history-contents">
                  <div className="sidebar-history-text"> {v.info}</div>
                  <div className="sidebar-history-time">
                    {v.createdAt.replace(/T/, " ").replace(/\..+/, "")}
                  </div>
                </div>
                <div className="sidebar-history-btns">
                  <div className="sidebar-history-btn sidebar-history-favorite">
                    <i className="far fa-star" alt="즐겨찾기"></i>
                  </div>
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
