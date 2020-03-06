import React from "react";
import produce from "immer";


{/* Status screen 텍스트 요소 */}
const TextStatus = ({
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
}) => {
    return (
        <div className="status-input status-text">
              <textarea
                  placeholder="작성하고자 하는 텍스트를 적어주세요"
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