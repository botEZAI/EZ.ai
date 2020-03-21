import React, { useState } from "react";
import produce from "immer";

const ToolAdvance = ({
  keywordCompleted,
  keywordObject,
  mainKeyword,
  onClickBasic,
  setAddFlag,
  setClickedMainInput,
  setKeywordCompleted,
  setKeywordObject,
  setNow,
  setVirtualKeyboard,
  length,
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
                  listContent: {
                    question: "",
                    elem: ["", "", "", "", "", ""],
                    keywordLink: ["", "", "", "", "", ""]
                  }
                })
              : object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
                  content: []
                });
            setAddFlag(true); // 컨텐츠 추가됨 => 스크롤 하단으로 이동
            setVirtualKeyboard(true); // 새 '리스트' 생성 시, Main 에서 바로 하단 바 보이게 함
            setKeywordCompleted(true);
          })
        )
      : alert("키워드를 선택하세요");
    setClickedMainInput("");
    console.log(keywordObject);
  };
  const AlertForKeywordCompleted = () => {
    alert(`[고급] > [버튼형 리스트] 생성 후, 어떤 요소도 추가할 수 없습니다. \n요소 추가를 원하시면 생성한 [버튼형 리스트]를 삭제하세요.`);
  }
  const handleClick = tool => {
    keywordCompleted 
      ? AlertForKeywordCompleted()
      : 
        onClickTool(tool);
        setNow(length + 1);
  }
  return (
    <>
      {console.log("Tooladvance")}
      <div
        className="tool-basic tool-basic-text"
        onClick={() => handleClick("list")}
      >
        <i className="fas fa-list"></i>
        버튼형 리스트
      </div>
      <div
        className="tool-basic tool-basic-text"
        onClick={() => handleClick("sticker")}
      >
        <i className="far fa-laugh"></i>
        스티커
      </div>
    </>
  );
};

export default ToolAdvance;
