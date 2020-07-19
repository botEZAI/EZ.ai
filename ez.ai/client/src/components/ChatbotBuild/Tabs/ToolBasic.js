import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  const { currentChatbot } = useSelector((state) => state.chatbot);
  const platformInfo =
    currentChatbot && JSON.parse(currentChatbot.platformInfo);

  const onClickTool = (tool) => {
    mainKeyword
      ? setKeywordObject(
          produce(keywordObject, (draft) => {
            const object = draft.find((t) => t.keyword === mainKeyword);
            const lastType =
              object.contents.length !== 0
                ? object.contents[object.contents.length - 1].type
                : tool;

            if (!object.completed) {
              if (object.contents.length === 0) {
                if (tool === "location") {
                  object.contents.push({
                    type: tool,
                    id: 1,
                    title: "",
                    latitude: "",
                    longtitude: "",
                    listContent: {
                      question: "",
                      elem: ["", "", "", "", "", ""],
                      keywordLink: ["", "", "", "", "", ""],
                      contentLen: 2,
                    },
                  });
                } else {
                  object.contents.push({
                    type: tool,
                    id: 1,
                    content: "",
                    filepath: "",
                    listContent: {
                      question: "",
                      elem: ["", "", "", "", "", ""],
                      keywordLink: ["", "", "", "", "", ""],
                      contentLen: 2,
                    },
                  });
                }
              } else {
                //만약 라인이 연동돼있고 한 키워드에 4개보다 많은 메세지가 입력되면 오류
                if (platformInfo[0].connect && object.contents.length === 4) {
                  return alert(
                    "라인에서는 한 키워드에 4개의 메세지만 입력할 수 있습니다."
                  );
                }
                if (tool === "location") {
                  object.contents.push({
                    type: tool,
                    id: object.contents[object.contents.length - 1].id + 1,
                    title: "",
                    latitude: "",
                    longtitude: "",
                    listContent: {
                      question: "",
                      elem: ["", "", "", "", "", ""],
                      keywordLink: ["", "", "", "", "", ""],
                      contentLen: 2,
                    },
                  });
                } else {
                  object.contents.push({
                    type: tool,
                    id: object.contents[object.contents.length - 1].id + 1,
                    content: "",
                    filepath: "",
                    listContent: {
                      question: "",
                      elem: ["", "", "", "", "", ""],
                      keywordLink: ["", "", "", "", "", ""],
                      contentLen: 2,
                    },
                  });
                  setAddFlag(true);
                  setAvailableIcon(
                    availableIcon.map((i) => ({ ...i, use: true }))
                  );
                }
              }
            } else {
              if (lastType === "list") {
                // 마지막 요소 타입이 list
                alert(
                  "[고정 메뉴] 생성 후, 더 이상의 요소 생성이 안 됩니다.\n생성을 원하시면, [고정 메뉴]를 삭제하세요."
                );
              } else if (lastType === "btn_template") {
                alert(
                  "[버튼형 템플릿] 생성 후, 더 이상의 요소 생성이 안 됩니다.\n생성을 원하시면, [버튼형 템플릿]을 삭제하세요."
                );
              }
              setAvailableIcon(
                availableIcon.map((i) => ({ ...i, use: false }))
              );
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
    </>
  );
};

export default ToolBasic;
