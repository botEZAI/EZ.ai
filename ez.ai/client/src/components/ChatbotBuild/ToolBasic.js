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
        text
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => onClickTool("image")}
      >
        image
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => onClickTool("location")}
      >
        location
      </div>
    </>
  );
};

export default ToolBasic;
