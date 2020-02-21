import React, { useState, useCallback } from "react";
import Preview from "./BuilderNavContents/Preview";
import "./ChatbotBuild.css";
import Tabs from ".//Tabs";
import ToolBasic from ".//ToolBasic";
import ToolAdvance from ".//ToolAdvance";
import ToolKeyword from ".//ToolKeyword";
import ToolStatus from "./ToolStatus";
import Main from ".//Main";

const ChatbotBuild = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [keyword, setKeyword] = useState("");
  const [keywordList, setKeywordList] = useState(["Welcome"]);
  const [mainKeyword, setMainKeyword] = useState("");
  const [keywordContentList, setKeywordContentList] = useState([]);
  const [keywordObject, setKeywordObject] = useState([{keyword: "Welcome", id: 1, contents: []}]);
  const [clickedMainInput, setClickedMainInput] = useState({});
  const [addFlag, setAddFlag] = useState(false); // 컨텐츠 추가 flag
  const [firstEntry, setFirstEntry] = useState(true); // 키워드 진입 flag

  const onSelect = useCallback(tab => {
    setActiveTab(tab);
    console.log("onSelect");
  }, []);

  // 키워드 클릭했을시
  const onClickKeyword = useCallback(keyword => {
    setMainKeyword(keyword);
    setClickedMainInput("");
    console.log("onclIkkeywod");
    setFirstEntry(true); // 키워드 클릭 시 스크롤 초기화 
  }, []);

  {
    /* 오른쪽 사이드바 fold 동적 프로그래밍 코드*/
  }
  const [mainWidth, setMainWidth] = useState("calc(100vw - 50px)");
  const [navWidth, setNavWidth] = useState("50px");
  const [leftArrowDisplay, setLeftArrowDisplay] = useState("block");
  const [rightArrowDisplay, setRightArrowDisplay] = useState("none");

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

  const foldNav = e => {
    if (navWidth === "400px") {
      setNavWidth("50px");
      setMainWidth("calc(100vw - 50px)");
      setLeftArrowDisplay("block");
      setRightArrowDisplay("none");
    } else {
      setNavWidth("400px");
      setMainWidth("calc(100vw - 400px)");
      setLeftArrowDisplay("none");
      setRightArrowDisplay("block");
    }
  };
  return (
    <div className="builder">
      <div className="builder__column" style={mainStyle}>
        <div className="builderTool">
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
                mainKeyword={mainKeyword}
                keywordObject={keywordObject}
                setKeywordObject={setKeywordObject}
                setClickedMainInput={setClickedMainInput}
                setAddFlag={setAddFlag}
              />
            )}
            {activeTab === "advance" && (
              <ToolAdvance
                mainKeyword={mainKeyword}
                keywordObject={keywordObject}
                setKeywordObject={setKeywordObject}
                setClickedMainInput={setClickedMainInput}
                setAddFlag={setAddFlag}
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
              />
            )}
          </div>
          <div className="tool-status">
            {(activeTab === "basic" || activeTab === "advance") && (
              <ToolStatus
                mainKeyword={mainKeyword}
                keywordObject={keywordObject}
                setKeywordObject={setKeywordObject}
                clickedMainInput={clickedMainInput}
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
          />
        </div>
      </div>

      {/* 챗봇 빌더 오른쪽 사이드 바 기본 레이아웃*/}
      <div className="builder__column builderNav" style={navStyle}>
        <div className="builderNav-btn" onClick={foldNav}>
          <i className="fas fa-angle-double-right" style={rightArrow}></i>
          <i className="fas fa-angle-double-left" style={leftArrow}></i>
        </div>
        <Preview />
      </div>
    </div>
  );
};

export default ChatbotBuild;
