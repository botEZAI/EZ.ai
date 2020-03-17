import React from "react";
import "./KeywordPopUp.css";
import produce from "immer";

const KeywordPopUp = ({
  keywordObject,
  currentContent,
  currentElemIndex,
  setKeywordObject,
  now,
  index
}) => {
  const setListKeyword = keyword => {
    setKeywordObject(
      produce(keywordObject, draft => {
        draft[index].contents[now].listContent.keywordLink[
          currentElemIndex
        ] = keyword;
      })
    );
  };

  return (
    <div className="keyword-popup">
      <div className="keyword-name">keyword 목록</div>
      {keywordObject.map((keyword, index) => {
        return (
          <div
            key={index}
            label={keyword.keyword}
            onClick={() => setListKeyword(keyword.keyword)}
            className="keyword-list"
          >
            {keyword.keyword}
          </div>
        );
      })}
    </div>
  );
};

export default KeywordPopUp;
