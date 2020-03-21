import React, { useState } from "react";
import produce from "immer";

const ToolBasic = ({
  keywordCompleted,
  keywordObject,
  mainKeyword,
  setAddFlag,
  setClickedMainInput,
  setKeywordObject,
  setNow,
  length,
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
  const alertForKeywordCompleted = () => {
    alert(`[고급] > [버튼형 리스트] 생성 후, 어떤 요소도 추가할 수 없습니다. \n요소 추가를 원하시면 생성한 [버튼형 리스트]를 삭제하세요.`);
  }
  const handleClick = tool => {
    keywordCompleted 
    ? alertForKeywordCompleted()
    : onClickTool(tool);
      setNow(length + 1);
  }
  return (
    <>
      <div
        className="tool-basic tool-basic-text"
        onClick={() => handleClick("text")}
      >
        <i className="far fa-comment-alt"></i>
        텍스트
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => handleClick("image")}
      >
        <i className="fas fa-image"></i>
        이미지
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => handleClick("video")}
      >
        <i className="fas fa-video"></i>
        동영상
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => handleClick("audio")}
      >
        <i className="fas fa-file-audio"></i>
        오디오
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => handleClick("location")}
      >
        <i className="fas fa-map-marked-alt"></i>
        위치
      </div>
      <div
        className="tool-basic tool-basic-list"
        onClick={() => handleClick("file")}
      >
        <i className="fas fa-file"></i>
        파일
      </div>
    </>
  );
};

export default ToolBasic;
