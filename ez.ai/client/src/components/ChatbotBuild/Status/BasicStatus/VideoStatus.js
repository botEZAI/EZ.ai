import React, { useRef } from "react";
import axios from "axios";
import produce from "immer";

const VideoStatus = ({ setKeywordObject, keywordObject, now, index }) => {
  const videoRef = useRef();
  const onClickUploadVideo = () => {
    videoRef.current.click();
  };
  const onChangeVideo = (e) => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/video/g)) {
      const videoFormData = new FormData();
      videoFormData.append("video", e.target.files[0]);

      axios.post("/api/video", videoFormData).then((res) => {
        console.log(res);
        setKeywordObject(
          produce(keywordObject, (draft) => {
            draft[index].contents[now].content = res.data.location;
            draft[index].contents[now].filepath = res.data.location;
          })
        );
      });
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
              title="로컬 동영상 업로드"
            >
              {keywordObject[index].contents[now].content || (
                  <i className="fas fa-upload"></i>
              )}
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
