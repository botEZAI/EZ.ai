import React from "react";
import './SidePreview.css';
const SidePreview = (props) => {
  return(
    <>
      {props.activePlatformTab == "platform-kakao" ?
        <div className="preview-container side-kakao">
          <div className="preview-header">

          </div>
          <div className="preview-contents">

          </div>
          <div className="preview-footer">
           <div class="preview-input">
              <input type="text" placeholder="Say Something"/>
              {/* <span><i class="far fa-smile"></i></span>*/}
            </div>
          </div>
        </div>
        : null
      }
      {props.activePlatformTab == "platform-line" ?
        <div className="preview-container side-line">
          <div className="preview-header">

          </div>
          <div className="preview-contents">

          </div>
          <div className="preview-footer">
            <div class="preview-input">
              <input type="text" placeholder="Say Something"/>
              {/* <span><i class="far fa-smile"></i></span>*/}
            </div>
          </div>
        </div>
        : null
      }
      {props.activePlatformTab == "platform-facebook" ?
        <div className="preview-container side-facebook">
          <div className="preview-header">

          </div>
          <div className="preview-contents">

          </div>
          <div className="preview-footer">
            <div class="preview-input">
              <input type="text" placeholder="Say Something"/>
              {/* <span><i class="far fa-smile"></i></span>*/}
            </div>
          </div>
        </div>
        : null
      }
      {props.activePlatformTab == "platform-telegram" ?
        <div className="preview-container side-telegram">
          <div className="preview-header">

          </div>
          <div className="preview-contents">
          </div>

          <div className="preview-footer">
            {/* <div><i class="fas fa-paperclip"></i></div> */}
            <div class="preview-input">
              <input type="text" placeholder="Say Something"/>
              {/* <span><i class="far fa-smile"></i></span>*/}
            </div>
            
          </div>
        </div>
        : null
      }
    </>
  );
};

export default SidePreview;