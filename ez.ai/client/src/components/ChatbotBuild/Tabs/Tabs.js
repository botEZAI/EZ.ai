import React, { useMemo } from "react";
import "./Tabs.css";

const Tabs = props => {
  return (
    <>
      {props.children.map(child => {
        return (
          <div
            key={child.props.label}
            className={props.activeTab === child.props.label ? "activeToolTab" : null}
            label={child.props.label}
            onClick={() => props.onSelect(child.props.label)}
          >
            {child.props.children}
          </div>
        );
      })}
    </>
  );
};

export default Tabs;
