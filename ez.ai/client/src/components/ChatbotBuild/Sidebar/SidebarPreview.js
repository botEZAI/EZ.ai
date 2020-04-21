import React, { useState } from "react";

const SidebarPreview = props => {
  const [activePrevTab, setActivePrevTab] = useState("");

  const onClickEventHandler = (label) => {
    if(activePrevTab == label){
      setActivePrevTab("");
      props.setActiveSidebar("");
    }
    else{
      setActivePrevTab(label);
      props.setActiveSidebar(label);
    }
  }
  return (
    <>
      {props.children.map(child => {
        return (
          <li
            key={child.props.label}
            className={"sidebar-icon "+ (activePrevTab === child.props.label ? "active" : "wait")}
            label={child.props.label}
            onClick={() => onClickEventHandler(child.props.label) }
          >
            {child.props.children}
          </li>
        );
      })}
    </>
  );
};

export default SidebarPreview;



