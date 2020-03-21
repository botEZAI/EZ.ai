import React, { useState } from "react";
import produce from "immer";

const ToolAdvance = ({
  keywordObject,
  mainKeyword,
  onClickBasic,
  setAddFlag,
  setClickedMainInput,
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
            if(!object.completed){
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
                  object.completed = true;
            }else{
              alert('[버튼형 리스트] 생성 후, 요소 추가가 안됩니다.\n요소 추가를 원하시면, [버튼형 리스트]를 삭제하세요.')
            }
            
          })
        )
      : alert("키워드를 선택하세요");
    setClickedMainInput("");
  };
  console.log(keywordObject);
  return (
    <>
      {console.log("Tooladvance")}
      <div
        className="tool-basic tool-basic-text"
        onClick={() =>{        
          onClickTool("list");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-list"></i>
        버튼형 리스트
      </div>
      <div
        className="tool-basic tool-basic-text"
        onClick={() => {
          onClickTool("sticker");
          setNow(length + 1);
        }}
      >
        <i className="far fa-laugh"></i>
        스티커
      </div>
    </>
  );
};

export default ToolAdvance;
