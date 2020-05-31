import React, { useState } from "react";
import produce from "immer";

const PersistentStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index,
  keywordPopup,
  setKeywordPopup,
  listCount,
  curListCount,
  setCurListCount,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popNum, setPopNum] = useState("-1");


  const toggleKeywordPopUp = (i, e) => {
    setPopNum(i);
    setShowPopup(!showPopup);
  };

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

  const setKeyword = (i) => {
    setBtnText(i)
  }

  const onChangeBtnText = e => {
    setBtnText(e.target.value);
    
  }

  const setListKeyword = keyword => {
    setKeywordObject(
        produce(keywordObject, draft => {
          draft[index].contents[now].listContent.keywordLink[
              selectedBtn
              ] = keyword;
        })
    );
  };

  return (
    <div className="status-list-main">
      <div className="status-input status-list">
        <textarea
          placeholder="작성하고자 하는 텍스트를 적어주세요"
          value={keywordObject[index].contents[now].listContent.question || ""}
          onChange={(e) => {
            setKeywordObject(
              produce(keywordObject, (draft) => {
                draft[index].contents[now].listContent.question =
                  e.target.value;
              })
            );
          }}
        ></textarea>
        <div className="list-count">
          <span>선택지 개수 : </span>
          {listCount[5].map((i) => (
            <div className="list-count-num" onClick={() => changeListLength(i)}>
              {i}
            </div>
          ))}
        </div>
        <table>
          {curListCount.map((i) => (
            <div className="status-list-content" onClick = {() => {setSelectedBtn(i)}}>
              <input
                placeholder="연동된 키워드가 없습니다."
                readOnly={true}
                value={btnText}

              />
            </div>
          ))}
        </table>
      </div>
      <div className="status-list-modify">
        <div className="status-list-modify-title">키보드 수정</div>
        <div className="status-list-modify-contents">
          {selectedBtn === 0 ? (
              <div className="status-list-modify-none">선택된 고정메뉴 버튼이 없습니다..</div>
          ) : (
              <>
                <div className="status-list-modify-content-num">{selectedBtn}번째 버튼 : </div>
                <input placeholder="키워드명을 적어주세요" value={btnText} onChange = {onChangeBtnText} />
              <select onChange = {(e) => {setKeyword(e.target.value)}}>
              <option value="none" disabled>=== 키워드 선택 ===</option>
              {keywordObject.map((keyword, index) => {
                return (
                    <>
                      <option
                          key={index}
                          value={keyword.keyword}
                          onClick={() => setListKeyword(keyword.keyword)}
                      >
                        {keyword.keyword}
                      </option>
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
