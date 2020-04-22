import React, { useState } from "react";

const SidebarPreview = props => {
  const onClickEventHandler = (label) => {
    if(props.activeSideTab == label){
      props.setActiveSideTab("");
      props.setActiveSideOverlay(2);
    }
    else{
      props.setActiveSideTab(label);
      props.setActiveSideOverlay(1);
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

export default SidebarPreview;



