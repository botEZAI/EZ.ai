import React from 'react'

const VideoPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete
}) => {
  return(
    <div 
      className={now == i ? "main-content main-videobox now"
                          : "main-content main-videobox"} 
      key={v.content + i}
      onClick={() => {
        setClickedMainInput(v);
        setNow(i);
      }}
    >
      {" "}
      <div className="main-video-content">
        <i className="fas fa-play fa-lg main-file-icon"></i>
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