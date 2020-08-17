import React, { useRef, useState } from "react";
import axios from "axios";
import produce from "immer";

const AudioStatus = ({ setKeywordObject, keywordObject, now, index }) => {
  const [audioName, setAudioName] = useState(null);
  const audioRef = useRef();
  const [uploading, setUploading] = useState(false);

  const onClickUploadAudio = () => {
    audioRef.current.click();
  };
  const onChangeAudio = async (e) => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/audio/g)) {
      if (e.target.files[0].size < 150000000) {
        setUploading(true);
        const audioFormData = new FormData();
        audioFormData.append("audio", e.target.files[0]);

        await axios.post("/api/audio", audioFormData).then((res) => {
          setAudioName(res.data.originalname);
          console.log(res);
          setKeywordObject(
            produce(keywordObject, (draft) => {
              draft[index].contents[now].content = res.data.location;
              draft[index].contents[now].filepath = res.data.location;
              draft[index].contents[now].size = res.data.size;
            })
          );
        });
        setUploading(false)
      } else {
        return alert("오디오의 크기는 최대 150mb를 초과할수 없습니다");
      }
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
              {uploading ? (
                  <p>파일 업로딩중...</p>
              ) : (audioName || (
                <>
                  <i className="fas fa-upload"></i>
                  <div className="preview-screen-description">파일 업로드</div>
                </>
              ))}
            </div>
            <input ref={audioRef} type="file" hidden onChange={onChangeAudio} />
          </div>
          <div className="caution">
            <p>파일 형식: MP3, M4A</p>
            <p>최대 파일 크기 : 150MB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioStatus;
