import React, { useCallback, useState, useEffect } from "react";
import SidePreview from "./SidebarComponents/SidePreview";
import SideVersion from "./SidebarComponents/SideVersion";
import PlatformTabs from "./SidebarComponents/PlatformTabs";
import SidebarTab from "./SidebarTab";

import { useDispatch } from "react-redux";

import "./Sidebar.css";

const Sidebar = ({ setKeywordCategory, setKeywordObject, setNow, setClickedMainInput }) => {
  const [activeSideOverlay, setActiveSideOverlay] = useState("default");
  const [activeSideTab, setActiveSideTab] = useState("");
  const [activePlatformTab, setActivePlatformTab] = useState("platform-telegram");


  const onSelectPlatform = (label)=>{
    setActivePlatformTab("platform-"+label);
  }
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
              <div className="sidebar-title preview">메신저별 미리보기</div>
              <div className="platforms-category">
                <PlatformTabs activePlatformTab={activePlatformTab}
                              onSelectPlatform={onSelectPlatform}>
                  <div label="kakao"> Kakao</div>
                  <div label="line"> Line </div>
                  <div label="facebook"> Facebook </div>
                  <div label="telegram"> Telegram </div>
                </PlatformTabs>
              </div>
              <div className="sidebar-article" id="preview">
                <SidePreview activePlatformTab={activePlatformTab}/>
              </div>
            </>
          )}
          {activeSideTab === "history" && (
            <>
              <div className="sidebar-title history">버전 관리</div>
              <SideVersion
                  activeSideTab = {activeSideTab}
                  setKeywordObject = {setKeywordObject}
                  setKeywordCategory = {setKeywordCategory}
                  setNow={setNow}
                  setClickedMainInput={setClickedMainInput}
              />
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
