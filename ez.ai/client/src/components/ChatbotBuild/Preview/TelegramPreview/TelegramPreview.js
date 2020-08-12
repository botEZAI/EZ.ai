import React, { useRef, useEffect, useState, useCallback } from "react";

import TextPreview from "./BasicPreview/TextPreview";
import ImagePreview from "./BasicPreview/ImagePreview";
import VideoPreview from "./BasicPreview/VideoPreview";
import AudioPreview from "./BasicPreview/AudioPreview";
import LocationPreview from "./BasicPreview/LocationPreview";
import FilePreview from "./BasicPreview/FilePreview";
import ListPreview from "./AdvancePreview/ListPreview";
import ButtonTemplatePreview from "./AdvancePreview/ButtonTemplatePreview";
import "./TelegramPreview.css";

const TelegramPreview = ({
  changeAvailableIcon,
  index,
  keywordObject,
  now,
  onDelete,
  setClickedMainInput,
  setKeywordObject,
  setVirtualKeyboard,
  setNow,
  platformInfo,
}) => {
  return (
    <>
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
              platformInfo={platformInfo}
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
              platformInfo={platformInfo}
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
              platformInfo={platformInfo}
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
              platformInfo={platformInfo}
            />
          ) : v.type === "location" ? (
            <LocationPreview
              v={v}
              i={i}
              setClickedMainInput={setClickedMainInput}
              index={index}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              keywordObject={keywordObject}
              setKeywordObject={setKeywordObject}
              changeAvailableIcon={changeAvailableIcon}
              platformInfo={platformInfo}
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
              platformInfo={platformInfo}
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
              platformInfo={platformInfo}
            />
          ) : v.type === "btn_template" ? (
            <ButtonTemplatePreview
              v={v}
              i={i}
              now={now}
              setVirtualKeyboard={setVirtualKeyboard}
              setClickedMainInput={setClickedMainInput}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              changeAvailableIcon={changeAvailableIcon}
              platformInfo={platformInfo}
            />
          ) : null
        )}
    </>
  );
};

export default TelegramPreview;
