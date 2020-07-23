import React, { useRef, useState } from "react";
import axios from "axios";
import produce from "immer";

/* Status screen 이미지 요소 */
const ImageStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index,
}) => {
  /*이미지 외부 URL 입력후 적용시 미리보기에 적용*/
  const imageRef = useRef();

  const [imageTab, setImageTab] = useState("url");
  const [imageURL, setImageURL] = useState("");

  const onClickLoadImage = (e) => {
    setImageURL(e.target.value);
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].content = e.target.value;
      })
    );
  };

  const onClickUploadImage = () => {
    imageRef.current.click();
  };
  const onChangeImage = (e) => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/image/g)) {
      const imageFormData = new FormData();
      imageFormData.append("image", e.target.files[0]);

      // 보안상 로컬경로는 fakepath로 뜨기 때문에 실제 파일이 업로드 된 후 업로드 된 실파일경로를 가져와야함

      axios.post("/api/image", imageFormData).then((res) => {
        console.log(res);
        setKeywordObject(
          produce(keywordObject, (draft) => {
            draft[index].contents[now].content = res.data.location;
            draft[index].contents[now].filepath = res.data.location;
          })
        );
      });
    } else return alert("이미지 파일이 아닙니다.");
  };

  return (
    <div className="image-status">
      <div className="status-image-tab">
        <div
          className={`image-tab-btn outer-img-link ${
            imageTab === "url" && "active"
          }`}
          onClick={() => setImageTab("url")}
        >
          외부 이미지 URL
        </div>
        <div
          className={`image-tab-btn upload-img-file ${
            imageTab === "local" && "active"
          }`}
          onClick={() => setImageTab("local")}
        >
          내장 이미지 첨부
        </div>
      </div>

      {imageTab === "url" ? (
        <div className="status-input status-upload">
          <div className="status-image-input">
            <input
              placeholder="외부 이미지 URL를 입력해주세요"
              value={currentContent || ""}
              onChange={onClickLoadImage}
            />
          </div>
          <div className="upload-preview">
            <div
              className="preview-screen"
            >
              {!imageURL ? (
                  <>
                    <p>외부 이미지 미리보기</p>
                    <p>(올바른 URL 주소일때 이미지가 보여집니다.)</p>
                </>
              ) : (
                  <img className="preview-screen-image" src={imageURL}/>
              )}
            </div>
          </div>
          <div className="caution">
            <p>파일형식 : JPG, JPEG, PNG, GIF</p>
          </div>
        </div>
      ) : (
        <div className="status-input status-upload">
          <div className="upload-preview">
            <div
              className="preview-screen upload-preview-screen cursor"
              onClick={onClickUploadImage}
              title = "로컬 이미지 업로드"
            >
              {keywordObject[index].contents[now].content === "" ? (
                  <>
                    <i className="fas fa-upload"></i>
                    <div className="preview-screen-description">파일 업로드</div>
                  </>
              ) : (<></>
                //<img className="preview-screen-image" src={imageURL}/>
                )}
            </div>
            <input ref={imageRef} type="file" hidden onChange={onChangeImage} />
          </div>
          <div className="caution">
            <p>파일형식 : JPG, JPEG, PNG, GIF</p>
            <p>최대 파일 크기 : 30MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageStatus;
