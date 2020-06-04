import React from 'react'
import TextPreview from "./TextPreview";

const VideoPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,

  onDelete,
  changeAvailableIcon
}) => {
  return(
      <div className="main-preview">
        <div
          className={now === i ? "main-content videobox-telegram now"
                              : "main-content videobox-telegram"}
          key={v.content + i}
          onClick={() => {
            setClickedMainInput(v);
            setNow(i);
            changeAvailableIcon("video");
          }}
        >
          {" "}
          <div className="video-content-telegram">
            <i className="fas fa-play fa-lg file-icon-telegram"></i>
          </div>
        </div>
      <div
        className="tool-delete delete-video"
        onClick={() => {
          onDelete(v.id);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default VideoPreview;