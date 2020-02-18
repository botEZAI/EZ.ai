import React, { useRef, useEffect } from "react";
import produce from "immer";
import axios from "axios";
import "./Main.css";
import GoogleMapPresenter from "./GoogleMapPresenter";

const Main = ({
  mainKeyword,
  keywordContentList,
  keywordObject,
  keywordList,
  mainKeywordObject,
  setKeywordObject,
  onClickCurrent,
  setClickedMainInput
}) => {
  const index = keywordObject.findIndex(v => v.keyword === mainKeyword);
  //post
  const onClickButton = () => {
    axios
      .post("/api/chatbotbuild", { keywordObject })
      .then(res => console.log(res));
  };
  //scroll
  const contentRef = useRef(null);
  useEffect(() => {
    /** content 추가될때마다 스크롤 최하단으로 이동하는 코드 */
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  });

  return (
    <>
      <div className="main-header">
        <div className="main-header-icon">
          <span className="item">
            <i className="fa fa-arrow-left"></i>
          </span>
          <span className="item">
            <i className="fa fa-user-circle fa-2x"></i>
          </span>
          <span className="item">USER</span>
        </div>
        <div className="item-last">
          <i className="fa fa-ellipsis-v"></i>
        </div>
      </div>
      <div className="main-contents" ref={contentRef}>
        {keywordObject[index] && (
          <div className="main-keyword-title">
            KEYWORD: {keywordObject[index].keyword}
          </div>
        )}
        {keywordObject[index] &&
          keywordObject[index].contents.map((v, i) =>
            v.type === "text" ? (
              <>
                <div
                  className="main-content"
                  onClick={() => setClickedMainInput(v)}
                  key={v.contnet + i}
                >
                  <textarea
                    value={v.content || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(
                            t => t.id === v.id
                          );
                          tmp.content = e.target.value;
                        })
                      );
                    }}
                    placeholder="작성하고자 하는 텍스트를 적어주세요"
                  />
                  <div className="tool-delete delete-text">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "image" ? (
              <>
                <div
                  className="main-content"
                  onClick={() => setClickedMainInput(v)}
                  key={v.contnet + i}
                >
                  <input
                    value={v.content || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(
                            t => t.id === v.id
                          );
                          tmp.content = e.target.value;
                        })
                      );
                    }}
                    placeholder="image url"
                  />
                  <div className="image-preview">
                    <div className="image-preview-screen">이미지 미리보기</div>
                  </div>
                  <div className="tool-delete delete-image">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "location" ? (
              <>
                <div
                  className="main-content"
                  key={v.contnet + i}
                  onClick={() => setClickedMainInput(v)}
                >
                  <input
                    value={v.content.title || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(
                            t => t.id === v.id
                          );
                          tmp.content.title = e.target.value;
                        })
                      );
                    }}
                    placeholder="title"
                  />
                  <input
                    value={v.content.latitude || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(
                            t => t.id === v.id
                          );
                          tmp.content.latitude = e.target.value;
                        })
                      );
                    }}
                    placeholder="latitude"
                  />
                  <input
                    value={v.content.longtitude || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(
                            t => t.id === v.id
                          );
                          tmp.content.longtitude = e.target.value;
                        })
                      );
                    }}
                    placeholder="longtitude"
                  />
                  <GoogleMapPresenter />
                  <div className="tool-delete delete-location">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "list" ? (
              <>
                <div
                  className="main-content list-content"
                  key={v.contnet + i}
                  onClick={() => setClickedMainInput(v)}
                >
                  <input
                    value={v.content[0] || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(
                            t => t.id === v.id
                          );
                          tmp.content[0] = e.target.value;
                        })
                      );
                    }}
                    placeholder="list"
                  />

                  {v.content[1] && (
                    <input
                      value={v.content[1] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content[1] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content[2] && (
                    <input
                      value={v.content[2] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content[2] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content[3] && (
                    <input
                      value={v.content[3] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content[3] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content[4] && (
                    <input
                      value={v.content[4] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content[4] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content[5] && (
                    <input
                      value={v.content[5] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content[5] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}
                  <div className="tool-delete delete-listbox">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : null
          )}
      </div>
      <div className="main-footer">
        <button className="main-button" onClick={onClickButton}>
          저장
        </button>
      </div>
      {console.log("main")}
    </>
  );
};

export default Main;
