import React from "react";

const PlatformTabs = (props) => {
  return(
    <>
    {props.children.map(child => {
      return (
        <div
          key={child.props.label}
          className={props.activePlatformTab == "platform-"+child.props.label ? "activePreview " + child.props.label+"-btn": null}
          label={child.props.label}
          onClick={()=>props.onSelectPlatform(child.props.label)}
        >
          {child.props.children}
        </div>
      );
    })}
  </>
  );
}

export default PlatformTabs;