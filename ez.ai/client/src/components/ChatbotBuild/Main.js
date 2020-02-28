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
  clickedMainInput,
  keywordKeyboard,
  setKeywordKeyboard,
  setNow,
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
    keywordObject[index].contents.findIndex(v =>
        v.id === clickedMainInput.id,
    );

    const MainContent =
    keywordObject[index] &&
    keywordObject[index].contents[clickedIndex] &&
    keywordObject[index].contents[clickedIndex].content;
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
  const removeListElement = (id) => {
    if (!clickedMainInput) {
      setKeywordObject(produce(keywordObject, draft => {
        draft[index].contents[length-1].content.elem[id] = '';})
      );
    }else {
      setKeywordObject(produce(keywordObject, draft => {
        draft[index].contents[clickedIndex].content.elem[id] = '';})
      );
    }
  };
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

  const isClickedBuilderMain = () => {
    setKeywordKeyboard(false);
  }
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
      <div className="main-contents" ref={contentRef} onClick={isClickedBuilderMain}>
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
                  onClick={(e) => {
                    setClickedMainInput(v)
                    setNow(i)  // 요소 클릭시 setNow(i)를 해줘야 왼쪽 status화면에서 보이니 참고해주세요
                  }}
                  key={v.contnet + i}
                  style={{padding:"3%"}}
                >
                  {v.content}
                  <div className="tool-delete delete-text" onClick={()=>{console.log("delete Text");}}>
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "image" ? (
              <>
                <div
                  className="main-content main-imgbox"
                  onClick={() => {
                    setClickedMainInput(v)
                    setNow(i)
                  }}
                  key={v.contnet + i}
                  style={{padding:"1%"}}
                >
                  { v.content !== "" ?
                    <div className="main-image-preview"
                      style={{ backgroundImage: `url(${v.content})`}}
                    >미리보기</div> 
                    :
                    <div className="image-preview-default">
                    이미지 없음</div>
                  }
                  <div className="tool-delete delete-image">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "video" ? (
              <>
                <div className="main-content main-videobox"
                     onClick = {() => setClickedMainInput(v)}
                     key = {v.content + i}
                >TEST VIDEO
                </div>
              </>
            ) : v.type === "audio" ? (
              <>
                <div className = "main-content main-audiobox"
                    onClick = {() => setClickedMainInput(v)}
                    key = {v.content + i}
                >TEST AUDIO
                </div>
              </>
            ) : v.type === "location" ? (
              <>
                <div
                  className="main-content main-locabox"
                  key={v.contnet + i}
                  onClick={() => {
                    setClickedMainInput(v)
                    setNow(i)
                  }}
                > <GoogleMapPresenter />
                  <div className="tool-delete delete-location">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </>
            ) : v.type === "file" ? (
              <>
                <div className = "main-content main-filebox"
                    key = {v.content + i}
                    onClick = {() => setClickedMainInput(v)}
                >TEST FILE
                </div>
              </>
            ) : v.type === "list" ? (
              <>
                <div
                  className="main-content main-listbox"
                  key={v.contnet + i}
                  onClick={(e) => {
                    setClickedMainInput(v)
                    e.stopPropagation()
                    setKeywordKeyboard(true)
                    setNow(i)
                  }}
                > 
                  <div className = "main-listbox-header">Question</div>
                  <div className="main-listbox-question">
                    {v.content.question !== "" ? 
                      v.content.question 
                      : "(Ask a question)"
                    } 
                  </div>
                  <div className="main-listbox-elem">{v.content.elem[0]}</div>
                  {v.content.elem[1] && (
                    <div className="main-listbox-elem">{v.content.elem[1]}</div>
                  )}
                  {v.content.elem[2] && (
                    <div className="main-listbox-elem">{v.content.elem[2]}</div>
                  )}
                  {v.content.elem[3] && (
                    <div className="main-listbox-elem">{v.content.elem[3]}</div>
                  )}
                  {v.content.elem[4] && (
                    <div className="main-listbox-elem">{v.content.elem[4]}</div>
                  )}
                  {v.content.elem[5] && (
                    <div className="main-listbox-elem">{v.content.elem[5]}</div>
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
      {/** Keyword-keyboard START  */}
      <div className = "keyword-keyboard">
      { keywordKeyboard ? (
        <>
        { !clickedMainInput && 
          currentInput && 
          ( currentInput.type === "list" ? (
            <>
              <div className="main-keyboard">
                {currentContent.elem[0] && (
                <div className="list-elem-wrapper">
                  <span className="list-elem">{currentContent.elem[0]}</span>
                  <span className="clear-button" onClick={() => {removeListElement(0)}}>x</span>
                </div>
                )}
                {currentContent.elem[1] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{currentContent.elem[1]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(1)}}>x</span>
                  </div>
                )}
                {currentContent.elem[2] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{currentContent.elem[2]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(2)}}>x</span>
                  </div>
                )}
                {currentContent.elem[3] && (
                  <div className="list-elem-wrapper">
                   <span className="list-elem">{currentContent.elem[3]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(3)}}>x</span>
                  </div>
                )}
                {currentContent.elem[4] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{currentContent.elem[4]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(4)}}>x</span>
                  </div>
                )}
                {currentContent.elem[5] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{currentContent.elem[5]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(5)}}>x</span>
                  </div>
                )}
                {!currentContent.elem[0] && !currentContent.elem[1] &&
                 !currentContent.elem[2] && !currentContent.elem[3] &&
                 !currentContent.elem[4] && !currentContent.elem[5] &&
                 <div className="list-elem-default"> + KEYWORD </div>
                }
              </div>
              </>
          ) : null
          )}
        { clickedMainInput.type &&
          ( clickedMainInput.type === "list" ? (
              <>
                {MainContent.elem[0] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{MainContent.elem[0]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(0)}}>x</span>
                  </div>
                )}
                {MainContent.elem[1] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{MainContent.elem[1]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(1)}}>x</span>
                  </div>
                )}
                {MainContent.elem[2] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{MainContent.elem[2]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(2)}}>x</span>
                  </div>
                )}
                {MainContent.elem[3] && (
                  <div className="list-elem-wrapper">
                   <span className="list-elem">{MainContent.elem[3]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(3)}}>x</span>
                  </div>
                )}
                {MainContent.elem[4] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{MainContent.elem[4]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(4)}}>x</span>
                  </div>
                )}
                {MainContent.elem[5] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">{MainContent.elem[5]}</span>
                    <span className="clear-button" onClick={() => {removeListElement(5)}}>x</span>
                  </div>
                )}
                {!MainContent.elem[0] && !MainContent.elem[1] &&
                 !MainContent.elem[2] && !MainContent.elem[3] &&
                 !MainContent.elem[4] && !MainContent.elem[5] &&
                 <div className="list-elem-default"> + KEYWORD </div>
                }
              </>
          ) : null )}
        </>
      ) : null }
      </div> 
      {/** keyword-keyboard END */}
    </>
  );  /**retun END */
};
export default Main;
