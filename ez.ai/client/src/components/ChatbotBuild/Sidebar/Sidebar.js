import React from "react";
import MessageForAll from "./SidebarComponents/MessageForAll";


const Sidebar = props => {
  return(
    <>
      {props.children.map(child => {
        return(
          <div
            key={child.props.label}
            className={props.activePrevTab === child.props.label ? "active-content" : "sidebar-icon" }
            label={child.props.label}
            style={props.style}
          >
            {child.props.children}
          </div>
        );
      })}
      {/* {props.activePrevTab === "preview" &&
        <div 
          key="preview"
          className="active-content"
          stlye={props.style}
        >-------------------------@--------------ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd--------------
        </div>
      }
      {props.activePrevTab === "tab2" &&
        <div
          key="tab2"
          className="active-content"
          style={props.style}
        > -----------------★----------------★------------------
        </div>
      }
      {props.activePrevTab === "tab3" &&
        <div
          key="tab3"
          className="active-content"
          style={props.style}
        > -----------♥-----------♥---------♥------------------
        </div>
      } */}
    </>
  );
};

export default Sidebar;