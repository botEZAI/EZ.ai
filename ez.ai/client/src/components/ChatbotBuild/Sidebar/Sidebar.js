import React, {useCallback, useState} from "react";
import MessageForAll from "./SidebarComponents/MessageForAll";
import SidebarPreview from "./SidebarPreview";


const Sidebar = () => {
  const [activeSidebar, setActiveSidebar] = useState("preview");

  
  return(
      <div className="sidebar" >
        <div className="sidebar-icons">
          <ul className="sidebar-icon" >
            <SidebarPreview>
              <li label="preview">tab1</li>
              <li label="all-message">전체메세지</li>
              <li label="tab3">tab3</li>
            </SidebarPreview>
          </ul>


          {activeSidebar === "preview" &&
        <div
          key="preview"
          className="active-content"

        >-------------------------@--------------ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd--------------
        </div>
      }
      {activeSidebar === "tab2" &&
        <div
          key="tab2"
          className="active-content"

        > -----------------★----------------★------------------
        </div>
      }
      {activeSidebar === "tab3" &&
        <div
          key="tab3"
          className="active-content"

        > -----------♥-----------♥---------♥------------------
        </div>
      }
        </div>
      </div>
  );
};

export default Sidebar;