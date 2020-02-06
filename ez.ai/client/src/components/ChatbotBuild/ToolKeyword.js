import React from "react";

const ToolKeyword = ({
  keyword,
  keywordList,
  setKeyword,
  setKeywordList,
  onClickKeyword,
  keywordObject,
  setKeywordObject
}) => {
  const onSubmit = e => {
    e.preventDefault();
    keyword != ""
      ? setKeywordList([...keywordList, keyword])
      : alert("키워드를 입력하세요");
    setKeywordObject([...keywordObject, { keyword: keyword }]);
    console.log(keywordObject);
  };

  const onChangeInput = e => {
    setKeyword(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input placeholder="키워드" value={keyword} onChange={onChangeInput} />
        <button type="submit">추가</button>
      </form>
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
    </>
  );
};

export default ToolKeyword;
