import React, { useState, useRef } from "react";
import produce from "immer";
import GoogleMapPresenter from "./GoogleMapPresenter";
import axios from "axios";
import KeywordPopUp from "./KeywordPopUp";


const ToolStatus = ({
  mainKeyword,
  keywordObject,
  setKeywordObject,
  clickedMainInput,
  now,
  index,
}) => {
  const clickedIndex =
      keywordObject[index] &&
      keywordObject[index].contents.findIndex(v => v.id === clickedMainInput.id);

  const currentInput =
      keywordObject[index] && keywordObject[index].contents[now];
  const currentContent =
    keywordObject[index] &&
    keywordObject[index].contents[now] &&
    keywordObject[index].contents[now].content;

  /*이미지 외부 URL 입력후 적용시 미리보기에 적용*/
  const imageRef = useRef();
  const fileRef = useRef();
  const [imageURL, setImageURL] = useState("");
  const [imageTab, setImageTab] = useState("url");
  const [imageSrc, setImageSrc] = useState("");

  const onClickLoadImage = e => {
    setImageURL(e.target.value);
    setKeywordObject(
        produce(keywordObject, draft => {
            draft[index].contents[now].content = e.target.value;
        })
    );
  };

  const onClickUploadImage = () => {
      imageRef.current.click();
  };
  const onChangeImage = e => {
      if (e.target.value === "") return;
      if (e.target.files[0].type.match(/image/g)) {
          setKeywordObject(
              produce(keywordObject, draft => {
                  draft[index].contents[now].content = e.target.files[0].name;
              })
          );
          console.log(e.target.value);
          const imageFormData = new FormData();
          imageFormData.append("image", e.target.files[0]);

          axios.post("/api/image", imageFormData);
      } else return alert("이미지 파일이 아닙니다.");
  };

  const showKeywordPopUp = (e) => {
      console.log("works")
      return <KeywordPopUp/>
  }

  return (
    <>
      <div className="tool-status-header">
        <div className="tool-status-name">

          {currentInput ? (
              currentInput.type === "text" || clickedMainInput.type === "text" ? (
              <>
                <span>텍스트</span>
              </>
              ) : currentInput.type === "image" || clickedMainInput.type === "image" ? (
              <>
                <span>이미지</span>
              </>
              ) : currentInput.type === "video" ||
              clickedMainInput.type === "video" ? (
                  <>
                      <span>비디오</span>
                  </>
              ) : currentInput.type === "audio" ||
              clickedMainInput.type === "audio" ? (
                  <>
                      <span>오디오</span>
                  </>
              ) : currentInput.type === "location" ||
              clickedMainInput.type === "location" ? (
              <>
                <span>위치</span>
              </>
              ) : currentInput.type === "file" ||
              clickedMainInput.type === "file" ? (
                  <>
                      <span>파일</span>
                  </>
              ) : currentInput.type === "list" ||
              clickedMainInput.type === "list" ? (
              <>
                <span>버튼형 리스트</span>
              </>
              ) : currentInput.type === "sticker" ||
              clickedMainInput.type === "sticker" ? (
                  <>
                      <span>스티커</span>
                  </>
              ) : null
          ) : null}
        </div>
        <div className="help" alt="도움말">
          ?
        </div>
      </div>

      <div className="tool-status-main">
          {(clickedMainInput.type || (!clickedMainInput.type && currentInput)) &&
          (currentInput.type === "text" || clickedMainInput.type === "text" ? (
              <div className="status-input status-text">
              <textarea
                  placeholder="작성하고자 하는 텍스트를 적어주세요"
                  value={currentContent || ""}
                  onChange={e => {
                      setKeywordObject(
                          produce(keywordObject, draft => {
                              draft[index].contents[now].content = e.target.value;
                          })
                      );
                  }}
              />
              </div>
          ) : currentInput.type === "image" ||
          clickedMainInput.type === "image" ? (
            <div className="image-status">
              <div className="status-image-tab">
                <div
                  className={`image-tab-btn outer-img-link ${imageTab ===
                    "url" && "active"}`}
                  onClick={() => setImageTab("url")}
                >
                  외부 이미지 URL
                </div>
                <div
                  className={`image-tab-btn upload-img-file ${imageTab ===
                    "local" && "active"}`}
                  onClick={() => setImageTab("local")}
                >
                  이미지 첨부하기
                </div>
              </div>

              {imageTab === "url" ? (
                <div className="status-input status-upload">
                  <div className="status-image-input">
                    <input
                      placeholder="외부 URL를 입력해주세요"
                      value={currentContent || ""}
                      onChange={onClickLoadImage}
                    />
                    <div className="outer-img-btn" onChange={onClickLoadImage}>
                      적용
                    </div>
                  </div>
                  <div className="upload-preview" >
                    <div
                      className="preview-screen" style={{ backgroundImage: `url(${imageURL})` }}
                    ><p>외부 이미지 미리보기<br />(올바른 주소일때 이미지가 출력됩니다)</p></div>
                  </div>
                  <div className = "caution">
                    <p>파일형식 : JPG, JPEG, PNG, GIF</p>
                  </div>
                </div>
              ) : (
                <div className="status-input status-upload">
                  <div className="upload-preview">
                    <div
                      className="preview-screen upload-preview-screen cursor"
                      onClick={onClickUploadImage}
                    ><p>로컬에서 이미지 불러오기</p></div>
                    <input
                        ref={imageRef}
                        type="file"
                        hidden
                        onChange={onChangeImage}
                    />
                  </div>
                  <div className = "caution">
                    <p>파일형식 : JPG, JPEG, PNG, GIF</p>
                    <p>최대 파일 크기 : 30MB</p>
                  </div>
                </div>
              )}
            </div>
          ) : currentInput.type === "video" || clickedMainInput.type === "video" ? (
            <>
              <div className="status-video upload">
                <div className="status-input status-upload">
                  <div className="upload-preview">
                    <div
                        className="preview-screen upload-preview-screen cursor"
                        /*onClick={onClickUploadImage}*/
                    ><p>로컬에서 동영상 불러오기</p></div>

                    {/* 이미지 양식이므로 동영상 양식으로 바꿔야합니다
                    <input
                        ref={imageRef}
                        type="file"
                        hidden
                        onChange={onChangeImage}
                    />*/}

                  </div>
                  <div className = "caution">
                    <p>파일 형식: MP4, M4V, MOV, AVI, WMV</p>
                    <p>최대 파일 크기 : 200MB</p>
                  </div>
                </div>
              </div>
            </>
          ) : currentInput.type === "audio" ||
          clickedMainInput.type === "audio" ? (
              <>
                  <div className="status-audio upload">
                      <div className="status-input status-upload">
                          <div className="upload-preview">
                              <div
                                  className="upload-preview-screen cursor"
                                  /*onClick={onClickUploadImage}*/
                              >
                                  <p>로컬에서 오디오 불러오기</p>
                              </div>

                      {/* 이미지 양식이므로 오디오 양식으로 바꿔야합니다
                    <input
                        ref={imageRef}
                        type="file"
                        hidden
                        onChange={onChangeImage}
                    />*/}

                    </div>
                    <div className = "caution">
                      <p>파일 형식: WAV, MP3, M4A, AAC, OGG</p>
                      <p>최대 파일 크기 : 150MB</p>
                    </div>
                  </div>
                </div>
              </>
          ) : currentInput.type === "location" || clickedMainInput.type === "location" ? (
            <>
              <div className="status-input status-location">
                <p>임시 - 추후 지도 API로 연동</p>
                <input
                  placeholder="장소 이름을 적어주세요"
                  value={currentContent.title || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[now].content.title =
                          e.target.value;
                      })
                    );
                  }}
                />
                <input
                  placeholder="latitude(위도)"
                  value={currentContent.latitude || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[now].content.latitude =
                          e.target.value;
                      })
                    );
                  }}
                />
                <input
                  placeholder="longtitude(경도)"
                  value={currentContent.longtitude || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[now].content.longtitude =
                          e.target.value;
                      })
                    );
                  }}
                />
              </div>
              <GoogleMapPresenter />;
            </>
          ) : currentInput.type === "file" || clickedMainInput.type === "file"? (
              <>
                <div className="status-file upload">
                  <div className="status-input status-upload">
                    <div className="upload-preview">
                      <div
                          className="preview-screen upload-preview-screen cursor"
                          /*onClick={onClickUploadImage}*/
                      ><p>로컬에서 파일 불러오기</p></div>

                      {/* 이미지 양식이므로 파일 양식으로 바꿔야합니다
                    <input
                        ref={imageRef}
                        type="file"
                        hidden
                        onChange={onChangeImage}
                    />*/}

                    </div>
                    <div className = "caution">
                      <p>파일 형식: HWP, EXCEL ,PPT, WORD, ZIP 등</p>
                      <p>최대 파일 크기 : 50MB</p>
                    </div>
                  </div>
                </div>
              </>
          ) : currentInput.type === "list" || clickedMainInput.type === "list"? (
            <>
              <div className="status-input status-list">
                <textarea
                  placeholder="작성하고자 하는 텍스트를 적어주세요"
                  value={currentContent.question || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[now].content.question =
                          e.target.value;
                      })
                    );
                  }}
                ></textarea>
                <table>
                  <tr>
                    <div className = "status-list-content">
                      <input
                        placeholder="키워드명을 적어주세요"
                        value={currentContent.elem[0] || ""}

                        onChange={e => {
                          setKeywordObject(
                            produce(keywordObject, draft => {
                              draft[index].contents[now].content.elem[0] =
                                e.target.value;
                            })
                          );
                        }}
                      />
                      <div
                          className = "list-keyword-btn"
                          onClick = {showKeywordPopUp}
                      >키워드 연동</div>
                    </div>
                    <div className = "status-list-content">
                      <input
                        placeholder="키워드명을 적어주세요"
                        value={currentContent.elem[1] || ""}
                        onChange={e => {
                          setKeywordObject(
                            produce(keywordObject, draft => {
                              draft[index].contents[now].content.elem[1] =
                                e.target.value;
                            })
                          );
                        }}
                      />
                      <div className = "list-keyword-btn">키워드 연동</div>
                    </div>
                  </tr>
                  <tr>
                    <div className = "status-list-content">
                      <input
                        placeholder="키워드명을 적어주세요"
                        value={currentContent.elem[2] || ""}
                        onChange={e => {
                          setKeywordObject(
                            produce(keywordObject, draft => {
                              draft[index].contents[now].content.elem[2] =
                                e.target.value;
                            })
                          );
                        }}
                      />
                      <div className = "list-keyword-btn">키워드 연동</div>
                    </div>
                    <div className = "status-list-content">
                      <input
                        placeholder="키워드명을 적어주세요"
                        value={currentContent.elem[3] || ""}
                        onChange={e => {
                          setKeywordObject(
                            produce(keywordObject, draft => {
                              draft[index].contents[now].content.elem[3] =
                                e.target.value;
                            })
                          );
                        }}
                      />
                      <div className = "list-keyword-btn">키워드 연동</div>
                    </div>
                  </tr>
                  <tr>
                    <div className = "status-list-content">
                      <input
                        placeholder="키워드명을 적어주세요"
                        value={currentContent.elem[4] || ""}
                        onChange={e => {
                          setKeywordObject(
                            produce(keywordObject, draft => {
                              draft[index].contents[now].content.elem[4] =
                                e.target.value;
                            })
                          );
                        }}
                      />
                      <div className = "list-keyword-btn">키워드 연동</div>
                    </div>
                    <div className = "status-list-content">
                      <input
                        placeholder="키워드명을 적어주세요"
                        value={currentContent.elem[5] || ""}
                        onChange={e => {
                          setKeywordObject(
                            produce(keywordObject, draft => {
                              draft[index].contents[now].content.elem[5] =
                                e.target.value;
                            })
                          );
                        }}
                      />
                      <div className = "list-keyword-btn">키워드 연동</div>
                    </div>
                  </tr>
                </table>
              </div>
            </>
          ) : currentInput.type === "sticker" || clickedMainInput.type === "sticker" ? (
              <>
                <div>
                  <p>스티커는 추후 텔레그램 스티커 api와 연결</p></div>
              </>
          ): null)}


      </div>
      <div className="tool-status-nav">
        <div className="tool-status-extra">  {/* type에 따라 추가적인 기능 버튼 보여주는 영역 */}
            {currentInput ? (
                (currentInput.type === "text" || clickedMainInput.type === "text") ? (
                    <>
                      <div className = "extra-btn user-name">사용자명</div>
                      <div className = "extra-btn emoji">이모지</div>
                     </>
                ): null
                ) : null
            }
        </div>
        <div className="tool-status-nav-btns">
          <div className="tool-status-btn confirm">확인</div>
          <div className="tool-status-btn decline">삭제</div>
        </div>
      </div>
    </>
  );
};

export default ToolStatus;
