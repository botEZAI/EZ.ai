import React, { useRef, useEffect, useState, useCallback } from "react";
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
  clickedMainInput,
  keywordKeyboard,
  setKeywordKeyboard,
  index,
  now,
  setNow
}) => {
  const currentInput =
    now !== -1 && keywordObject[index] && keywordObject[index].contents[now];
  const currentContent =
    now !== -1 &&
    keywordObject[index] &&
    keywordObject[index].contents[now] &&
    keywordObject[index].contents[now].content;
  const contentRef = useRef(null);

  //post
  const onClickButton = () => {
    const count = keywordObject.length;
    axios.post("/api/chatbotbuild", { count }).then(res => console.log(res));

    keywordObject.map(k =>
      axios.post("/api/chatbotbuild", { k }).then(res => console.log(res))
    );
  };
  //리스트 요소 삭제
  const removeListElement = id => {
    setKeywordObject(
      produce(keywordObject, draft => {
        draft[index].contents[now].content.elem[id] = "";
      })
    );
  };
  //
  const isClickedBuilderMain = () => {
    setKeywordKeyboard(false);
  };
  //삭제
  const onDelete = id => {
    if (id === now + 1) {
      setNow(now - 1);
      setClickedMainInput({});
    }
    setKeywordObject(
      produce(keywordObject, draft => {
        draft[index].contents.splice(
          draft[index].contents.findIndex(content => content.id === id),
          1
        );
      })
    );
    console.log("now=", now);
  };
  useEffect(() => {
    if (firstEntry === true) {
      contentRef.current.scrollTop = 0; // 키워드 클릭 시 스크롤 초기화
      setFirstEntry(false);
    } else if (addFlag === true) {
      //
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
      setAddFlag(false);
    }
  });
  return (
    <>
      <div className="main-header">
        <i className="fa fa-arrow-left"></i>
        <i className="fa fa-user-circle fa-3x"></i>
        <span>USER</span>
        <i id="item-last" className="fa fa-ellipsis-v"></i>
      </div>
      <div
        className="main-contents"
        ref={contentRef}
        onClick={isClickedBuilderMain}
      >
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
                  className="main-content main-textbox"
                  key={v.content + i}
                  style={{ padding: "3%" }}
                >
                  <div
                    onClick={() => {
                      setClickedMainInput(v);
                      setNow(i);
                    }}
                  >
                    {v.content || "(입력)"}
                  </div>
                  <div
                    className="tool-delete delete-text"
                    onClick={() => {
                      onDelete(v.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "image" /**서버에서 파일 받아옴. */ ? (
              <>
                <div
                  className="main-content main-imgbox"
                  key={v.content + i}
                  style={{ padding: "1%" }}
                >
                  <div
                    onClick={() => {
                      setClickedMainInput(v);
                      setNow(i);
                    }}
                  >
                    {" "}
                    {v.content !== "" ? (
                      <div
                        className="main-image-preview"
                        style={{ backgroundImage: `url(${v.content})` }}
                      >
                        미리보기
                      </div>
                    ) : (
                      <div className="image-preview-default">이미지 없음</div>
                    )}
                  </div>
                  <div
                    className="tool-delete delete-image"
                    onClick={() => {
                      onDelete(v.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "video" /**서버에서 파일 받아옴 */ ? (
              <>
                <div className="main-content main-videobox" key={v.content + i}>
                  {" "}
                  <div
                    className="main-video-content"
                    onClick={() => {
                      setClickedMainInput(v);
                      setNow(i);
                    }}
                  >
                    <i className="fas fa-play fa-lg main-file-icon"></i>
                  </div>
                  <div
                    className="tool-delete delete-video"
                    onClick={() => {
                      onDelete(v.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "audio" ? (
              <>
                <div className="main-content main-audiobox" key={v.content + i}>
                  {" "}
                  <div
                    onClick={() => {
                      setClickedMainInput(v);
                      setNow(i);
                    }}
                  >
                    <i className="fas fa-play fa-lg main-file-icon"></i>
                    <div className="main-file-content">
                      <div className="main-file-name" data-filetype="">
                        (fileName{v.content})
                      </div>
                      <div className="main-file-size" data-filetype="">
                        00:00, 00.00 MB{" "}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tool-delete delete-audio"
                    onClick={() => {
                      onDelete(v.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "location" ? (
              <>
                <div className="main-content main-locabox" key={v.content + i}>
                  {" "}
                  <div
                    onClick={() => {
                      setClickedMainInput(v);
                      setNow(i);
                    }}
                  >
                    <GoogleMapPresenter />
                  </div>
                  <div
                    className="tool-delete delete-location"
                    onClick={() => {
                      onDelete(v.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "file" ? (
              <>
                <div className="main-content main-filebox" key={v.content + i}>
                  {" "}
                  <div
                    onClick={() => {
                      setClickedMainInput(v);
                      setNow(i);
                    }}
                  >
                    <i className="fas fa-file fa-lg main-file-icon"></i>
                    <div className="main-file-content">
                      <div className="main-file-name" data-filetype="">
                        (fileName{v.content})
                      </div>
                      <div className="main-file-size" data-filetype="">
                        00.00 MB
                      </div>
                    </div>
                  </div>
                  <div
                    className="tool-delete delete-file"
                    onClick={() => {
                      onDelete(v.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "list" ? (
              <>
                <div
                  className="main-content main-listbox"
                  key={v.content + i}
                  onClick={e => {
                    e.stopPropagation();
                    setKeywordKeyboard(true);
                  }}
                >
                  {" "}
                  <div
                    onClick={() => {
                      setClickedMainInput(v);
                      setNow(i);
                    }}
                  >
                    <div className="main-listbox-header">Question</div>
                    <div className="main-listbox-question">
                      {v.content.question !== ""
                        ? v.content.question
                        : "(Ask a question)"}
                    </div>
                    <div className="main-listbox-elem">{v.content.elem[0]}</div>
                    {v.content.elem[1] && (
                      <div className="main-listbox-elem">
                        {v.content.elem[1]}
                      </div>
                    )}
                    {v.content.elem[2] && (
                      <div className="main-listbox-elem">
                        {v.content.elem[2]}
                      </div>
                    )}
                    {v.content.elem[3] && (
                      <div className="main-listbox-elem">
                        {v.content.elem[3]}
                      </div>
                    )}
                    {v.content.elem[4] && (
                      <div className="main-listbox-elem">
                        {v.content.elem[4]}
                      </div>
                    )}
                    {v.content.elem[5] && (
                      <div className="main-listbox-elem">
                        {v.content.elem[5]}
                      </div>
                    )}
                  </div>
                  <div
                    className="tool-delete delete-listbox "
                    onClick={() => {
                      onDelete(v.id);
                    }}
                  >
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
      {/** Keyword-keyboard START  */}
      <div className="keyword-keyboard">
        {keywordKeyboard ? (
          <>
            {(clickedMainInput.type ||
              (!clickedMainInput.type && currentInput)) &&
              (currentInput.type === "list" ||
              clickedMainInput.type === "list" ? (
                <>
                  <div className="main-keyboard">
                    {currentContent.elem[0] && (
                      <div className="list-elem-wrapper">
                        <span className="list-elem">
                          {currentContent.elem[0] || ""}
                        </span>
                        <span
                          className="clear-button"
                          onClick={() => {
                            removeListElement(0);
                          }}
                        >
                          x
                        </span>
                      </div>
                    )}
                    {currentContent.elem[1] && (
                      <div className="list-elem-wrapper">
                        <span className="list-elem">
                          {currentContent.elem[1] || ""}
                        </span>
                        <span
                          className="clear-button"
                          onClick={() => {
                            removeListElement(1);
                          }}
                        >
                          x
                        </span>
                      </div>
                    )}
                    {currentContent.elem[2] && (
                      <div className="list-elem-wrapper">
                        <span className="list-elem">
                          {currentContent.elem[2] || ""}
                        </span>
                        <span
                          className="clear-button"
                          onClick={() => {
                            removeListElement(2);
                          }}
                        >
                          x
                        </span>
                      </div>
                    )}
                    {currentContent.elem[3] && (
                      <div className="list-elem-wrapper">
                        <span className="list-elem">
                          {currentContent.elem[3] || ""}
                        </span>
                        <span
                          className="clear-button"
                          onClick={() => {
                            removeListElement(3);
                          }}
                        >
                          x
                        </span>
                      </div>
                    )}
                    {currentContent.elem[4] && (
                      <div className="list-elem-wrapper">
                        <span className="list-elem">
                          {currentContent.elem[4] || ""}
                        </span>
                        <span
                          className="clear-button"
                          onClick={() => {
                            removeListElement(4);
                          }}
                        >
                          x
                        </span>
                      </div>
                    )}
                    {currentContent.elem[5] && (
                      <div className="list-elem-wrapper">
                        <span className="list-elem">
                          {currentContent.elem[5] || ""}
                        </span>
                        <span
                          className="clear-button"
                          onClick={() => {
                            removeListElement(5);
                          }}
                        >
                          x
                        </span>
                      </div>
                    )}
                    {!currentContent.elem[0] &&
                      !currentContent.elem[1] &&
                      !currentContent.elem[2] &&
                      !currentContent.elem[3] &&
                      !currentContent.elem[4] &&
                      !currentContent.elem[5] && (
                        <div className="list-elem-default"> KEYWORD </div>
                      )}
                  </div>
                </>
              ) : null)}
          </>
        ) : null}
      </div>

      {/** keyword-keyboard END */}
    </>
  ); /**retun END */
};
export default Main;
