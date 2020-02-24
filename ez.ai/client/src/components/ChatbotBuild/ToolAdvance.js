import React, { useState } from "react";
import produce from "immer";

const ToolAdvance = ({
  mainKeyword,
  onClickBasic,
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
            tool === "list"
              ? object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
                  content: { question:"", elem:["", "", "", "", "", ""] }
                })
              : object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
                  content: []
                });
                setAddFlag(true);
          })
        )
      : alert("키워드를 선택하세요");
    setClickedMainInput("");
    console.log(keywordObject);
  };
  return (
    <>
      {console.log("Tooladvance")}
      <div
        className="tool-basic tool-basic-text"
        onClick={() => onClickTool("list")}
      >
        <i className="fas fa-list"></i>
        버튼형 리스트
      </div>
        <div
            className="tool-basic tool-basic-text"
            onClick={() => onClickTool("sticker")}
        >
            <i className="far fa-laugh"></i>
            스티커
        </div>
    </>
  );
};

export default ToolAdvance;
