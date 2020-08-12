import React, { useState, useRef } from "react";

const AudioPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon,
  platformInfo,
}) => {
  const lineAudio = useRef(null);
  const lineAudioTime = useRef(null);
  const [playState, setPlayState] = useState(false);

  const clickHandler = () => {
    setPlayState(!playState);
    if (lineAudio.current !== null) {
      if (!playState) {
        lineAudio.current.play();
      } else {
        lineAudio.current.pause();
      }
    }
  };

  const showDuration = (duration) => {
    const durMin =
      duration * 0.001 < 60 ? 0 : Math.floor((duration * 0.001) / 60);
    const durSec = Math.floor(duration * 0.001 - durMin * 60);

    return `${durMin}:${durSec < 10 ? `0${durSec}` : durSec}`;
  };

  const countDownFunc = (e) => {
    const time = e.target.currentTime; // 현재 카운트 되는 시간
    const totalTime = e.target.duration; // 비디오의 전체 재생 시간
    const minutes = time < 60 ? 0 : Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const totalMin = totalTime < 60 ? 0 : Math.floor(totalTime / 60);
    const totalSec = Math.floor(totalTime - totalMin * 60);
    const showMin =
      totalSec < seconds ? totalMin - (minutes + 1) : totalMin - minutes;
    const showSec =
      totalSec < seconds ? totalSec + 60 - seconds : totalSec - seconds;

    lineAudioTime.current.innerHTML = `${showMin}:${
      showSec < 10 ? `0${showSec}` : showSec
    }`;
    if (playState && e.target.ended) {
      setPlayState(false);
      lineAudioTime.current.innerHTML = `${totalMin}:${
        totalSec < 10 ? `0${totalSec}` : totalSec
      }`;
    }
  };

  return (
    <div
      className={`main-preview ${
        platformInfo[0].connect && i >= 4 ? `lineLimit` : ``
      }`}
    >
      <div
        className={
          now === i
            ? "main-content audiobox-line now"
            : "main-content audiobox-line"
        }
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("audio");
        }}
      >
        {playState && v.content !== "" ? (
          <i
            className="fas fa-pause-circle fa-lg audio-icon-line"
            onClick={clickHandler}
          ></i>
        ) : (
          <i
            className="fas fa-play-circle fa-lg audio-icon-line"
            onClick={clickHandler}
          ></i>
        )}

        <div className="audio-contents-line">
          <audio
            ref={lineAudio}
            src={v.content}
            onTimeUpdate={(e) => countDownFunc(e)}
          />
          <div className="audio-name" ref={lineAudioTime}>
            {v.content !== "" && v.size !== null
              ? showDuration(v.size)
              : "0:00"}
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
