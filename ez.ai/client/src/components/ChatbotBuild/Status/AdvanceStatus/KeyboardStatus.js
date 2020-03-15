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
          value={currentContent.question || ""}
          onChange={e => {
            setKeywordObject(
              produce(keywordObject, draft => {
                draft[index].contents[now].content.question = e.target.value;
              })
            );
          }}
        ></textarea>
        <table>
          {currentContent.elem.map((e, i) => (
            <div className="status-list-content">
              <input
                placeholder="키워드명을 적어주세요"
                value={currentContent.elem[i] || ""}
                onChange={e => {
                  setKeywordObject(
                    produce(keywordObject, draft => {
                      draft[index].contents[now].content.elem[i] =
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
                {currentContent.keywordLink[i] || "연동"}
                {showPopup && popNum === i ? (
                  <KeywordPopUp
                    keywordObject={keywordObject}
                    currentContent={currentContent}
                    currentElemIndex={i}
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
