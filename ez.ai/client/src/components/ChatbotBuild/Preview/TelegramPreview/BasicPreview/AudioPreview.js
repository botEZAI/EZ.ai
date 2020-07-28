import React, { useState, useEffect, useRef } from "react";

const AudioPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon,
}) => {
  const audioRef = useRef(null);
  const timeRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [currentPlayState, setCurrentPlayState] = useState(false);
  const timeDurationFunc = (duration) => {
    const durMin = (duration * .001) < 60 ? 0 : Math.floor((duration *.001) / 60);
    const durSec = Math.floor(duration * .001 - (durMin * 60));

    return `${durMin}:${durSec < 10 ? `0${durSec}` : durSec}`;
  }
  const timeUpdateFunc = (e) => {
    const time = e.target.currentTime; // 현재 카운트 되는 시간
    const totalTime = e.target.duration; // 비디오의 전체 재생 시간
    const minutes = time < 60 ? 0 : Math.floor(time / 60); 
    const seconds = Math.floor(time - (minutes * 60));
    const totalMin = totalTime < 60 ? 0 : Math.floor(totalTime / 60);  
    const totalSec = Math.floor(totalTime - (totalMin * 60));

    timeRef.current.innerHTML = `${minutes < 10 ?
      `0${minutes}` : minutes}:${seconds < 10 ?
      `0${seconds}` : seconds} / ${totalMin < 10 ?
      `0${totalMin}` : totalMin}:${totalSec < 10 ? 
      `0${totalSec}` : totalSec}`;

    if(currentPlayState && e.target.ended) {
      setCurrentPlayState(false);
      timeRef.current.innerHTML = `${totalMin}:${totalSec < 10 ? `0${totalSec}` : totalSec}`
    }
  }
  const clickHandler = () => {
    setCurrentPlayState(!currentPlayState); // 클릭 하면 현재 재생 상태가 바뀜
    
    if(audioRef.current !== null) { // 객체 null 예외처리
      if(!currentPlayState){ // 상태 변화 전 pause였으면
        audioRef.current.play();
      }
      else { // 상태 변화 전 play 였으면
        audioRef.current.pause();
      }
    }
  }

  useEffect(() => {
    const str = v.content != "" ?  v.content : "/오디오 없음";
    const words = str.split('/');
    setFileName(words[words.length-1]);

  }, [v.content]);

  return (
    <div className="main-preview">
      <div
        className={
          now === i
            ? "main-content audiobox-telegram now"
            : "main-content audiobox-telegram"
        }
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("audio");
        }}
      >
        <div className="audio-container">
          {currentPlayState && v.content !== "" 
          ? 
            <i className="fas fa-pause audio-icon-telegram" 
               onClick={clickHandler}></i>
          :
            <i className="fas fa-play audio-icon-telegram" 
               onClick={clickHandler}></i>
          }
          <div className="audio-content-telegram">
            <audio 
              ref={audioRef} 
              src={v.content} 
              onTimeUpdate={(e) => timeUpdateFunc(e)}
            />
            <div className="audio-name">
              {fileName}
            </div>
            <div className="audio-size" ref={timeRef}>
              {v.content !== "" && v.size !== null ? 
                timeDurationFunc(v.size)
              :
                "0:00"
              }
            </div>
          </div>
        </div>
      </div>
      <div
        className="tool-delete delete-audio"
        onClick={() => {
          onDelete(v.id);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default AudioPreview;
