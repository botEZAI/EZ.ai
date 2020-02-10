import React, { useState, useCallback } from "react";
import BuilderNav from "./BuilderNavContents/BuilderNav";
import "./ChatbotBuild.css";
import Tabs from ".//Tabs";
import ToolBasic from ".//ToolBasic";
import ToolAdvance from ".//ToolAdvance";
import ToolKeyword from ".//ToolKeyword";
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
  return (
    <div className="builder">
      <div className="builder__column">
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
            {activeTab === "advance" && <ToolAdvance />}
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
      <BuilderNav />
    </div>
  );
};

export default ChatbotBuild;
