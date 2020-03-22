import React, { useState, useCallback } from "react";
import PrevTab from "./BuilderNavContents/PrevTab.js";
import PrevContent from "./BuilderNavContents/PrevContent.js";
import "./ChatbotBuild.css";
import BuilderInfo from "./BuilderInfo";
import Tabs from ".//Tabs";
import ToolBasic from ".//ToolBasic";
import ToolAdvance from ".//ToolAdvance";
import ToolKeyword from ".//ToolKeyword";
import ToolStatus from "./ToolStatus";
import Main from ".//Main";
import MessageForAll from "./BuilderNavContents/MessageForAll";

const ChatbotBuild = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [keyword, setKeyword] = useState("");
  const [keywordList, setKeywordList] = useState(["Welcome"]);
  const [keywordContentList, setKeywordContentList] = useState([]);
  const [keywordObject, setKeywordObject] = useState([
    { keyword: "Welcome", id: 1, contents: [], completed:false}
  ]);
  const [mainKeyword, setMainKeyword] = useState(keywordObject[0].keyword);
  const [clickedMainInput, setClickedMainInput] = useState({});
  const [addFlag, setAddFlag] = useState(false); // 컨텐츠 추가 flag
  const [firstEntry, setFirstEntry] = useState(true); // 키워드 진입 flag
  const [virtualKeyboard, setVirtualKeyboard] = useState(false);
  const [now, setNow] = useState(-1); // 현재 작업중인 status id 번호
  // 키보드(리스트) 요소에서 연동한 키워드 종류
  const initialKP = [
    // list 팝업에서 선택한 변수.
    { id: 0, value: "키워드 연동" },
    { id: 1, value: "키워드 연동" },
    { id: 2, value: "키워드 연동" },
    { id: 3, value: "키워드 연동" },
    { id: 4, value: "키워드 연동" },
    { id: 5, value: "키워드 연동" }
  ];
  const [keywordPopup, setKeywordPopup] = useState(initialKP);

  const index = keywordObject.findIndex(v => v.keyword === mainKeyword);
  const length =
    keywordObject[index] && keywordObject[index].contents.length - 1;

  const onSelect = useCallback(tab => {
    setActiveTab(tab);
  }, []);
  // 키워드 클릭했을시
  const onClickKeyword = useCallback(
    keyword => () => {
      setNow(-1);
      setMainKeyword(keyword);
      setClickedMainInput("");
      setFirstEntry(true); // 키워드 클릭 시, 스크롤 초기화 (맨 위로 가서 keyword-title 보이게 함)
      setVirtualKeyboard(false); // 키워드 클릭 시, Main의 '리스트' 하단 바 초기화(하단 바 안 보임)
    },
    [keywordObject.length]
  );

  {
    /* 오른쪽 사이드바 fold 동적 프로그래밍 코드*/
  }
  const [mainWidth, setMainWidth] = useState("calc(100vw - 50px)");
  const [navWidth, setNavWidth] = useState("50px");
  const [leftArrowDisplay, setLeftArrowDisplay] = useState("block");
  const [rightArrowDisplay, setRightArrowDisplay] = useState("none");
  const [activePrevTab, setActivePrevTab] = useState("preview");
  const [prevTabPosition, setPrevTabPosition] = useState("0px");
  const [prevDisplay, setPrevDisplay] = useState(false);
  const mainStyle = {
    width: mainWidth,
    transition: ".5s width"
  };
  const navStyle = {
    width: navWidth,
    transition: ".5s width"
  };
  const rightArrow = {
    display: rightArrowDisplay
  };
  const leftArrow = {
    display: leftArrowDisplay
  };
  const PrevTabStyle = {
    marginLeft: prevTabPosition,
    transition: ".8s all"
  };
  const defaultPreviewStyle = {
    display: "none"
  };
  const onSelectPrev = useCallback(prevtab => {
    setActivePrevTab(prevtab);
  }, []);

  const foldNav = e => {
    if (navWidth === "400px") {
      setNavWidth("50px");
      setMainWidth("calc(100vw - 50px)");
      setLeftArrowDisplay("block");
      setRightArrowDisplay("none");
      setPrevTabPosition("0px");
      setPrevDisplay(false);
    } else {
      setNavWidth("400px");
      setMainWidth("calc(100vw - 430px)");
      setLeftArrowDisplay("none");
      setRightArrowDisplay("block");
      setPrevTabPosition("-50px");
      setPrevDisplay(true);
    }
  };
  return (
    <div className="builder">
      {console.log(keywordObject)}
      {console.log("main=", mainKeyword, "now=", now)}
      <div className="builder__column builder-info" style={mainStyle}>
        <BuilderInfo />
      </div>
      <div className="builder__column builder-main" style={mainStyle}>
        <div className="builderTool">
          <div className="tool-menu">
            <div className="tool-tabs">
              <Tabs activeTab={activeTab} onSelect={onSelect}>
                <div label="basic">기본</div>
                <div label="advance">고급</div>
                <div label="keyword">키워드</div>
              </Tabs>
            </div>
            <div className="tool-contents">
              {activeTab === "basic" && (
                <ToolBasic
                  keywordObject={keywordObject}
                  mainKeyword={mainKeyword}
                  setAddFlag={setAddFlag}
                  setClickedMainInput={setClickedMainInput}
                  setKeywordObject={setKeywordObject}
                  setNow={setNow}
                  length={length}
                />
              )}
              {activeTab === "advance" && (
                <ToolAdvance
                  keywordObject={keywordObject}
                  mainKeyword={mainKeyword}
                  setAddFlag={setAddFlag}
                  setClickedMainInput={setClickedMainInput}
                  setKeywordObject={setKeywordObject}
                  setNow={setNow}
                  setVirtualKeyboard={setVirtualKeyboard}
                  length={length}
                />
              )}
              {activeTab === "keyword" && (
                <ToolKeyword
                  keyword={keyword}
                  keywordList={keywordList}
                  setKeyword={setKeyword}
                  setKeywordList={setKeywordList}
                  keywordObject={keywordObject}
                  onClickKeyword={onClickKeyword}
                  setKeywordObject={setKeywordObject}
                  index = {index}

                />
              )}
            </div>
          </div>
          <div className="tool-status">
            {(activeTab === "basic" || activeTab === "advance") && (
              <ToolStatus
                mainKeyword={mainKeyword}
                keywordObject={keywordObject}
                setKeywordObject={setKeywordObject}
                clickedMainInput={clickedMainInput}
                now={now}
                index={index}
                setNow={setNow}
                setClickedMainInput={setClickedMainInput}
                keywordPopup={keywordPopup}
                setKeywordPopup={setKeywordPopup}
              />
            )}
          </div>
        </div>
        <div className="builderMain">
          <Main
            mainKeyword={mainKeyword}
            keywordContentList={keywordContentList}
            keywordObject={keywordObject}
            keywordList={keywordList}
            setKeywordObject={setKeywordObject}
            setClickedMainInput={setClickedMainInput}
            addFlag={addFlag}
            setAddFlag={setAddFlag}
            firstEntry={firstEntry}
            setFirstEntry={setFirstEntry}
            clickedMainInput={clickedMainInput}
            virtualKeyboard={virtualKeyboard}
            setVirtualKeyboard={setVirtualKeyboard}
            now={now}
            index={index}
            setNow={setNow}
          />
        </div>
      </div>

      {/* 챗봇 빌더 오른쪽 사이드 바 기본 레이아웃*/}
      <div className="builderNav" style={navStyle}>
        <div className="builderNav-btn" onClick={foldNav}>
          <i className="fas fa-angle-double-right" style={rightArrow}></i>
          <i className="fas fa-angle-double-left" style={leftArrow}></i>
        </div>
        <div className="preview">
          <ul className="preview-tab" style={PrevTabStyle}>
            <PrevTab activePrevTab={activePrevTab} onSelectPrev={onSelectPrev}>
              <li label="preview">tab1</li>
              <li label="all-message">전체메세지</li>
              <li label="tab3">tab3</li>
            </PrevTab>
          </ul>
          <PrevContent
            activePrevTab={activePrevTab}
            style={!prevDisplay ? defaultPreviewStyle : null}
          >
            <div label="preview">---------------@---------------</div>
            <div label="all-message">
              <MessageForAll/>
            </div>
            <div label="tab3">
              -----------♥-----------♥---------♥------------------
            </div>
          </PrevContent>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBuild;
