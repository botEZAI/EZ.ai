import React, { useRef } from "react";
import axios from "axios";
import produce from "immer";

const AudioStatus = ({ setKeywordObject, keywordObject, now, index }) => {
  const audioRef = useRef();
  const onClickUploadAudio = () => {
    audioRef.current.click();
  };
  const onChangeAudio = (e) => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/audio/g)) {
      const audioFormData = new FormData();
      audioFormData.append("audio", e.target.files[0]);

      axios.post("/api/audio", audioFormData).then((res) => {
        console.log(res);
        setKeywordObject(
          produce(keywordObject, (draft) => {
            draft[index].contents[now].content = res.data.location;
            draft[index].contents[now].filepath = res.data.location;
          })
        );
      });
    } else return alert("오디오 파일이 아닙니다.");
  };
  return (
    <>
      <div className="status-audio upload">
        <div className="status-input status-upload">
          <div className="upload-preview">
            <div
              className="preview-screen upload-preview-screen cursor"
              onClick={onClickUploadAudio}
              title="로컬 오디오 업로드"
            >
              {keywordObject[index].contents[now].content || (
                  <i className="fas fa-upload"></i>
              )}
            </div>
            <input ref={audioRef} type="file" hidden onChange={onChangeAudio} />
          </div>
          <div className="caution">
            <p>파일 형식: WAV, MP3, M4A, AAC, OGG</p>
            <p>최대 파일 크기 : 150MB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioStatus;
