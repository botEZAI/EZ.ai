import React, { useCallback, useState, useEffect } from "react";
import MessageForAll from "./SidebarComponents/MessageForAll";
import SidebarTab from "./SidebarTab";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_HISTORY_REQUEST,
  RECOVER_HISTORY_REQUEST,
  REMOVE_HISTORY_REQUEST,
} from "../../../reducer/chatbot";
import "./Sidebar.css";

const Sidebar = ({ setKeywordCategory, setKeywordObject }) => {
  const dispatch = useDispatch();
  const {
    currentChatbot,
    history,
    currentCategories,
    isUpdateSuccess,
  } = useSelector((state) => state.chatbot);
  const [activeSideOverlay, setActiveSideOverlay] = useState("default");
  const [activeSideTab, setActiveSideTab] = useState("");

  useEffect(() => {
    currentChatbot &&
      dispatch({
        type: LOAD_HISTORY_REQUEST,
        data: currentChatbot,
      });
  }, [activeSideTab === "history", isUpdateSuccess]);
  useEffect(() => {
    const chatbotData = currentChatbot && JSON.parse(currentChatbot.data);
    chatbotData && setKeywordObject(chatbotData);
    const categoriesData = currentCategories && currentCategories;
    categoriesData && setKeywordCategory(categoriesData);
  }, [currentChatbot]);

  //기록 복구
  const onRecoverHistory = useCallback(
    (history) => {
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
    <div className="sidebar">
      <ul>
        <SidebarTab
          setActiveSideOverlay={setActiveSideOverlay}
          activeSideTab={activeSideTab}
          setActiveSideTab={setActiveSideTab}
        >
          <li label="preview">
            <i class="fas fa-desktop" tooltip="미리보기"></i>
          </li>
          <li label="history">
            <i class="fas fa-history" tooltip="버전 관리"></i>
          </li>
          <li label="settings">
            <i class="fas fa-cog" tooltip="설정"></i>
          </li>
        </SidebarTab>
      </ul>
      <div
        className={
          activeSideOverlay === "open"
            ? "side-open"
            : activeSideOverlay === "close"
            ? "side-close"
            : "side-default"
        }
      >
        <div className="sidebar-section">
          {" "}
          {/* 사이드바 컨텐츠는 이 안에! */}
          {activeSideTab === "preview" && (
            <>
              <div className="sidebar-title preview">미리보기 플랫폼별</div>
              <div className="sidebar-article">
                <side_preview />
              </div>
            </>
          )}
          {activeSideTab === "history" && (
            <>
              <div className="sidebar-title history">버전 관리 기능</div>
              <div className="sidebar-article">
                {history &&
                  JSON.parse(history)
                    .reverse()
                    .map((v) => (
                      <div className="sidebar-history-box">
                        <div>
                          {" "}
                          {v.info}
                          <button
                            className="sidebar-history-button"
                            onClick={() => onDeleteHistory(v)}
                          >
                            삭제
                          </button>
                          <button
                            className="sidebar-history-button"
                            onClick={() => onRecoverHistory(v)}
                          >
                            불러오기
                          </button>
                        </div>
                        <div>
                          {v.createdAt.replace(/T/, " ").replace(/\..+/, "")}
                        </div>
                      </div>
                    ))}
              </div>
            </>
          )}
          {activeSideTab === "settings" && (
            <>
              <div className="sidebar-title settings">프로젝트 설정 페이지</div>
              <div className="sidebar-article">
                <side_setting />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
