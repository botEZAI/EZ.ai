import React, { useRef, useEffect, useState, useCallback } from "react";
import produce from "immer";
import axios from "axios";
import "./Main.css";
import GoogleMapPresenter from "../GoogleMapPresenter";
import VirtualKeyboard from "./VirtualKeyboard";

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
  virtualKeyboard,
  setVirtualKeyboard,
  index,
  now,
  setNow,
  curListCount,
  setCurListCount
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
    // axios.post("/api/chatbotbuild", { count }).then(res => console.log(res));

    const nowKeyword = keywordObject[index];
    axios
      .post("/api/chatbotbuild", { nowKeyword, keywordObject })
      .then(res => console.log(res));
  };
  //리스트 요소 삭제
  const removeListElement = id => {
    setCurListCount(curListCount.filter(num => num !== id));
    setKeywordObject(
      produce(keywordObject, draft => {
        draft[index].contents[now].listContent.keywordLink[id] = "";
        draft[index].contents[now].listContent.elem[id] = "";
      })
    );
  };
  //
  const ClickedBuilderMain = () => {
    setVirtualKeyboard(false);
  };
  //삭제
  const onDelete = (id, isList) => {
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
        if (isList === "list") {
          draft[index].completed = false;
        }
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
  useEffect(() => {
    //챗봇 데이터 로딩
    axios
      .get("/api/chatbotbuild")
      .then(res => setKeywordObject(JSON.parse(res.data.keyword)));
  }, []);
  console.log("데이터", keywordObject);
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
        onClick={ClickedBuilderMain}
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
                      ></div>
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
                        {v.content}
                      </div>
                      <div className="main-file-size" data-filetype="">
                        {/* 길이, 용량을 표시하려면 데이터를 확장해야함.현재는 파일 이름만 저장 */}
                        {/* 00:00, 00.00 MB{" "} */}
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
                        {v.content}
                      </div>
                      <div className="main-file-size" data-filetype="">
                        {/* 00.00 MB */}
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
                  key={v.listContent + i}
                  onClick={e => {
                    e.stopPropagation();
                    setVirtualKeyboard(true);
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
                      {v.listContent.question !== ""
                        ? v.listContent.question
                        : "(Ask a question)"}
                    </div>
                    <div className="main-listbox-elem">
                      {v.listContent.elem[0]}
                    </div>
                    {v.listContent.elem[1] && (
                      <div className="main-listbox-elem">
                        {v.listContent.elem[1]}
                      </div>
                    )}
                    {v.listContent.elem[2] && (
                      <div className="main-listbox-elem">
                        {v.listContent.elem[2]}
                      </div>
                    )}
                    {v.listContent.elem[3] && (
                      <div className="main-listbox-elem">
                        {v.listContent.elem[3]}
                      </div>
                    )}
                    {v.listContent.elem[4] && (
                      <div className="main-listbox-elem">
                        {v.listContent.elem[4]}
                      </div>
                    )}
                    {v.listContent.elem[5] && (
                      <div className="main-listbox-elem">
                        {v.listContent.elem[5]}
                      </div>
                    )}
                  </div>
                  <div
                    className="tool-delete delete-listbox "
                    onClick={() => {
                      onDelete(v.id, "list");
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
      <VirtualKeyboard
        clickedMainInput={clickedMainInput}
        currentInput={currentInput}
        index={index}
        keywordObject={keywordObject}
        now={now}
        removeListElement={removeListElement}
        virtualKeyboard={virtualKeyboard}
        curListCount={curListCount}
      />
    </>
  ); /**retun END */
};
export default Main;
