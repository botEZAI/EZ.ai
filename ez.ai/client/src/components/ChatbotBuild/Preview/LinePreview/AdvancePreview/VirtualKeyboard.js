import React from 'react';
import produce from "immer";

const VirtualKeyboard = ({
  keywordObject, 
  index, 
  now,
  clickedMainInput,
  currentInput,
  virtualKeyboard,
  curListCount,
  setCurListCount,
  setKeywordObject,
}) => {
    //리스트 요소 삭제
    const removeListElement = id => {
      setCurListCount(curListCount.filter(num => num !== id));
      setKeywordObject(
        produce(keywordObject, draft => {
          draft[index].contents[now].listContent.keywordLink[id] = "";
          draft[index].contents[now].listContent.elem[id] = "";
        })
      );
    };
  return (
    <>
    {virtualKeyboard ? (
      <div>
        {(clickedMainInput.type ||
          (!clickedMainInput.type && currentInput)) &&
          (currentInput.type === "list" ||
          clickedMainInput.type === "list" ? (
            <>
              <div className="virtual-keyboard">
                {curListCount.map((i) => (
                    <div className="list-elem-wrapper">
                      <span className="list-elem">
                        {keywordObject[index].contents[now].listContent
                          .keywordLink[i] || ""}
                      </span>
                      <span
                        className="clear-button"
                        onClick={() => {
                          removeListElement(i);
                        }}
                      >
                        x
                      </span>
                    </div>
                ))}
              </div>
            </>
          ) : null)}
      </div>
    ) : null}
    </>
  )
}
export default VirtualKeyboard;