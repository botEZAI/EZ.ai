import React from 'react'

const VideoPreview = ({
  v,
  i,
  setClickedMainInput,
  setNow,
  onDelete
}) => {
  return(
    <div className="main-content main-videobox" key={v.content + i}>
      {" "}
      <div
        className="main-video-content"
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
        }}
      >
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