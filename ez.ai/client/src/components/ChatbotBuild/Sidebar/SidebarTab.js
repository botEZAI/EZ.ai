import React, { useState } from "react";

const SidebarTab = props => {
  const onClickEventHandler = (label) => {
    if(props.activeSideTab === label){
      props.setActiveSideTab("");
      props.setActiveSideOverlay("close");
    }
    else{
      props.setActiveSideTab(label);
      props.setActiveSideOverlay("open");
    }
  }
  return (
    <>
      {props.children.map(child => {
        return (
          <li
            key={child.props.label}
            className={"sidebar-icon "+ (props.activeSideTab === child.props.label ? "active" : "wait")}
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

export default SidebarTab;



