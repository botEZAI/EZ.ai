import React, { useState } from "react";
import produce from "immer";

const ToolBasic = ({
  mainKeyword,
  onClickBasic,
  setGarbage,
  keywordObject,
  setKeywordObject
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
          })
        )
      : alert("키워드를 선택하세요");
    console.log(keywordObject);
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
        onClick={() => onClickTool("location")}
      >
          <i className="fas fa-map-marked-alt"></i>
        위치
      </div>
    </>
  );
};

export default ToolBasic;
