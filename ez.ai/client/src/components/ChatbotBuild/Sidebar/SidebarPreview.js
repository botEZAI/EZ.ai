import React, { useState } from "react";

const SidebarPreview = props => {
  const [activePrevTab, setActivePrevTab] = useState("");
  return (
    <>
      {props.children.map(child => {
        return (
          <li
            key={child.props.label}
            className={activePrevTab === child.props.label ? "active" : "sidebar-icon"}
            label={child.props.label}
            onClick={() => { setActivePrevTab(child.props.label);
                             props.setActiveSidebar(child.props.label)}}
          >
            {child.props.children}
          </li>
        );
      })}
    </>
  );
};

export default SidebarPreview;



