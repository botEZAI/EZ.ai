import React, { useEffect, useState } from "react";

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
    console.log("onSubmit");

    keyword !== "" && setKeywordList(keywordList => [...keywordList, keyword]);
    keyword !== ""
      ? setKeywordObject(keywordObject => [
          ...keywordObject,
          { keyword: keyword, contents: [] }
        ])
      : alert("키워드를 입력하세요");
    keyword !== "" && setValue("");
    keyword !== "" && setKeyword("");
    e.preventDefault();
  };

  const onChangeInput = e => {
    setKeyword(e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      {console.log("Toolkeyword")}
      <div className="keyword-contents">
        <div className="add-keyword">
        <form onSubmit={onSubmit}>
          <input placeholder="키워드" value={value} onChange={onChangeInput} />
          <button type="submit">추가</button>
        </form>
      </div>

        <div className="keyword-status">
          <h4>키워드 목록</h4>
          {keywordList.map((keyword, index) => {
            return (
                <div
                    key={index}
                    label={keyword}
                    onClick={() => onClickKeyword(keyword)}
                    className="tool-keyword"
                >
                  {keyword}
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ToolKeyword;
