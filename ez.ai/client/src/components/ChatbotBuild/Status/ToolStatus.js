import React, { useState, useRef } from "react";

import TextStatus from "./BasicStatus/TextStatus";
import ImageStatus from "./BasicStatus/ImageStatus";
import VideoStatus from "./BasicStatus/VideoStatus";
import AudioStatus from "./BasicStatus/AudioStatus";
import LocationStatus from "./BasicStatus/LocationStatus";
import FileStatus from "./BasicStatus/FileStatus";
import PersistentStatus from "./AdvanceStatus/PersistentStatus";

import "./StatusPopups/EmogiPopup.css";
import ImogiPopup from "./StatusPopups/EmogiPopup";
import CarouselTemplateStatus from "./AdvanceStatus/Templates/CarouselTemplateStatus";
import ImgCarouselTemplateStatus from "./AdvanceStatus/Templates/ImgCarouselTemplateStatus";
import ButtonTemplateStatus from "./AdvanceStatus/Templates/ButtonTemplateStatus";
import HelpPopup from "./StatusPopups//HelpPopup";

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
  setCurListCount,
  availableIcon,
}) => {
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
          <span>현재 선택한 요소 : </span>
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
            ) : currentInput.type === "list" ||
              clickedMainInput.type === "list" ? (
              <>
                <span>고정 메뉴</span>
              </>
            ) : currentInput.type === "btn_template" ||
              clickedMainInput.type === "btn_template" ? (
              <>
                <span>버튼 템플릿</span>
              </>
            ) : null
          ) : null}
        </div>
        <div className="tool-status-info">
          <div className="tool-status-available">
            <div className={availableIcon[0].use ? "sns-color-line" : null}>
              <i className="fab fa-line"></i>
            </div>
            <div className={availableIcon[1].use ? "sns-color-telegram" : null}>
              <i className="fab fa-telegram" aria-hidden="true"></i>
            </div>
          </div>
          <HelpPopup 
            currentInput={currentInput}
            clickedMainInput={clickedMainInput}
          />
        </div>
      </div>

      <div className="tool-status-main">
        {clickedMainInput || (!clickedMainInput && currentInput) ? (
          currentInput.type === "text" || clickedMainInput.type === "text" ? (
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
          ) : currentInput.type === "list" ||
            clickedMainInput.type === "list" ? (
            <PersistentStatus
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
          ) : currentInput.type === "btn_template" ||
            clickedMainInput.type === "btn_template" ? (
            <ButtonTemplateStatus
              currentContent={currentContent}
              setKeywordObject={setKeywordObject}
              keywordObject={keywordObject}
              now={now}
              index={index}
              listCount={listCount}
              curListCount={curListCount}
              setCurListCount={setCurListCount}
            />
          ) : null
        ) : null}
      </div>
      <div className="tool-status-nav">
        <div className="tool-status-extra">
          {" "}
          {/* type에 따라 추가적인 기능 버튼 보여주는 영역 */}
          {currentInput ? (
            currentInput.type === "text" || clickedMainInput.type === "text" ? (
              <>
                {/*<div className="extra-btn user-name">사용자명</div>*/}
                <ImogiPopup
                  setKeywordObject={setKeywordObject}
                  keywordObject={keywordObject}
                  now={now}
                  index={index}
                  selectType="text"
                />
              </>
            ) : currentInput.type === "list" ||
              clickedMainInput.type === "list" ? (
              <ImogiPopup
                setKeywordObject={setKeywordObject}
                keywordObject={keywordObject}
                now={now}
                index={index}
                selectType="keyword"
              />
            ) : null
          ) : null}
        </div>

        <div className="tool-status-nav-btns">
        </div>
      </div>
    </>
  );
};

export default ToolStatus;
