import React, { useState } from "react";
import produce from "immer";
import GoogleMapPresenter from "./GoogleMapPresenter";

const ToolStatus = ({
  mainKeyword,
  keywordObject,
  setKeywordObject,
  clickedMainInput
}) => {
  const index = keywordObject.findIndex(v => v.keyword === mainKeyword);
  const length = keywordObject[index] && keywordObject[index].contents.length;
  const currentInput =
    keywordObject[index] && keywordObject[index].contents[length - 1];
  const currentContent =
    keywordObject[index] &&
    keywordObject[index].contents[length - 1] &&
    keywordObject[index].contents[length - 1].content;
  const clickedIndex =
    keywordObject[index] &&
    keywordObject[index].contents.findIndex(v => v.id === clickedMainInput.id);
  console.log(
    "clicked=",
    keywordObject[index] &&
      keywordObject[index].contents[clickedIndex] &&
      keywordObject[index].contents[clickedIndex].content
  );

  /*이미지 외부 URL 입력후 적용시 미리보기에 적용*/
  const [imageURL, setImageURL] = useState("");

  const imagePreviewStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: "100% 100%",
    minWidth: "50%",
    minHeight: "80%"
  };

  const onClickLoadImage = imagePreviewStyle => {
    setImageURL(keywordObject[index].contents[length - 1].content);
  };

  return (
    <>
      <div className="tool-status-header">
        <div className="tool-status-name">
          {currentInput && !clickedMainInput.content ? (
            currentInput.type === "text" ? (
              <>
                <span>텍스트</span>
              </>
            ) : currentInput.type === "image" ? (
              <>
                <span>이미지</span>
              </>
            ) : currentInput.type === "location" ? (
              <>
                <span>위치</span>
              </>
            ) : currentInput.type === "list" ? (
              <>
                <span>버튼형 리스트</span>
              </>
            ) : null
          ) : clickedMainInput.type === "text" ? (
            <>
              <span>텍스트</span>
            </>
          ) : clickedMainInput.type === "image" ? (
            <>
              <span>이미지</span>
            </>
          ) : clickedMainInput.type === "location" ? (
            <>
              <span>위치</span>
            </>
          ) : clickedMainInput.type === "list" ? (
            <>
              <span>버튼형 리스트</span>
            </>
          ) : null}
        </div>
        <div className="help" alt="도움말">
          ?
        </div>
      </div>

      <div className="tool-status-main">
        {!clickedMainInput &&
          currentInput &&
          (currentInput.type === "text" ? (
            <>
              <div className="status-input status-text">
                <textarea
                  placeholder="작성하고자 하는 텍스트를 적어주세요"
                  value={currentContent || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[length - 1].content =
                          e.target.value;
                      })
                    );
                  }}
                />
              </div>
            </>
          ) : currentInput.type === "image" ? (
            <div className="image-status">
              <div className="status-image-tab">
                <div className="image-tab-btn outer-img-link">
                  외부 이미지 URL
                </div>
                <div className="image-tab-btn upload-img-file">
                  이미지 첨부하기
                </div>
              </div>

              <div className="status-input status-image">
                <div className="status-image-input">
                  <input
                    placeholder="외부 URL를 입력해주세요"
                    value={currentContent || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          draft[index].contents[length - 1].content =
                            e.target.value;
                        })
                      );
                    }}
                  />
                  <div className="outer-img-btn" onClick={onClickLoadImage}>
                    적용
                  </div>
                </div>
                <div className="image-preview">
                  <div
                    className="image-preview-screen"
                    style={imagePreviewStyle}
                  >
                  </div>
                </div>
              </div>
            </div>
          ) : currentInput.type === "location" ? (
            <>
              <div className="status-input status-location">
                <p>임시 - 추후 지도 API로 연동</p>
                <input
                  placeholder="장소 이름을 적어주세요"
                  value={currentContent.title || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[length - 1].content.title =
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
                        draft[index].contents[length - 1].content.latitude =
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
                        draft[index].contents[length - 1].content.longtitude =
                          e.target.value;
                      })
                    );
                  }}
                />
              </div>
              <GoogleMapPresenter />;
            </>
          ) : currentInput.type === "list" ? (
            <>
              <div className="status-input status-list">
                <textarea
                    placeholder="작성하고자 하는 텍스트를 적어주세요"
                    value={currentContent.question || ""}
                    onChange = {e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          draft[index].contents[length - 1].content.question = e.target.value;
                        })
                      )
                    }}
                ></textarea>
                <table>

                  <tr>
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={currentContent.elem[0] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.elem[0] =
                              e.target.value;
                          })
                        );
                      }}
                    />

                    <input
                      placeholder="키워드명을 적어주세요"
                      value={currentContent.elem[1] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.elem[1] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={currentContent.elem[2] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.elem[2] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={currentContent.elem[3] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.elem[3] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={currentContent.elem[4] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.elem[4] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={currentContent.elem[5] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.elem[5] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                </table>
              </div>
            </>
          ) : null)}
        {clickedMainInput.type &&
          (clickedMainInput.type === "text" ? (
            <>
              <div className="status-input status-text">
                <textarea
                  placeholder="작성하고자 하는 텍스트를 적어주세요"
                  value={
                    keywordObject[index].contents[clickedIndex].content || ""
                  }
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[clickedIndex].content =
                          e.target.value;
                      })
                    );
                  }}
                />
              </div>
            </>
          ) : clickedMainInput.type === "image" ? (
            <div className="image-status">
              <div className="status-image-tab">
                <div className="image-tab-btn outer-img-link">
                  외부 이미지 URL
                </div>
                <div className="image-tab-btn upload-img-file">
                  이미지 첨부하기
                </div>
              </div>

              <div className="status-input status-image">
                <div className="status-image-input">
                  <input
                    placeholder="외부 URL를 입력해주세요"
                    value={
                      keywordObject[index].contents[clickedIndex].content || ""
                    }
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          draft[index].contents[clickedIndex].content =
                            e.target.value;
                        })
                      );
                    }}
                  />
                  <div className="outer-img-btn">적용</div>
                </div>
                <div className="image-preview">
                  <div className="image-preview-screen">이미지 미리보기</div>
                </div>
              </div>
            </div>
          ) : clickedMainInput.type === "location" ? (
            <>
              <div className="status-input status-location">
                <p>임시 - 추후 지도 API로 연동</p>
                <input
                  placeholder="장소 이름을 적어주세요"
                  value={
                    keywordObject[index].contents[clickedIndex].content.title ||
                    ""
                  }
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[clickedIndex].content.title =
                          e.target.value;
                      })
                    );
                  }}
                />
                <input
                  placeholder="latitude(위도)"
                  value={
                    keywordObject[index].contents[clickedIndex].content
                      .latitude || ""
                  }
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[clickedIndex].content.latitude =
                          e.target.value;
                      })
                    );
                  }}
                />
                <input
                  placeholder="longtitude(경도)"
                  value={
                    keywordObject[index].contents[clickedIndex].content
                      .longtitude || ""
                  }
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        draft[index].contents[clickedIndex].content.longtitude =
                          e.target.value;
                      })
                    );
                  }}
                />
              </div>
              <GoogleMapPresenter />;
            </>
          ) : clickedMainInput.type === "list" ? (
            <>
              <div className="status-input status-list">
                <table>
                  <textarea
                    placeholder="작성하고자 하는 텍스트를 적어주세요"
                    value={
                      keywordObject[index].contents[clickedIndex].content.question || ""
                    }
                    onChange = {e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          draft[index].contents[clickedIndex].content.question = e.target.value;
                        })
                      );
                    }}
                  ></textarea>
                  <tr>
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={
                        keywordObject[index].contents[clickedIndex]
                          .content.elem[0] || ""
                      }
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[clickedIndex].content.elem[0] =
                              e.target.value;
                          })
                        );
                      }}
                    />

                    <input
                      placeholder="키워드명을 적어주세요"
                      value={
                        keywordObject[index].contents[clickedIndex]
                          .content.elem[1] || ""
                      }
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[clickedIndex].content.elem[1] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={
                        keywordObject[index].contents[clickedIndex]
                          .content.elem[2] || ""
                      }
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[clickedIndex].content.elem[2] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={
                        keywordObject[index].contents[clickedIndex]
                          .content.elem[3] || ""
                      }
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[clickedIndex].content.elem[3] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={
                        keywordObject[index].contents[clickedIndex]
                          .content.elem[4] || ""
                      }
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[clickedIndex].content.elem[4] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="키워드명을 적어주세요"
                      value={
                        keywordObject[index].contents[clickedIndex]
                          .content.elem[5] || ""
                      }
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[clickedIndex].content.elem[5] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                </table>
              </div>
            </>
          ) : null)}
          </div>
      <div className="tool-status-nav">
        <div className="tool-status-extra">
          {/* 아직 미구현 */}
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
