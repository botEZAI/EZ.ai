import React from "react";
import produce from "immer";


/* Status screen 텍스트 요소 */
const TextStatus = ({
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
}) => {
    return (
        <div className="status-input status-text">
            <div className="status-text-title">
                텍스트 내용을 작성해주세요
            </div>
              <textarea
                  placeholder=""
                  value={currentContent || ""}
                  onChange={e => {
                      setKeywordObject(
                          produce(keywordObject, draft => {
                              draft[index].contents[now].content = e.target.value;
                          })
                      );
                  }}
              />
        </div>
    )
}

export default TextStatus;