import React, { useState, useCallback } from "react";
import BuilderNav from "./BuilderNavContents/BuilderNav"
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
  const [keywordObject, setKeywordObject] = useState([
    {
      keyword: null,
      content: []
    }
  ]);

  const onSelect = useCallback(tab => setActiveTab(tab), []);
  const onClickKeyword = keyword => {
    setMainKeyword(keyword);
  };

  const onClickBasic = e => {
    console.log(e);

    setKeywordContentList([...keywordContentList, { type: e }]);
    console.log(keywordContentList);
    // console.log(keywordContentList);
    // keywordsData.current = keywordList.map(keyword => {
    //   return (keywordObject.current = {
    //     mainKeyword: keyword,
    //     content: keyword
    //   });
    // });
    // console.log(keywordsData.current[0]);
  };
  return (
    <div className="builder">
      <div className = "builder__column">
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
              <ToolBasic mainKeyword={mainKeyword} onClickBasic={onClickBasic} />
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
              />
            )}
          </div>
        </div>
        <div className="builderMain">
          <Main
            mainKeyword={mainKeyword}
            keywordContentList={keywordContentList}
          />
        </div>
      </div>
      <BuilderNav />
    </div>
  );
};

export default ChatbotBuild;
