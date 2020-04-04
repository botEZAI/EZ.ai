import React, { useState, useRef } from "react";


import TextStatus from "./BasicStatus/TextStatus";
import ImageStatus from "./BasicStatus/ImageStatus";
import VideoStatus from "./BasicStatus/VideoStatus";
import AudioStatus from "./BasicStatus/AudioStatus";
import LocationStatus from "./BasicStatus/LocationStatus";
import FileStatus from "./BasicStatus/FileStatus";
import KeyboardStatus from "./AdvanceStatus/KeyboardStatus";

import "./StatusPopups/EmogiPopup.css";
import ImogiPopup from "./StatusPopups/EmogiPopup";

const ToolStatus = ({
  mainKeyword,
  keywordObject,
  setKeywordObject,
  clickedMainInput,
  now,
  setNow,
  setClickedMainInput,
  index,
  keywordPopup,
  setKeywordPopup,
  listCount,
  curListCount,
  setCurListCount
}) => {
  const clickedIndex =
    keywordObject[index] &&
    keywordObject[index].contents.findIndex(v => v.id === clickedMainInput.id);

  const currentInput =
    now !== -1 && keywordObject[index] && keywordObject[index].contents[now];
  const currentContent =
    now !== -1 &&
    keywordObject[index] &&
    keywordObject[index].contents[now] &&
    keywordObject[index].contents[now].content;

  const fileRef = useRef();

  return (
    <>
      <div className="tool-status-header">
        <div className="tool-status-name">
          {currentInput ? (
            currentInput.type === "text" || clickedMainInput.type === "text" ? (
              <>
                <span>텍스트</span>
              </>
            ) : currentInput.type === "image" ||
              clickedMainInput.type === "image" ? (
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
            <TextStatus
              currentContent={currentContent}
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
            />
          ) : currentInput.type === "image" ||
            clickedMainInput.type === "image" ? (
            <ImageStatus
              currentContent={currentContent}
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
            />
          ) : currentInput.type === "video" ||
            clickedMainInput.type === "video" ? (
            <VideoStatus
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
            />
          ) : currentInput.type === "audio" ||
            clickedMainInput.type === "audio" ? (
            <AudioStatus
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
            />
          ) : currentInput.type === "location" ||
            clickedMainInput.type === "location" ? (
            <LocationStatus
              currentContent={currentContent}
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
            />
          ) : currentInput.type === "file" ||
            clickedMainInput.type === "file" ? (
            <FileStatus
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
            />
          ) : currentInput.type === "list" ||
            clickedMainInput.type === "list" ? (
            <KeyboardStatus
              currentContent={currentContent}
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
              keywordPopup={keywordPopup}
              setKeywordPopup={setKeywordPopup}
              listCount={listCount}
              curListCount={curListCount}
              setCurListCount={setCurListCount}
            />
          ) : currentInput.type === "sticker" ||
            clickedMainInput.type === "sticker" ? (
            <>
              <div>
                <p>스티커는 추후 텔레그램 스티커 api와 연결</p>
              </div>
            </>
          ) : null)}
      </div>
      <div className="tool-status-nav">
        <div className="tool-status-extra">
          {" "}
          {/* type에 따라 추가적인 기능 버튼 보여주는 영역 */}
          {currentInput ? (
            currentInput.type === "text" || clickedMainInput.type === "text"  ? (
              <>
                {/*<div className="extra-btn user-name">사용자명</div>*/}
                <ImogiPopup
                    setKeywordObject={setKeywordObject}
                    keywordObject={keywordObject}
                    now={now}
                    index={index}
                    selectType = "text"
                />
              </>
            ) : currentInput.type === "list" ||
              clickedMainInput.type === "list" ? (
                <ImogiPopup
                    setKeywordObject={setKeywordObject}
                    keywordObject={keywordObject}
                    now={now}
                    index={index}
                    selectType = "keyword"
                />
            ) : null
          ) : null}
        </div>

        <div className="tool-status-nav-btns">
          <div className="tool-status-btn decline">삭제</div>
        </div>
      </div>
    </>
  );
};

export default ToolStatus;
