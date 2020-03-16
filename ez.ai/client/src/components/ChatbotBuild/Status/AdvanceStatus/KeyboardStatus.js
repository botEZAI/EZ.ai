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
  setKeywordPopup
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popNum, setPopNum] = useState("-1");

  const toggleKeywordPopUp = (i, e) => {
    setPopNum(i);
    setShowPopup(!showPopup);
  };

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
        <table>
          {keywordObject[index].contents[now].listContent.elem.map((e, i) => (
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
