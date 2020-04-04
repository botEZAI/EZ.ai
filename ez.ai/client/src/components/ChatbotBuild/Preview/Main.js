import React, { useRef, useEffect, useState, useCallback } from "react";
import produce from "immer";
import axios from "axios";
import "./Main.css";

import TextPreview from "./BasicPreview/TextPreview";
import ImagePreview from "./BasicPreview/ImagePreview";
import VideoPreview from "./BasicPreview/VideoPreview";
import AudioPreview from "./BasicPreview/AudioPreview";
import LocationPreview from "./BasicPreview/LocationPreview";
import FilePreview from "./BasicPreview/FilePreview";
import ListPreview from "./AdvancePreview/ListPreview";
import VirtualKeyboard from "./AdvancePreview/VirtualKeyboard";

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
              <TextPreview 
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                setNow={setNow}
                onDelete={onDelete}
              />
            ) : v.type === "image" /**서버에서 파일 받아옴. */ ? (
              <ImagePreview      
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                setNow={setNow}
                onDelete={onDelete}
              />
            ) : v.type === "video" /**서버에서 파일 받아옴 */ ? (
              <VideoPreview 
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                setNow={setNow}
                onDelete={onDelete}
              />
            ) : v.type === "audio" ? (
              <AudioPreview 
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                setNow={setNow}
                onDelete={onDelete}
              />
            ) : v.type === "location" ? (
              <LocationPreview 
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                setNow={setNow}
                onDelete={onDelete}
              />
            ) : v.type === "file" ? (
              <FilePreview 
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                setNow={setNow}
                onDelete={onDelete}
              />
            ) : v.type === "list" ? (
              <ListPreview 
                v={v}
                i={i}
                setVirtualKeyboard={setVirtualKeyboard}
                setClickedMainInput={setClickedMainInput}
                setNow={setNow}
                onDelete={onDelete}
              />
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
        virtualKeyboard={virtualKeyboard}
        curListCount={curListCount}
        setCurListCount={setCurListCount}
        setKeywordObject={setKeywordObject}
      />
    </>
  ); /**retun END */
};
export default Main;
