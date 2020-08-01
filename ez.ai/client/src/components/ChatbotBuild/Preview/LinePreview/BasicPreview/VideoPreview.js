import React, { useState, useRef, useEffect } from 'react'
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
  const lineVideo = useRef(null);
  const [currentPlayState, setCurrentPlayState] = useState(false);

  const clickHandler = () => {
    setCurrentPlayState(!currentPlayState);

    if(lineVideo.current !== null) { // 객체 null 예외처리
      if(!currentPlayState){ // 상태 변화 전 pause였으면
        lineVideo.current.play(); //오디오 플레이
      }
      else { // 상태 변화 전 play 였으면
        lineVideo.current.pause();
      }
    }
  }

  useEffect(() => {
    setCurrentPlayState(false);
  }, [v.content]);
  
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
              {currentPlayState ?
                <div className="video-playstate-line">
                  <video src={v.content} muted autoPlay="true" controls="true" 
                         ref={lineVideo}
                         onPause={(e) => setCurrentPlayState(false)}
                  />
                </div>
              :
                <>
                  <div className="video-content-line">
                    <video src={v.content} ref={lineVideo}/>
                  </div>
                  <img className="video-play-icon" 
                       src={whitePlay}
                       onClick={clickHandler}>
                  </img>
                </>
              }
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