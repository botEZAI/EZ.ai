import React from 'react'
import TextPreview from "./TextPreview";
import whitePlay from '../../../../../objects/play-circle.png';

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
          {v.content != "" ?
            <div className="container">
              <div className="video-info">
                <span>00 : 00</span>
                <span>
                  <i class="fas fa-volume-mute fa-lg"></i>
                </span>
              </div>
              <div className="video-content-telegram">
                <video src={v.content} autoplay loop/>
              </div>
            </div>
           :
            <i className="fas fa-play-circle fa-lg video-icon-telegram"></i>
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