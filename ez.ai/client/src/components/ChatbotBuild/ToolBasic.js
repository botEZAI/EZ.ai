import React, { useState } from "react";

const ToolBasic = ({ mainKeyword, onClickBasic }) => {
  const onClickTool = tool => {
    mainKeyword ? onClickBasic(tool) : alert("키워드를 선택하세요");
  };
  return (
    <>
      <div
        className="tool-basic tool-basic-text"
        onClick={() => onClickTool("text")}
      >
        text
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => onClickTool("list")}
      >
        list
      </div>
    </>
  );
};

export default ToolBasic;
