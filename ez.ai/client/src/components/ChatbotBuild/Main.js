import React, { useRef, useEffect, useState } from "react";
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
  setClickedMainInput,
  addFlag,
  setAddFlag,
  firstEntry,
  setFirstEntry,
  clickedMainInput
}) => {
  const [keywordKeyboard, setKeywordKeyboard] = useState(false);
  const index = keywordObject.findIndex(v => v.keyword === mainKeyword);
  const clickedIndex =
    keywordObject[index] &&
    keywordObject[index].contents.findIndex(v => v.id === clickedMainInput.id);

  //post
  const onClickButton = () => {
    const count = keywordObject.length;
    axios.post("/api/chatbotbuild", { count }).then(res => console.log(res));

    keywordObject.map(k =>
      axios.post("/api/chatbotbuild", { k }).then(res => console.log(res))
    );
  };
  //scroll
  const contentRef = useRef(null);

  useEffect(() => {
    if (firstEntry === true) {
      // 키워드 클릭 시 스크롤 초기화
      contentRef.current.scrollTop = 0;
      setFirstEntry(false);
    } else {
      if (addFlag === true) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }

      setAddFlag(false);
    }
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
                  {v.content}
                  {/* div로 전환 시 줄바꿈이 안되는 문제 'white-space: pre-wrap'으로 잡아봄.  */}
                  {/* <textarea
                    value={v.content || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(t => t.id === v.id);
                          tmp.content = e.target.value;
                          // 포..기.........

                          // console.log(beforeLen);
                          // console.log(tmp.content.length);
                          // console.log(e.target.clientWidth);
                          // if(beforeLen < tmp.content.length){
                          //   if(tmp.content.length === 1){
                          //     e.target.style.width = (6 + 12.5 )+ 'px';
                          //   }else{
                          //     e.target.style.width = (e.target.clientWidth + 12.5 )+ 'px';
                          //   }
                          // }else if(beforeLen > tmp.content.length){
                          //   e.target.style.width = (e.target.clientWidth - 12.5 )+ 'px';
                          // }
                          // console.log('dhodkseho!!');
                          // setBeforeLen(tmp.content.length);
                        })
                      );
                    }}
                    placeholder=""
                    style={{width:"0px", resize:"none"}}/> */}
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
                    <div
                      className="image-preview-screen"
                      style={{ backgroundImage: `url(${v.content})` }}
                    ></div>
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
                  onClick={() => {setClickedMainInput(v); setKeywordKeyboard(true);}}
                > 
                  <div className = "list-name">Question</div>
                  <textarea value = {v.content.question || ""}
                            onChange = {e => {
                              setKeywordObject(
                                produce(keywordObject, draft => {
                                  const tmp = draft[index].contents.find(
                                    t => t.id === v.id
                                  )
                                  tmp.content.question = e.target.value;
                                })
                              );
                              //TEXTAREA 높이 자동 조절
                              e.target.style.height = 'auto';
                              e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            placeholder="Ask a question"
                  >
                  </textarea>
                  <input
                    value={v.content.elem[0] || ""}
                    onChange={e => {
                      setKeywordObject(
                        produce(keywordObject, draft => {
                          const tmp = draft[index].contents.find(
                            t => t.id === v.id
                          );
                          tmp.content.elem[0] = e.target.value;
                        })
                      );
                    }}
                    placeholder="list"
                  />

                  {v.content.elem[1] && (
                    <input
                      value={v.content.elem[1] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content.elem[1] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content.elem[2] && (
                    <input
                      value={v.content.elem[2] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content.elem[2] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content.elem[3] && (
                    <input
                      value={v.content.elem[3] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content.elem[3] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content.elem[4] && (
                    <input
                      value={v.content.elem[4] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content.elem[4] = e.target.value;
                          })
                        );
                      }}
                      placeholder="list"
                    />
                  )}

                  {v.content.elem[5] && (
                    <input
                      value={v.content.elem[5] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            const tmp = draft[index].contents.find(
                              t => t.id === v.id
                            );
                            tmp.content.elem[5] = e.target.value;
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

      {keywordKeyboard ?  
        <>
          <div className = "keyword-keyboard">
          {clickedMainInput.type &&
            clickedMainInput.type === "list" ? (
                <>
                  <input
                    value={keywordObject[index].contents[clickedIndex]
                      .content.elem[0] || ""}
                    placeholder="list"
                    readOnly
                />
                {keywordObject[index].contents[clickedIndex].content.elem[1] && (
                  <input
                    value={keywordObject[index].contents[clickedIndex]
                      .content.elem[1] || ""}
                    placeholder="list"
                    readOnly
                  />
                )}
                {keywordObject[index].contents[clickedIndex].content.elem[2] && (
                  <input
                    value={keywordObject[index].contents[clickedIndex]
                      .content.elem[2] || ""}
                    placeholder="list"
                    readOnly
                  />
                )}
                {keywordObject[index].contents[clickedIndex].content.elem[3] && (
                  <input
                    value={keywordObject[index].contents[clickedIndex]
                      .content.elem[3] || ""}
                    placeholder="list"
                    readOnly
                  />
                )}
                {keywordObject[index].contents[clickedIndex].content.elem[4] && (
                  <input
                    value={keywordObject[index].contents[clickedIndex]
                      .content.elem[4]|| ""}
                    placeholder="list"
                    readOnly
                  />
                )}
                {keywordObject[index].contents[clickedIndex].content.elem[5] && (
                  <input
                    value={keywordObject[index].contents[clickedIndex]
                      .content.elem[5]|| ""}
                    placeholder="list"
                    readOnly
                  />
                )}
                </>
              ) : null
          }
          </div>
        </>
        : null
      } 
    </>
  );
};

export default Main;
