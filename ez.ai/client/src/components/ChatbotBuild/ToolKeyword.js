import React, { useEffect, useState } from "react";
import produce from "immer";

const ToolKeyword = ({
  setMainKeyword,
  keyword,
  keywordList,
  setKeyword,
  setKeywordList,
  onClickKeyword,
  keywordObject,
  setKeywordObject,
  keywordCategory,
  setKeywordCategory,
  index,
}) => {
  const [value, setValue] = useState("");
  const [disableInput, setDisableInput] = useState(true);  // 키워드 속성내 키워드 수정 가능 여부
  const [category, setCategory] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    keyword !== "" && setKeywordList(keywordList => [...keywordList, keyword]);
    keyword !== ""
      ? setKeywordObject(
          produce(keywordObject, draft => {
            draft.push({
              keyword: keyword,
              id: keywordObject[keywordObject.length - 1].id + 1,
              contents: [],
              category: keywordCategory[0]
            });
          })
        )
      : alert("키워드를 입력하세요");
    keyword !== "" && setValue("");
    keyword !== "" && setKeyword("");

  };

  const onChangeKeyword = e => {
    setValue(e.target.value);
    setKeyword(e.target.value);
  };

  const onChangeCategory = e => {
    setCategory(e.target.value);
  }

  const onSubmitCategory = e => {
    e.preventDefault();
    setKeywordCategory(keywordCategory => [...keywordCategory, category])
    setCategory("")
  }

  
  // 키워드 속성 - 수정에서 키워드명 변경시
  const modifyInput = e => {
    if (index < 0) {
      alert('선택한 키워드가 없습니다!')
    }
    else if (index == 0) {
      alert('Welcome 키워드는 수정할 수 없습니다!')
    } else {
      setKeywordObject(keywordObject.map(i => i.id === keywordObject[index].id
          ? ({ ...i, keyword: e.target.value})
          : i ))
      setMainKeyword(e.target.value);
    }

  }


  // 수정 버튼 누를때
  const updateKeyword = e => {
    e.preventDefault();
    setDisableInput(!disableInput)
  }

  const deleteKeyword = e => {
    e.preventDefault();
    if (index < 0) {
      alert('선택한 키워드가 없습니다!')
    }
    else if (index == 0) {
      alert('Welcome 키워드는 삭제할 수 없습니다!')
    } else {
      setKeywordObject(keywordObject.filter(i => i.id !== keywordObject[index].id));
    }
  };

  // 카테고리 select문에서 변경했을때 실행
  const changeCategory = e => {
    console.log(index, keywordObject, e.target.value)
    setKeywordObject(keywordObject.map(i => i.id === keywordObject[index].id
        ? ({ ...i, category: e.target.value})
        : i ))
  }


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
                onChange={e => onChangeKeyword(e)}
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
                  <button className={disableInput ? "modify-btn" : "modify-btn-active"} type="submit" onClick={updateKeyword}>{disableInput ? "수정" : "수정완료"}</button>
                  <button className="delete-btn" type="submit" onClick={deleteKeyword}>삭제</button>
                </div>
            </div>
            <div className="modify-category">
              <select name="keyword-category" onChange={ e => changeCategory(e)} value={keywordObject[index] ? keywordObject[index].category : keywordCategory[0]}>
                <option value="default" disabled>--- 키워드 카테고리 선택 ---</option>
                { keywordCategory.map(i =>
                  <option value={i}>{i}</option>
                )}
              </select>
            </div>
          </form>
        </div>
        <div className="keyword-status">
          <div className="keyword-status-title">
            <h4>키워드 목록</h4>
          </div>
          <div className = "tool-keywords">
            <div className= "add-category">
              <div className="Add-category-title">
                카테고리 추가
              </div>
              <div className="add-category-main">
                <form onSubmit={onSubmitCategory}>
                  <div className="add-category-input">
                    <div>
                      <input
                          value={category}
                          onChange={e => onChangeCategory(e)}
                          placeholder="추가할 카테고리명을 입력해주세요"
                      />
                    </div>
                    <div>
                      <button type = "submit" className="add-category-btn" >추가</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {keywordCategory.map(i =>
                <div value = {i} className= "keyword-category">
                  <div className= "keyword-category-title">
                    <div className="keyword-category-title-main">
                      <div className="keyword-category-name">{i}</div>
                      <div className="keyword-category-remove">X</div>
                    </div>
                    <div className="keyword-category-fold">-</div>
                  </div>
                  {keywordObject.map((keyword, index) => {
                    return (
                    keyword.category === i ?
                        <div
                            key={index}
                            label={keyword.keyword}
                            onClick={
                              onClickKeyword(keyword.keyword)}
                            className="tool-keyword"
                        >
                          {keyword.keyword}
                        </div>
                     : null
                  );

                  })}
                </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default ToolKeyword;
