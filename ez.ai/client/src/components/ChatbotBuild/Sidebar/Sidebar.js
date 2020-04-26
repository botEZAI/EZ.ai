import React, {useCallback, useState} from "react";
import MessageForAll from "./SidebarComponents/MessageForAll";
import SidebarPreview from "./SidebarPreview";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeSideOverlay, setActiveSideOverlay] = useState(0);
  const [activeSideTab, setActiveSideTab] = useState("");
  return(
      <div className="sidebar">
          <ul>
              <SidebarPreview
                setActiveSideOverlay={setActiveSideOverlay}
                activeSideTab={activeSideTab}
                setActiveSideTab={setActiveSideTab}
              >
                <li label="preview"><i class="fas fa-desktop" tooltip="미리보기"></i></li>
                <li label="history"><i class="fas fa-history" tooltip="버전 관리"></i></li>
                <li label="settings"><i class="fas fa-cog" tooltip="설정"></i></li>
              </SidebarPreview>
          </ul>
          <div className={(activeSideOverlay == 1 ? "side-open" : activeSideOverlay == 2 ? "side-close" : "side-default")}>
              <div className="sidebar-section"> {/* 사이드바 컨텐츠는 이 안에! */}
              {activeSideTab == "preview" &&
                <>
                    <div className="sidebar-title preview">
                      미리보기 플랫폼별
                    </div>
                    <div className="sidebar-article">
                        <side_preview />
                    </div>
                </>
                    }
              {activeSideTab == "history" &&
                  <>
                      <div className="sidebar-title history">
                        버전 관리 기능
                        </div>
                      <div className="sidebar-article">
                          <side_version />
                      </div>
                  </>
              }
              {activeSideTab == "settings"  &&
                  <>
                    <div className="sidebar-title settings">
                      프로젝트 설정 페이지
                    </div>
                    <div className="sidebar-article">
                        <side_setting />
                    </div>
                  </>
              }
            </div>
          </div>
      </div>
  );
};

export default Sidebar;