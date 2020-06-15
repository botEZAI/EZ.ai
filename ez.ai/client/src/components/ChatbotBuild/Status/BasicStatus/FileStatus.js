import React, { useRef } from "react";
import axios from "axios";
import produce from "immer";

const FileStatus = ({ setKeywordObject, keywordObject, now, index }) => {
  const fileRef = useRef();
  const onClickUploadFile = () => {
    fileRef.current.click();
  };
  const onChangeFile = (e) => {
    if (e.target.value === "") return;

    const fileFormData = new FormData();
    fileFormData.append("file", e.target.files[0]);

    axios.post("/api/file", fileFormData).then((res) => {
      console.log(res);
      setKeywordObject(
        produce(keywordObject, (draft) => {
          draft[index].contents[now].content = res.data.location;
          draft[index].contents[now].filepath = res.data.location;
        })
      );
    });
  };
  return (
    <>
      <div className="status-file upload">
        <div className="status-input status-upload">
          <div className="upload-preview">
            <div
              className="preview-screen upload-preview-screen cursor"
              onClick={onClickUploadFile}
              title="로컬 파일 업로드"
            >
              {keywordObject[index].contents[now].content || (
                  <i className="fas fa-upload"></i>
              )}
            </div>
            <input ref={fileRef} type="file" hidden onChange={onChangeFile} />
          </div>
          <div className="caution">
            <p>파일 형식: HWP, EXCEL ,PPT, WORD, ZIP 등</p>
            <p>최대 파일 크기 : 50MB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileStatus;
