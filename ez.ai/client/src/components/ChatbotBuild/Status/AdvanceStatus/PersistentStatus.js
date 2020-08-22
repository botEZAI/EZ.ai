import React, { useState } from "react";
import produce from "immer";

const PersistentStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  keywordCategory,
  now,
  index,
  keywordPopup,
  setKeywordPopup,
  listCount,
  curListCount,
  setCurListCount,
}) => {

  const changeListLength = (i) => {
    setCurListCount(listCount[i - 1]);
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].listContent.keywordLen = i;
      })
    );
  };

  const [selectedBtn, setSelectedBtn] = useState(0);
  const [btnText,setBtnText] = useState("");
  const [keywords, setKeywords] = useState([
      {id : 0, text:""},
      {id : 1, text:""},
      {id : 2, text:""},
      {id : 3, text:""},
      {id : 4, text:""},
      {id : 5, text:""},
      {id : 6, text:""},
  ]);

  const setKeyword = (i) => {
    setBtnText(i)
  }

  const chooseKeywordBtn = i => {
    setSelectedBtn(i);
    setBtnText(keywords[i].text)


  }

  const onChangeBtnText = e => {
    setKeywords(keywords.map(keyword =>
        keyword.id === selectedBtn ? {...keyword, text : e.target.value} : keyword
    ))
    setKeywordObject(
        produce(keywordObject, draft => {
          draft[index].contents[now].listContent.keywordLink[selectedBtn] = e.target.value;
        })
    )
      setBtnText(e.target.value);



    console.log(keywords, selectedBtn, btnText, keywordObject[index].contents[now].listContent)
  }

  const onChangeBtnTextBySelect = e => {
      setKeywords(keywords.map(keyword =>
          keyword.id === selectedBtn ? {...keyword, text : e.target.value} : keyword
      ))
      setKeywordObject(
          produce(keywordObject, draft => {
              draft[index].contents[now].listContent.keywordLink[selectedBtn] = e.target.value;
          })
      )
      if (btnText.length === 0 ) {
          setBtnText(e.target.value);
      }
  }



  return (
    <div className="status-list-main">
      <div className="status-input status-list">
        <div className="status-list--title">아래 메뉴 버튼을 클릭해서 연동하세요</div>
        <div className="list-count">
          <span>메뉴 버튼 개수 : </span>
          {listCount[5].map((i) => (
            <div className={curListCount.length !== i ? "list-count-num" : "list-count-num list-count-num__selected"} onClick={() => changeListLength(i)}>
              {i}
            </div>
          ))}
            {console.log(curListCount)}
        </div>
        <table>
          {curListCount.map((i) => (
            <div className={i === selectedBtn ? "status-list-content current-list-content" : "status-list-content"} onClick = {() => {chooseKeywordBtn(i)}}>
              <input
                placeholder="연동된 키워드가 없습니다."
                readOnly={true}
                value={keywordObject[index].contents[now].listContent.keywordLink[i] || ""}
                //value={keywords[i].text}
              />
            </div>
          ))}
        </table>
      </div>
      <div className="status-list-modify">
        <div className="status-list-modify-title">연동정보 수정</div>
        <div className="status-list-modify-contents">
          {selectedBtn === 0 ? (
              <div className="status-list-modify-none">선택된 고정메뉴 버튼이 없습니다..</div>
          ) : (
              <>
                <div className="status-list-modify-content-input">
                  <span>{selectedBtn}번째 버튼 : </span>
                  <input placeholder="버튼명을 적어주세요" value={keywordObject[index].contents[now].listContent.keywordLink[selectedBtn] || ""} onChange = {onChangeBtnText} />
                </div>

              <select onChange = {onChangeBtnTextBySelect}>
                  <option value="none" selected disabled>======= 키워드 선택 =======</option>
                  {keywordCategory.map(category => {
                      return (
                          <>
                              <optgroup label={category.category}>
                                  {keywordObject.map((keyword, index) => {
                                      return (
                                          keyword.category === category.category && index > 0 ? (
                                              <>
                                                  <option
                                                      key={index}
                                                      value={keyword.keyword}
                                                  >
                                                      {keyword.keyword}
                                                  </option>
                                              </>
                                          ) : null
                                      )
                                  })}
                              </optgroup>
                          </>
                      )
                  })}


              </select>
                </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersistentStatus;
