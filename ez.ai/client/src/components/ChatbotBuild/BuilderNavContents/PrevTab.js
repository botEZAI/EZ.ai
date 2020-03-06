import React, { useMemo } from "react";
import "./Preview.css";

const PrevTabs = props => {
  return (
    <>
      {props.children.map(child => {
        return (
          <li
            key={child.props.label}
            className={props.activePrevTab === child.props.label ? "active" : null}
            label={child.props.label}
            onClick={() => props.onSelectPrev(child.props.label)}
          >
            {child.props.children}
          </li>
        );
      })}
    </>
  );
};

export default PrevTabs;
