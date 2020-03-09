import React, { useRef } from "react";
import axios from "axios";
import produce from "immer";

const VideoStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index
}) => {
  const videoRef = useRef();
  const onClickUploadVideo = () => {
    videoRef.current.click();
  };
  const onChangeVideo = e => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/video/g)) {
      setKeywordObject(
        produce(keywordObject, draft => {
          draft[index].contents[now].content = e.target.files[0].name;
        })
      );
      const videoFormData = new FormData();
      videoFormData.append("video", e.target.files[0]);

      axios.post("/api/video", videoFormData);
    } else return alert("비디오 파일이 아닙니다.");
  };
  return (
    <>
      <div className="status-video upload">
        <div className="status-input status-upload">
          <div className="upload-preview">
            <div
              className="preview-screen upload-preview-screen cursor"
              onClick={onClickUploadVideo}
            >
              <p>로컬에서 동영상 불러오기</p>
            </div>
            <input ref={videoRef} type="file" hidden onChange={onChangeVideo} />
          </div>
          <div className="caution">
            <p>파일 형식: MP4, M4V, MOV, AVI, WMV</p>
            <p>최대 파일 크기 : 200MB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoStatus;
