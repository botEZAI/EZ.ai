import React, { useRef, useEffect, useState, useCallback } from "react";
import produce from "immer";
import axios from "axios";
import "./Preview.css";

import TextPreview from "./BasicPreview/TextPreview";
import ImagePreview from "./BasicPreview/ImagePreview";
import VideoPreview from "./BasicPreview/VideoPreview";
import AudioPreview from "./BasicPreview/AudioPreview";
import LocationPreview from "./BasicPreview/LocationPreview";
import FilePreview from "./BasicPreview/FilePreview";
import ListPreview from "./AdvancePreview/ListPreview";
import VirtualKeyboard from "./AdvancePreview/VirtualKeyboard";

const Preview = ({
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
  setCurListCount,
  availableIcon,
  setAvailableIcon,
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
      .then((res) => console.log(res));
  };
  //
  const ClickedBuilderMain = () => {
    setVirtualKeyboard(false);
  };

  // 아이콘 호환여부 설정
  const useableInfo = [
    {name : "text", value : [0,0,0,0]},
    {name : "image", value : [0,0,0,0]},
    {name : "video", value : [0,0,0,0]},
    {name : "audio", value : [0,0,0,0]},
    {name : "location", value : [0,0,0,0]},
    {name : "file", value : [0,0,0,0]},
    {name : "list", value : [0,1,1,0]},
    {name : "sticker", value : [1,0,1,0]},
  ]

  const changeAvailableIcon = (tool) => {
    for (let i=0; i<useableInfo.length; i++) {
      if(useableInfo[i].name === tool) {
        console.log(tool)
        setAvailableIcon(availableIcon.map((ai,index)=> ({...ai, use : useableInfo[i].value[index] ? false : true})))
      }
    }
  }


  //삭제
  const onDelete = (id, isList) => {
    let tmp = keywordObject[index].contents.findIndex((content, i) => content.id === id);
    console.log(tmp,id)
    setClickedMainInput(false);
    if (now > tmp) {
      setNow(now-1);
    } else if (id === tmp) {
      setNow(-1);
    }



    console.log()


    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents.splice(
          draft[index].contents.findIndex((content) => content.id === id),
          1
        );
        if (isList === "list") {
          draft[index].completed = false;
        }
      })
    );
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
      .then((res) => setKeywordObject(JSON.parse(res.data.keyword)));
  }, []);
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
                now={now}
                setNow={setNow}
                onDelete={onDelete}
                changeAvailableIcon={changeAvailableIcon}
              />
            ) : v.type === "image" /**서버에서 파일 받아옴. */ ? (
              <ImagePreview
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                now={now}
                setNow={setNow}
                onDelete={onDelete}
                changeAvailableIcon={changeAvailableIcon}
              />
            ) : v.type === "video" /**서버에서 파일 받아옴 */ ? (
              <VideoPreview
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                now={now}
                setNow={setNow}
                onDelete={onDelete}
                changeAvailableIcon={changeAvailableIcon}
              />
            ) : v.type === "audio" ? (
              <AudioPreview
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                now={now}
                setNow={setNow}
                onDelete={onDelete}
                changeAvailableIcon={changeAvailableIcon}
              />
            ) : v.type === "location" ? (
              <LocationPreview
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                now={now}
                setNow={setNow}
                onDelete={onDelete}
                changeAvailableIcon={changeAvailableIcon}
              />
            ) : v.type === "file" ? (
              <FilePreview
                v={v}
                i={i}
                setClickedMainInput={setClickedMainInput}
                now={now}
                setNow={setNow}
                onDelete={onDelete}
                changeAvailableIcon={changeAvailableIcon}
              />
            ) : v.type === "list" ? (
              <ListPreview
                v={v}
                i={i}
                setVirtualKeyboard={setVirtualKeyboard}
                setClickedMainInput={setClickedMainInput}
                now={now}
                setNow={setNow}
                onDelete={onDelete}
                changeAvailableIcon={changeAvailableIcon}
              />
            ) : null
          )}
      </div>
      <div className="main-footer"></div>
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
export default Preview;
