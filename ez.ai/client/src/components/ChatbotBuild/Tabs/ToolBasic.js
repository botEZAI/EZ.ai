import React, { useState } from "react";
import produce from "immer";

const ToolBasic = ({
  keywordObject,
  mainKeyword,
  setAddFlag,
  setClickedMainInput,
  setKeywordObject,
  setNow,
  length,
  availableIcon,
  setAvailableIcon,
}) => {
  const onClickTool = tool => {
    console.log("onClickTool");
    mainKeyword
      ? setKeywordObject(
          produce(keywordObject, draft => {
            const object = draft.find(t => t.keyword === mainKeyword);
            if (!object.completed) {
              object.contents.length === 0
                ? tool === "location"
                  ? object.contents.push({
                      type: tool,
                      id: 1,
                      title: "",
                      latitude: "",
                      longtitude: "",
                      listContent: {
                        question: "",
                        elem: ["", "", "", "", "", ""],
                        keywordLink: ["", "", "", "", "", ""],
                        contentLen: 2
                      }
                    })
                  : object.contents.push({
                      type: tool,
                      id: 1,
                      content: "",
                      filepath: "",
                      listContent: {
                        question: "",
                        elem: ["", "", "", "", "", ""],
                        keywordLink: ["", "", "", "", "", ""],
                        contentLen: 2
                      }
                    })
                : tool === "location"
                ? object.contents.push({
                    type: tool,
                    id: object.contents[object.contents.length - 1].id + 1,
                    title: "",
                    latitude: "",
                    longtitude: "",
                    listContent: {
                      question: "",
                      elem: ["", "", "", "", "", ""],
                      keywordLink: ["", "", "", "", "", ""],
                      contentLen: 2
                    }
                  })
                : object.contents.push({
                    type: tool,
                    id: object.contents[object.contents.length - 1].id + 1,
                    content: "",
                    filepath: "",
                    listContent: {
                      question: "",
                      elem: ["", "", "", "", "", ""],
                      keywordLink: ["", "", "", "", "", ""],
                      contentLen: 2
                    }
                  });
              setAddFlag(true);
              setAvailableIcon(availableIcon.map(i=> ({...i, use : true})))
            } else {
              alert(
                "[버튼형 리스트] 생성 후, 요소 추가가 안됩니다.\n요소 추가를 원하시면, [버튼형 리스트]를 삭제하세요."
              );
              setAvailableIcon(availableIcon.map(i=> ({...i, use : false})))
            }
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
