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
  const [keywordList, setKeywordList] = useState([]);
  const [mainKeyword, setMainKeyword] = useState("");
  const [keywordContentList, setKeywordContentList] = useState([]);
  const [keywordObject, setKeywordObject] = useState([]);
  const [mainKeywordObject, setMainKeywordObject] = useState({});
  const [garbage, setGarbage] = useState("");
  const onSelect = useCallback(tab => {
    setActiveTab(tab);
    console.log("onSelect");
  }, []);

  // const onClickBasic = useCallback(
  //   e => {
  //     console.log("onClickBasic");
  //     const keywordIndex = keywordObject.findIndex(
  //       v => v.keyword === mainKeyword
  //     );
  //     const smainKeywordObject = keywordObject[keywordIndex];

  //     smainKeywordObject.contents = [
  //       ...smainKeywordObject.contents,
  //       { type: e, content: null }
  //     ];
  //     console.log(keywordObject);
  //     console.log("smain=", smainKeywordObject);
  //     setMainKeywordObject(keywordObject[keywordIndex]);
  //     console.log("main=", mainKeywordObject);
  //   },
  //   [keywordObject, mainKeyword, mainKeywordObject]
  // );
  const onClickKeyword = useCallback(keyword => {
    setMainKeyword(keyword);
    console.log("onclIkkeywod");
    console.log(mainKeywordObject);
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
                setGarbage={setGarbage}
              />
            )}
            {activeTab === "advance" && (
              <ToolAdvance
                mainKeyword={mainKeyword}
                keywordObject={keywordObject}
                setKeywordObject={setKeywordObject}
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
                mainKeywordObject={mainKeywordObject}
              />
            )}
          </div>
          <div className="tool-status">
            {(activeTab === "basic" || activeTab === "advance") && (
              <ToolStatus
                mainKeyword={mainKeyword}
                keywordObject={keywordObject}
                setKeywordObject={setKeywordObject}
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
            mainKeywordObject={mainKeywordObject}
            setKeywordObject={setKeywordObject}
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
