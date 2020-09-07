import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import axios from "axios";
import "./Preview.css";

import PersistentMenu from "./LinePreview/AdvancePreview/PersistentMenu";
import VirtualKeyboard from "./TelegramPreview/AdvancePreview/VirtualKeyboard";
import TelegramPreview from "./TelegramPreview/TelegramPreview";
import LinePreview from "./LinePreview/LinePreview";
// import Slider from "./Slider";

const Preview = ({
  mainKeyword,
  keywordContentList,
  keywordObject,
  keywordList,
  mainKeywordObject,
  setKeywordObject,
  onClickCurrent,
  setClickedMainInput,
  addFlag,
  setAddFlag,
  firstEntry,
  setFirstEntry,
  clickedMainInput,
  virtualKeyboard,
  setVirtualKeyboard,
  index,
  now,
  setNow,
  curListCount,
  setCurListCount,
  availableIcon,
  setAvailableIcon,
}) => {
  const currentInput =
    now !== -1 && keywordObject[index] && keywordObject[index].contents[now];
  const currentContent =
    now !== -1 &&
    keywordObject[index] &&
    keywordObject[index].contents[now] &&
    keywordObject[index].contents[now].content;
  const contentRef = useRef(null);

  const { currentChatbot } = useSelector((state) => state.chatbot);
  const platformInfo =
    currentChatbot && JSON.parse(currentChatbot.platformInfo);
  //post
  const onClickButton = () => {
    const count = keywordObject.length;
    // axios.post("/api/chatbotbuild", { count }).then(res => console.log(res));

    const nowKeyword = keywordObject[index];
    axios
      .post("/api/chatbotbuild", { nowKeyword, keywordObject })
      .then((res) => console.log(res));
  };

  // 아이콘 호환여부 설정
  const useableInfo = [
    { name: "text", value: [0, 0] },
    { name: "image", value: [0, 0] },
    { name: "video", value: [0, 0] },
    { name: "audio", value: [0, 0] },
    { name: "location", value: [0, 0] },
    { name: "file", value: [0, 0] },
    { name: "list", value: [1, 0] },
    { name: "sticker", value: [0, 0] },
    { name: "btn_template", value: [0, 1] },
    { name: "carousel", value: [0, 1] },
    { name: "img_carousel", value: [0, 1] },
    { name: "sticker", value: [0, 1] },
  ];

  const changeAvailableIcon = (tool) => {
    for (let i = 0; i < useableInfo.length; i++) {
      if (useableInfo[i].name === tool) {
        console.log(tool);
        setAvailableIcon(
          availableIcon.map((ai, index) => ({
            ...ai,
            use: useableInfo[i].value[index] ? false : true,
          }))
        );
      }
    }
  };

  //삭제
  const onDelete = (id, isList) => {
    let tmp = keywordObject[index].contents.findIndex(
      (content, i) => content.id === id
    );
    console.log(tmp, id);
    setClickedMainInput(false);
    if (now > tmp) {
      setNow(now - 1);
    } else if (id === tmp) {
      setNow(-1);
    }

    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents.splice(
          draft[index].contents.findIndex((content) => content.id === id),
          1
        );
        if (isList === "list") {
          draft[index].completed = false;
        }
      })
    );
  };
  useEffect(() => {
    if (firstEntry === true) {
      contentRef.current.scrollTop = 0; // 키워드 클릭 시 스크롤 초기화
      setFirstEntry(false);
    } else if (addFlag === true) {
      //
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
      setAddFlag(false);
    }
  });
  useEffect(() => {
    //챗봇 데이터 로딩
    axios
      .get("/api/chatbotbuild")
      .then((res) => setKeywordObject(JSON.parse(res.data.keyword)));
  }, []);

  // 메인 헤더 - 테마 선택 옵션
  const [theme, setTheme] = useState("telegram");

  return (
    <>
      <div className="main-header">
        <div className="main-header-theme">
          <select
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value);
            }}
          >
            <option value="none" disabled>
              ================= 테마 선택 =================
            </option>
            <option value="telegram">텔레그램</option>
            <option value="line">라인</option>
          </select>
        </div>
      </div>
      <div
        className={
          theme === "default"
            ? "main-contents main-contents-default"
            : theme === "telegram"
            ? "main-contents main-contents-telegram"
            : theme === "line"
            ? "main-contents main-contents-line"
            : theme === "facebook"
            ? "main-contents main-contents-facebook"
            : "main-contents"
        }
        ref={contentRef}
      >
        {theme === "telegram" ? (
          <TelegramPreview
            changeAvailableIcon={changeAvailableIcon}
            index={index}
            keywordObject={keywordObject}
            now={now}
            onDelete={onDelete}
            setClickedMainInput={setClickedMainInput}
            setKeywordObject={setKeywordObject}
            setVirtualKeyboard={setVirtualKeyboard}
            setNow={setNow}
            platformInfo={platformInfo}
          />
        ) : theme === "line" ? (
          <LinePreview
            changeAvailableIcon={changeAvailableIcon}
            index={index}
            keywordObject={keywordObject}
            now={now}
            onDelete={onDelete}
            setClickedMainInput={setClickedMainInput}
            setKeywordObject={setKeywordObject}
            setVirtualKeyboard={setVirtualKeyboard}
            setNow={setNow}
            platformInfo={platformInfo}
          />
        ) : null}
      </div>
      {theme === "telegram" ? (
        <VirtualKeyboard
          clickedMainInput={clickedMainInput}
          currentInput={currentInput}
          index={index}
          keywordObject={keywordObject}
          now={now}
          virtualKeyboard={virtualKeyboard}
          curListCount={curListCount}
          setCurListCount={setCurListCount}
          setKeywordObject={setKeywordObject}
        />
      ) : theme === "line" ? (
        <PersistentMenu
          clickedMainInput={clickedMainInput}
          currentInput={currentInput}
          index={index}
          keywordObject={keywordObject}
          now={now}
          virtualKeyboard={virtualKeyboard}
          curListCount={curListCount}
          setCurListCount={setCurListCount}
          setKeywordObject={setKeywordObject}
        />
      ) : null}
    </>
  ); /**retun END */
};
export default Preview;
