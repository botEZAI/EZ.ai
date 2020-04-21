import React, {useCallback, useState} from "react";
import MessageForAll from "./SidebarComponents/MessageForAll";
import SidebarPreview from "./SidebarPreview";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  return(
      <div className="sidebar">
        <ul>
          <SidebarPreview setActiveSidebar={setActiveSidebar}>
            <li label="preview"><i class="fas fa-desktop"></i></li>
            <li label="history"><i class="fas fa-history"></i></li>
            <li label="settings"><i class="fas fa-cog"></i></li>
          </SidebarPreview>
        </ul>
        <div className={activeSidebar === "preview"? "active-side":"side"}>
          미리보기 플랫폼별
        </div>
        <div className={activeSidebar === "history"? "active-side":"side"}>
          버전 관리 기능
        </div>
        <div className={activeSidebar === "settings"? "active-side":"side"}>
          프로젝트 설정 페이지
        </div>
      </div>
  );
};

export default Sidebar;