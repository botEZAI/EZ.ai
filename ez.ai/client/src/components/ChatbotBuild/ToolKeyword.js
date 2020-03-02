import React, { useEffect, useState } from "react";
import produce from "immer";

const ToolKeyword = ({
  keyword,
  keywordList,
  setKeyword,
  setKeywordList,
  onClickKeyword,
  keywordObject,
  setKeywordObject,
  mainKeywordObject
}) => {
  const [value, setValue] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    console.log("onSubmit");

    keyword !== "" && setKeywordList(keywordList => [...keywordList, keyword]);
    keyword !== ""
        ? setKeywordObject(
        produce(keywordObject, draft => {
          draft.push({
            keyword: keyword,
            id: keywordObject[keywordObject.length - 1].id + 1,
            contents: []
          });
        })
        )
        : alert("키워드를 입력하세요");
    keyword !== "" && setValue("");
    keyword !== "" && setKeyword("");
    e.preventDefault();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
    setKeyword(e.target.value);
  };

  return (
    <>
      {console.log("Toolkeyword")}
      <div className="keyword-contents">
        <div className="add-keyword">
          <form onSubmit={onSubmit}>
            <input
              placeholder="키워드"
              value={value}
              onChange={e => onChangeInput(e)}
            />
            <button type="submit">추가</button>
          </form>
        </div>

        <div className="keyword-status">
          <h4>키워드 목록</h4>
          {keywordList.map((keyword, index) => {
            return (
              <div
                key={index}
                label={keyword.keyword}
                onClick={onClickKeyword(keyword.keyword)}
                className="tool-keyword"
              >
                {keyword.keyword}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ToolKeyword;
