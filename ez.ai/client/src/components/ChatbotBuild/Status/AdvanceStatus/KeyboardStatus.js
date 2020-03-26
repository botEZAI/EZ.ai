import React, { useState } from "react";
import produce from "immer";
import KeywordPopUp from "./KeywordPopUp";

const KeyboardStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index,
  keywordPopup,
  setKeywordPopup,
  listCount,
  curListCount,
  setCurListCount
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popNum, setPopNum] = useState("-1");


  // const listCount = [[1], [1,2], [1,2,3], [1,2,3,4], [1,2,3,4,5], [1,2,3,4,5,6]];  // 키보드 요소의 키워드 입력 총 개수

  // const [curListCount, setCurListCount] = useState(listCount[1]);

  const toggleKeywordPopUp = (i, e) => {
    setPopNum(i);
    setShowPopup(!showPopup);
  };

  const changeListLength = (i) => {
    setCurListCount(listCount[i-1])
    setKeywordObject(
        produce(keywordObject, draft => {
          draft[index].contents[now].listContent.keywordLen =
              i;
        })
    );
  }

  return (
    <>
      <div className="status-input status-list">
        <textarea
          placeholder="작성하고자 하는 텍스트를 적어주세요"
          value={keywordObject[index].contents[now].listContent.question || ""}
          onChange={e => {
            setKeywordObject(
              produce(keywordObject, draft => {
                draft[index].contents[now].listContent.question =
                  e.target.value;
              })
            );
          }}
        ></textarea>
        <div className = "list-count">
          {listCount[5].map((i) => (
              <div className = "list-count-num" onClick={() => changeListLength(i)}>{i}</div>
              ))
          }

        </div>
        <table>
          {curListCount.map((i) => (
            <div className="status-list-content">
              <input
                placeholder="키워드명을 적어주세요"
                value={
                  keywordObject[index].contents[now].listContent.elem[i] || ""
                }
                onChange={e => {
                  setKeywordObject(
                    produce(keywordObject, draft => {
                      draft[index].contents[now].listContent.elem[i] =
                        e.target.value;
                    })
                  );
                }}
              />
              <div
                className="list-keyword-btn"
                name={i}
                onClick={() => toggleKeywordPopUp(i)}
              >
                {keywordObject[index].contents[now].listContent.keywordLink[
                  i
                ] || "연동"}
                {showPopup && popNum === i ? (
                  <KeywordPopUp
                    keywordObject={keywordObject}
                    setKeywordObject={setKeywordObject}
                    currentContent={currentContent}
                    currentElemIndex={i}
                    now={now}
                    index={index}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </table>
      </div>
    </>
  );
};

export default KeyboardStatus;
