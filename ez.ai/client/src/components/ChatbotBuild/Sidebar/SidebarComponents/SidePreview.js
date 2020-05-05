import React from "react";

const SidePreview = (props) => {
  return(
    <>
      {props.activePlatformTab == "platform-kakao" ?
        <div>
          KAKAO
        </div>
        : null
      }
      {props.activePlatformTab == "platform-line" ?
        <div>
          LINE
        </div>
        : null
      }
      {props.activePlatformTab == "platform-facebook" ?
        <div>
          FACEBOOK
        </div>
        : null
      }
      {props.activePlatformTab == "platform-telegram" ?
        <div>
          TELEGRAM
        </div>
        : null
      }
    </>
  );
};

export default SidePreview;