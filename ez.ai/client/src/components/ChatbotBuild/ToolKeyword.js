import React, { useEffect, useState } from "react";
import produce from "immer";

const ToolKeyword = ({
  keyword,
  keywordList,
  setKeyword,
  setKeywordList,
  onClickKeyword,
  keywordObject,
  setKeywordObject
}) => {
  const [value, setValue] = useState("");
  const onSubmit = e => {
    e.preventDefault();
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
          <h4>키워드 추가</h4>
          <form onSubmit={onSubmit}>
            <div>
              <input
                placeholder="추가할 키워드명을 입력해주세요"
                value={value}
                onChange={e => onChangeInput(e)}
              />
              <button type="submit">추가</button>
            </div>
          </form>
        </div>
        <div className="modify-keyword">
          <h4>키워드 속성</h4>
          <form>
            <div className="modify-delete">
              <input
                placeholder="선택한 키워드명"
                />
                <button type="submit">수정</button>
                <button type="submit">삭제</button>
            </div>
            <div className="modify-category">
              <select name="keyword-category">
                <option value="">--- 키워드 카테고리 선택 ---</option>
              </select>
            </div>
          </form>
        </div>
        <div className="keyword-status">
          <div className="keyword-status-title">
            <h4>키워드 목록</h4>
          </div>
          <div className = "tool-keywords">
            <div value = "미분류 " className= "keyword-category">
              <div className= "keyword-category-title">
                <div>미분류</div>
                <div className="keyword-category-fold">-</div>
              </div>
              {keywordObject.map((keyword, index) => {
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
        </div>
      </div>
    </>
  );
};

export default ToolKeyword;
