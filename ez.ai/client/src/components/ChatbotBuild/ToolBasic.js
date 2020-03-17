import React, { useState } from "react";
import produce from "immer";

const ToolBasic = ({
  mainKeyword,
  keywordObject,
  setKeywordObject,
  setClickedMainInput,
  setAddFlag,
  setNow,
  length
}) => {
  const onClickTool = tool => {
    console.log("onClickTool");
    mainKeyword
      ? setKeywordObject(
          produce(keywordObject, draft => {
            const object = draft.find(t => t.keyword === mainKeyword);
            object.contents.length === 0
              ? tool === "location"
                ? object.contents.push({
                    type: tool,
                    id: 1,
                    title: "",
                    latitude: "",
                    longtitude: ""
                  })
                : object.contents.push({
                    type: tool,
                    id: 1,
                    content: ""
                  })
              : tool === "location"
              ? object.contents.push({
                  type: tool,
                  id: object.contents[object.contents.length - 1].id + 1,
                  title: "",
                  latitude: "",
                  longtitude: ""
                })
              : object.contents.push({
                  type: tool,
                  id: object.contents[object.contents.length - 1].id + 1,
                  content: ""
                });
            setAddFlag(true);
          })
        )
      : alert("키워드를 선택하세요");
    setClickedMainInput("");
  };
  return (
    <>
      <div
        className="tool-basic tool-basic-text"
        onClick={() => {
          onClickTool("text");
          setNow(length + 1);
        }}
      >
        <i className="far fa-comment-alt"></i>
        텍스트
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => {
          onClickTool("image");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-image"></i>
        이미지
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => {
          onClickTool("video");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-video"></i>
        동영상
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => {
          onClickTool("audio");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-file-audio"></i>
        오디오
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => {
          onClickTool("location");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-map-marked-alt"></i>
        위치
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => {
          onClickTool("file");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-file"></i>
        파일
      </div>
    </>
  );
};

export default ToolBasic;
