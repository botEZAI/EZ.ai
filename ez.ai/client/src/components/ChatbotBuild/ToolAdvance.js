import React, { useState } from "react";
import produce from "immer";

const ToolAdvance = ({
  mainKeyword,
  onClickBasic,
  keywordObject,
  setKeywordObject
}) => {
  const onClickTool = tool => {
    console.log("onClickTool");
    mainKeyword
      ? setKeywordObject(
          produce(keywordObject, draft => {
            const object = draft.find(t => t.keyword === mainKeyword);
            object.contents.push({
              type: tool,
              id: object.contents.length + 1,
              entity: "",
              content: ""
            });
          })
        )
      : alert("키워드를 선택하세요");
    console.log(keywordObject);
  };
  return (
    <>
      {console.log("Tooladvance")}
      <div
        className="tool-basic tool-basic-text"
        onClick={() => onClickTool("list")}
      >
        list
      </div>
    </>
  );
};

export default ToolAdvance;
