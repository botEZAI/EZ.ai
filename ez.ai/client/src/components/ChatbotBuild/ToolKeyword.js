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
  index,
}) => {
  const [value, setValue] = useState("");
  const [disableInput, setDisableInput] = useState(true);  // 키워드 속성내 키워드 수정 가능 여부


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

  const modifyInput = e => {
    console.log(e.target.value,index, "ㄴ이이이")
    setKeywordObject(keywordObject.map(i => i.id === keywordObject[index].id
        ? ({ ...i, keyword: e.target.value})
        : i ))
    console.log(keywordObject, "바뀐오브젝트")
    console.log(index)
  }


  const updateKeyword = e => {
    e.preventDefault();
    setDisableInput(!disableInput)
  }

  const deleteKeyword = e => {
    e.preventDefault();
    setKeywordObject(keywordObject.filter(i => i.id !== keywordObject[index].id));
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
              선택한 키워드명 :
              <input
                className={disableInput ? "modify-input-disable" : "modify-input-enable"}
                placeholder="선택한 키워드명"
                value={ keywordObject[index] !== undefined ? keywordObject[index].keyword : ""}
                onChange={modifyInput}
                readOnly={disableInput}
                />
                <div className="modify-btns">
                  <button type="submit" onClick={updateKeyword}>수정</button>
                  <button type="submit" onClick={deleteKeyword}>삭제</button>
                </div>
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
                        onClick={
                          onClickKeyword(keyword.keyword)}
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
