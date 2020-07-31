import React, { useState, useRef } from 'react'


const VideoPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,

  onDelete,
  changeAvailableIcon
}) => {
  const video = useRef(null);
  const videoTime = useRef(null);
  const [currentPlayState, setCurrentPlayState] = useState(false);

  const timeUpdateFunc = (e) => {
    const time = e.target.currentTime; // 현재 카운트 되는 시간
    const totalTime = e.target.duration; // 비디오의 전체 재생 시간
    const minutes = time < 60 ? 0 : Math.floor(time / 60); 
    const seconds = Math.floor(time - (minutes * 60));
    const totalMin = totalTime < 60 ? 0 : Math.floor(totalTime / 60);  
    const totalSec = Math.floor(totalTime - (totalMin * 60));

    videoTime.current.innerHTML = `${minutes < 10 ?
      `0${minutes}` : minutes}:${seconds < 10 ?
      `0${seconds}` : seconds}`
  }
  const clickHandler = () => {
    setCurrentPlayState(!currentPlayState); // 클릭 하면 현재 재생 상태가 바뀜
    
    if(video.current !== null) { // 객체 null 예외처리
      if(!currentPlayState){ // 상태 변화 전 pause였으면
        video.current.play(); //오디오 플레이
      }
      else { // 상태 변화 전 play 였으면
        video.current.pause();
        video.current.controller=true;
      }
    }
  }
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
                <span ref={videoTime}>
                </span>
                <span>
                  <i class="fas fa-volume-mute fa-lg"    
                  ></i> 
                </span>
              </div>
              <div className="video-content-telegram">
                <video 
                  src={v.content} 
                  loop
                  autoplay="true"
                  muted
                  ref={video}
                  onTimeUpdate={(e) => timeUpdateFunc(e)}
                  onClick={clickHandler}
                >
                </video>
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