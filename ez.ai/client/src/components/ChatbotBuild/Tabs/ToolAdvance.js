import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  availableIcon,
  setAvailableIcon,
}) => {
  /* 고급 요소 플랫폼별 이용 가능 여부 */
  const useableInfo = [
    { name: "list", value: [true, true, true] },
    { name: "btn_template", value: [true, true, false] },
  ];

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
              if (tool === "list") {
                //고정메뉴
                object.completed = true;
                object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
                  listContent: {
                    question: "",
                    elem: ["", "", "", "", "", ""],
                    keywordLink: ["", "", "", "", "", ""],
                    contentLen: 2,
                  },
                });
              } else if (tool === "btn_template") {
                //버튼템플릿
                object.completed = true;
                object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
                  content: {
                    type: "buttons",
                    thumbnailImageUrl: "",
                    imageSize: "cover",
                    imageBackgroundColor: "#FFFFFF",
                    title: "",
                    text: "",
                    defaultAction: {
                      // 사진, 이미지, 제목등 탭했을때
                      type: "uri",
                      label: "",
                      uri: "",
                    },
                    actions: [
                      // 최대 4개
                      {
                        id: 0,
                        type: "uri",
                        label: "",
                        uri: "",
                        data: "",
                        text: "",
                      },
                    ],
                  },
                });
              } else {
                object.contents.push({
                  type: tool,
                  id: object.contents.length + 1,
                  content: [],
                });
              }
              setAddFlag(true); // 컨텐츠 추가됨 => 스크롤 하단으로 이동
              setVirtualKeyboard(true); // 새 '리스트' 생성 시, Main 에서 바로 하단 바 보이게 함

              /* 사용 가능한 sns 정보 설정 */
              for (let i = 0; i < useableInfo.length; i++) {
                if (useableInfo[i].name === tool) {
                  setAvailableIcon(
                    availableIcon.map((ai, index) => ({
                      ...ai,
                      use: useableInfo[i].value[index],
                    }))
                  );
                }
              }
            } else {
              //keyword의 complete가 false인 상태
              if (lastType === "list") {
                // 마지막 요소 타입이 list
                alert(
                  "[고정 메뉴] 생성 후, 더 이상의 요소 생성이 안 됩니다.\n생성을 원하시면, [고정 메뉴]를 삭제하세요."
                );
              } else if (lastType === "btn_template") {
                alert(
                  "[버튼형 템플릿] 생성 후, 더 이상의 요소 생성이 안 됩니다.\n 생성을 원하시면, [버튼형 템플릿]을 삭제하세요."
                );
              }
              setAvailableIcon(
                availableIcon.map((ai, index) => ({ ...ai, use: false }))
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
          onClickTool("list");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-border-all"></i>
        고정 메뉴
      </div>

      <div
        className="tool-basic tool-basic-text"
        onClick={() => {
          onClickTool("btn_template");
          setNow(length + 1);
        }}
      >
        <i className="fas fa-th-large"></i>
        버튼
        <br />
        템플릿
      </div>
    </>
  );
};

export default ToolAdvance;
