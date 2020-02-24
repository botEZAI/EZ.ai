import React, { useState } from "react";
import produce from "immer";

const ToolBasic = ({
  mainKeyword,
  keywordObject,
  setKeywordObject,
  setClickedMainInput,
  setAddFlag
}) => {
  const onClickTool = tool => {
    console.log("onClickTool");
    mainKeyword
      ? setKeywordObject(
          produce(keywordObject, draft => {
            const object = draft.find(t => t.keyword === mainKeyword);
            tool === "location"
              ? object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
                  content: { title: "", latitude: "", longtitude: "" }
                })
              : object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
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
      {console.log("Toolbasic")}
      <div
        className="tool-basic tool-basic-text"
        onClick={() => onClickTool("text")}
      >
        <i className="far fa-comment-alt"></i>
        텍스트
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => onClickTool("image")}
      >
        <i className="fas fa-image"></i>
        이미지
      </div>
        <div
            className="tool-basic tool-basic-list"
            onClick={() => onClickTool("video")}
        >
            <i className="fas fa-video"></i>
            동영상
        </div>
        <div
            className="tool-basic tool-basic-list"
            onClick={() => onClickTool("audio")}
        >
            <i className="fas fa-file-audio"></i>
            음성
        </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => onClickTool("location")}
      >
        <i className="fas fa-map-marked-alt"></i>
        위치
      </div>
        <div
            className="tool-basic tool-basic-list"
            onClick={() => onClickTool("file")}
        >
            <i className="fas fa-file"></i>
            파일
        </div>
    </>
  );
};

export default ToolBasic;
