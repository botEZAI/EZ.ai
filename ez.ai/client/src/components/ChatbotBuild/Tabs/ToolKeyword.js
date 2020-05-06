import React, { useState } from "react";
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
  const [disableInput, setDisableInput] = useState(true); // 키워드 속성내 키워드 수정 가능 여부
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState(true); // 키워드 카테고리 이름 수정 가능 여부
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 수정할 키워드 카테고리명

  const onSubmit = (e) => {
    e.preventDefault();
    keyword !== "" &&
      setKeywordList((keywordList) => [...keywordList, keyword]);
    keywordObject.find((v) => v.keyword === keyword)
      ? alert("중복된 키워드입니다.")
      : keyword !== ""
      ? setKeywordObject(
          produce(keywordObject, (draft) => {
            draft.push({
              keyword: keyword,
              id: keywordObject[keywordObject.length - 1].id + 1,
              contents: [],
              category: keywordCategory[0].category,
            });
          })
        )
      : alert("키워드를 입력하세요");

    keyword !== "" && setValue("");
    keyword !== "" && setKeyword("");
  };

  const onChangeKeyword = (e) => {
    setValue(e.target.value);
    setKeyword(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onSubmitCategory = (e) => {
    e.preventDefault();
    if (category.trim().length === 0) {
      alert("카테고리명을 입력해주세요");
    } else if (keywordCategory.some((c) => c.category === category)) {
      alert("입력하신 ' " + category + " ' 는 이미 존재하는 카테고리입니다.");
    } else {
      setKeywordCategory(
        produce(keywordCategory, (draft) => {
          draft.push({
            category: category,
            show: true,
          });
        })
      );
      setCategory("");
    }
  };

  const deleteCategory = (e, val) => {
    if (val === "미분류") {
      alert("기본으로 제공되는 '미분류' 카테고리는 삭제할 수 없습니다.");
    } else {
      let found = false;

      keywordObject.map((keyword) => {
        if (keyword.category === val) {found = true};
      });

      if (found) {
        alert("해당 카테고리에 속해있는 키워드들을 먼저 옮겨주세요.");
      } else {
        setKeywordCategory(keywordCategory.filter((c) => c.category !== val));
      }
    }
  };

  // 키워드 속성 - 수정에서 키워드명 변경시
  const modifyInput = (e) => {
    if (index < 0) {
      alert("선택한 키워드가 없습니다!");
    } else if (index === 0) {
      alert("Welcome 키워드는 수정할 수 없습니다!");
    } else {
      setKeywordObject(
        keywordObject.map((i) =>
          i.id === keywordObject[index].id
            ? { ...i, keyword: e.target.value }
            : i
        )
      );
      setMainKeyword(e.target.value);
    }
  };

  // 수정 버튼 누를때
  const updateKeyword = (e) => {
    e.preventDefault();
    setDisableInput(!disableInput);
  };

  const deleteKeyword = (e) => {
    e.preventDefault();
    if (index < 0) {
      alert("선택한 키워드가 없습니다!");
    } else if (index === 0) {
      alert("Welcome 키워드는 삭제할 수 없습니다!");
    } else {
      setKeywordObject(
        keywordObject.filter((i) => i.id !== keywordObject[index].id)
      );
    }
  };

  // 키워드 목록 카테고리 접기
  const foldCategory = (s) => {
    setKeywordCategory(
      keywordCategory.map((i) =>
        i.category === s.category ? { ...i, show: !s.show } : i
      )
    );
    console.log(keywordCategory);
  };

  // 카테고리 select문에서 변경했을때 실행
  const changeCategory = (e) => {
    setKeywordObject(
      keywordObject.map((i) =>
        i.id === keywordObject[index].id
          ? { ...i, category: e.target.value }
          : i
      )
    );
  };

  const updateCategoryName = (i) => {
    setCategoryName(!categoryName);
    if (i.category !== selectedCategory) {
      setSelectedCategory(i.category);
    } else {
      setSelectedCategory("");
    }
  };

  // 키워드 카테고리명 수정
  const onChangeCategoryName = (e, i) => {
    if (i.category === "미분류") {
      alert("기본으로 제공되는 '미분류' 카테고리의 이름은 수정할 수 없습니다.");
    } else if (e.target.value === "") {
      alert("카테고리명은 공백으로 지정할 수 없습니다.");
    } else {
      setKeywordObject(
        keywordObject.map((m) =>
          m.category === i.category ? { ...m, category: e.target.value } : m
        )
      );
      setKeywordCategory(
        keywordCategory.map((m) =>
          m.category === i.category
            ? { category: e.target.value, show: true }
            : m
        )
      );
      setSelectedCategory(e.target.value);
    }
  };

  return (
    <>
      <div className="keyword-contents">
        <div className="add-keyword">
          <h4>키워드 추가</h4>
          <form onSubmit={onSubmit}>
            <div>
              <input
                placeholder="추가할 키워드명을 입력해주세요"
                value={value}
                onChange={(e) => onChangeKeyword(e)}
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
                className={
                  disableInput ? "modify-input-disable" : "modify-input-enable"
                }
                placeholder="선택한 키워드명"
                value={
                  keywordObject[index] !== undefined
                    ? keywordObject[index].keyword
                    : ""
                }
                onChange={modifyInput}
                readOnly={disableInput}
              />
              <div className="modify-btns">
                <button
                  className={disableInput ? "modify-btn" : "modify-btn-active"}
                  type="submit"
                  onClick={updateKeyword}
                >
                  {disableInput ? "수정" : "수정완료"}
                </button>
                <button
                  className="delete-btn"
                  type="submit"
                  onClick={deleteKeyword}
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="modify-category">
              <select
                name="keyword-category"
                onChange={(e) => changeCategory(e)}
                value={
                  keywordObject[index]
                    ? keywordObject[index].category
                    : keywordCategory[0].category
                }
              >
                <option value="default" disabled>
                  --- 키워드 카테고리 선택 ---
                </option>
                {keywordCategory.map((i) => (
                  <option value={i.category}>{i.category}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="keyword-status">
          <div className="keyword-status-title">
            <h4>키워드 목록</h4>
          </div>
          <div className="tool-keywords">
            <div className="add-category">
              <form onSubmit={onSubmitCategory}>
                <div className="add-category-main">
                  <div>
                    <div className="add-category-title">카테고리 추가 :</div>
                    <div className="add-category-input">
                      <input
                        value={category}
                        onChange={(e) => onChangeCategory(e)}
                        placeholder="추가할 카테고리명을 입력해주세요"
                      />
                    </div>
                    <div className="add-category-btns">
                      <button type="submit" className="add-category-btn">
                        추가
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {keywordCategory.map((i) => (
              <div value={i.category} className="keyword-category">
                <div
                  className={
                    i.show
                      ? "keyword-category-title"
                      : "keyword-category-title fold"
                  }
                >
                  <div className="keyword-category-title-main">
                    <div
                      className="keyword-category-fold"
                      onClick={() => foldCategory(i)}
                    >
                      {i.show ? (
                        <i className="fas fa-sort-down"></i>
                      ) : (
                        <i className="fas fa-sort-up"></i>
                      )}
                    </div>
                    {disableInput && selectedCategory !== i.category ? (
                      <div
                        className="keyword-category-name"
                        onClick={() => foldCategory(i)}
                      >
                        {i.category}
                      </div>
                    ) : (
                      <input
                        className="keyword-category-name-input"
                        value={i.category}
                        onChange={(e) => onChangeCategoryName(e, i)}
                      />
                    )}
                  </div>
                  <div className="keyword-category-btns">
                    <div
                      className={
                        disableInput && selectedCategory !== i.category
                          ? "keyword-category-btn keyword-category-modify"
                          : "keyword-category-btn keyword-category-modify-active"
                      }
                      onClick={() => updateCategoryName(i)}
                    >
                      {disableInput && selectedCategory !== i.category
                        ? "수정"
                        : "수정완료"}
                    </div>
                    <div
                      className="keyword-category-btn keyword-category-remove"
                      onClick={(e) => deleteCategory(e, i.category)}
                    >
                      삭제
                    </div>
                  </div>
                </div>

                {i.show ? (
                  <div className="keyword-category-contents">
                    {keywordObject.map((keyword, index) => {
                      return keyword.category === i.category ? (
                        <div
                          key={index}
                          label={keyword.keyword}
                          onClick={onClickKeyword(keyword.keyword)}
                          className="tool-keyword"
                        >
                          {keyword.keyword}
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolKeyword;
