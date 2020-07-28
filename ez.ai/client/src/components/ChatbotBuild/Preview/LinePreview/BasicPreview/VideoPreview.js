import React from 'react'
import whitePlay from '../../../../../objects/play-circle.png';
import blackPlay from "../../../../../objects/play-circle-black.png";

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
          className={now === i ? "main-content videobox-line now"
                              : "main-content videobox-line"}
          key={v.content + i}
          onClick={() => {
            setClickedMainInput(v);
            setNow(i);
            changeAvailableIcon("video");
          }}
        >
          {v.content != "" ?
            <>
              <div className="video-content-line">
                <video src={v.content} autoplay loop/>
              </div>
              <img className="video-play-icon" src={whitePlay}></img>
            </>
            :
            <img className="video-default-icon" src={blackPlay}></img>
          }
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