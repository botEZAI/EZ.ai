import React, {useCallback, useState} from "react";
import MessageForAll from "./SidebarComponents/MessageForAll";
import SidebarPreview from "./SidebarPreview";


const Sidebar = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  return(
    <div className = "sidebar">
      <ul>
        <SidebarPreview setActiveSidebar={setActiveSidebar}>
          <li label="preview">a</li>
          <li label="all-message">b</li>
          <li label="tab3">c</li>
        </SidebarPreview>
      </ul>
      <div className={activeSidebar === "preview"? "active-side":"side"}>
        aaa
      </div>
      <div className={activeSidebar === "all-message"? "active-side":"side"}>
        bbb
      </div>
      <div className={activeSidebar === "tab3"? "active-side":"side"}>
        ccc
      </div>
    </div>
  );
};

export default Sidebar;